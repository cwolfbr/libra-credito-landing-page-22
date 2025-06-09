/**
 * Hook para tracking completo da jornada do usuário
 * 
 * @hook useUserJourney
 * @description Hook responsável por rastrear toda a jornada do usuário no site
 * 
 * @features
 * - Geração de session_id único
 * - Captura de UTMs e referrer
 * - Tracking de páginas visitadas
 * - Detecção de device/browser
 * - Tempo de permanência
 * - Persistência no Supabase
 * 
 * @usage
 * ```tsx
 * const { sessionId, trackPageVisit, trackSimulation } = useUserJourney();
 * ```
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { supabaseApi, UserJourneyData, PageVisit, DeviceInfo } from '@/lib/supabase';

// Constantes
const SESSION_STORAGE_KEY = 'libra_session_id';
const JOURNEY_STORAGE_KEY = 'libra_user_journey';

// Types específicos do hook
interface UserJourneyHook {
  sessionId: string;
  isTracking: boolean;
  trackPageVisit: (url?: string) => void;
  trackSimulation: (simulationData: any) => void;
  getJourneyData: () => UserJourneyData | null;
  updateTimeOnSite: () => void;
}

// Função para extrair UTMs da URL
function extractUTMParams(url: string = window.location.href): Record<string, string> {
  const urlObj = new URL(url);
  const utms: Record<string, string> = {};
  
  const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  
  utmParams.forEach(param => {
    const value = urlObj.searchParams.get(param);
    if (value) {
      utms[param] = value;
    }
  });
  
  return utms;
}

// Função para detectar informações do device
function getDeviceInfo(): DeviceInfo {
  const userAgent = navigator.userAgent;
  const screen = window.screen;
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight
  };
  
  // Detecção simples de device type
  let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
  if (/Mobi|Android/i.test(userAgent)) {
    deviceType = 'mobile';
  } else if (/Tablet|iPad/i.test(userAgent)) {
    deviceType = 'tablet';
  }
  
  // Detecção simples de browser
  let browser = 'Unknown';
  if (userAgent.includes('Chrome')) browser = 'Chrome';
  else if (userAgent.includes('Firefox')) browser = 'Firefox';
  else if (userAgent.includes('Safari')) browser = 'Safari';
  else if (userAgent.includes('Edge')) browser = 'Edge';
  
  // Detecção simples de OS
  let os = 'Unknown';
  if (userAgent.includes('Windows')) os = 'Windows';
  else if (userAgent.includes('Mac')) os = 'macOS';
  else if (userAgent.includes('Linux')) os = 'Linux';
  else if (userAgent.includes('Android')) os = 'Android';
  else if (userAgent.includes('iOS')) os = 'iOS';
  
  return {
    user_agent: userAgent,
    screen_resolution: `${screen.width}x${screen.height}`,
    viewport_size: `${viewport.width}x${viewport.height}`,
    device_type: deviceType,
    browser,
    os
  };
}

// Função para obter IP (usando serviço externo)
async function getUserIP(): Promise<string> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip || 'unknown';
  } catch (error) {
    console.warn('Erro ao obter IP:', error);
    return 'unknown';
  }
}

export function useUserJourney(): UserJourneyHook {
  const location = useLocation();
  const [sessionId, setSessionId] = useState<string>('');
  const [isTracking, setIsTracking] = useState(false);
  const [journeyData, setJourneyData] = useState<UserJourneyData | null>(null);
  const pageStartTime = useRef<number>(Date.now());
  const sessionStartTime = useRef<number>(Date.now());
  
  // Inicialização da sessão
  useEffect(() => {
    let currentSessionId = sessionStorage.getItem(SESSION_STORAGE_KEY);
    
    if (!currentSessionId) {
      currentSessionId = uuidv4();
      sessionStorage.setItem(SESSION_STORAGE_KEY, currentSessionId);
      sessionStartTime.current = Date.now();
    }
    
    setSessionId(currentSessionId);
    initializeJourney(currentSessionId);
  }, []);
  
  // Tracking de mudança de página
  useEffect(() => {
    if (sessionId && isTracking) {
      trackPageVisit();
    }
  }, [location.pathname, sessionId, isTracking]);
  
  // Inicializar jornada do usuário
  const initializeJourney = useCallback(async (sessionId: string) => {
    try {
      // Verificar se já existe jornada para esta sessão
      let existingJourney;
      
      try {
        existingJourney = await supabaseApi.getUserJourney(sessionId);
      } catch (getError) {
        console.warn('Erro ao buscar jornada existente (tabela pode não existir):', getError);
        existingJourney = null;
      }
      
      if (!existingJourney) {
        // Tentar criar nova jornada
        try {
          const utms = extractUTMParams();
          const deviceInfo = getDeviceInfo();
          const ip = await getUserIP();
          
          const newJourney: UserJourneyData = {
            session_id: sessionId,
            utm_source: utms.utm_source,
            utm_medium: utms.utm_medium,
            utm_campaign: utms.utm_campaign,
            utm_term: utms.utm_term,
            utm_content: utms.utm_content,
            referrer: document.referrer || 'direct',
            landing_page: window.location.href,
            pages_visited: [],
            device_info: deviceInfo,
            ip_address: ip
          };
          
          existingJourney = await supabaseApi.createUserJourney(newJourney);
          console.log('Nova jornada criada:', existingJourney);
        } catch (createError) {
          console.warn('Erro ao criar jornada (continuando sem tracking):', createError);
          // Continuar sem tracking se Supabase falhar
          setIsTracking(false);
          return;
        }
      }
      
      setJourneyData(existingJourney);
      setIsTracking(true);
      
    } catch (error) {
      console.error('Erro geral ao inicializar jornada:', error);
      setIsTracking(false);
    }
  }, []);
  
  // Função para rastrear visita de página
  const trackPageVisit = useCallback((url?: string) => {
    if (!sessionId || !isTracking) return;
    
    const currentUrl = url || window.location.href;
    const currentTime = Date.now();
    
    setJourneyData(prev => {
      if (!prev) return prev;
      
      const newPageVisit: PageVisit = {
        url: currentUrl,
        timestamp: new Date().toISOString(),
        time_spent: currentTime - pageStartTime.current
      };
      
      const updatedJourney = {
        ...prev,
        pages_visited: [...(prev.pages_visited || []), newPageVisit],
        time_on_site: Math.floor((currentTime - sessionStartTime.current) / 1000)
      };
      
      // Atualizar no Supabase (debounced)
      setTimeout(() => {
        supabaseApi.updateUserJourney(sessionId, {
          pages_visited: updatedJourney.pages_visited,
          time_on_site: updatedJourney.time_on_site
        }).catch(console.error);
      }, 1000);
      
      return updatedJourney;
    });
    
    pageStartTime.current = currentTime;
  }, [sessionId, isTracking]);
  
  // Função para rastrear simulação
  const trackSimulation = useCallback((simulationData: any) => {
    if (!sessionId) return;
    
    console.log('Tracking simulação:', { sessionId, simulationData });
    
    // Adicionar evento de simulação às páginas visitadas
    const simulationEvent: PageVisit = {
      url: window.location.href,
      timestamp: new Date().toISOString(),
      time_spent: 0
    };
    
    setJourneyData(prev => {
      if (!prev) return prev;
      
      const updatedJourney = {
        ...prev,
        pages_visited: [...(prev.pages_visited || []), simulationEvent]
      };
      
      // Atualizar no Supabase
      supabaseApi.updateUserJourney(sessionId, {
        pages_visited: updatedJourney.pages_visited
      }).catch(console.error);
      
      return updatedJourney;
    });
  }, [sessionId]);
  
  // Função para atualizar tempo no site
  const updateTimeOnSite = useCallback(() => {
    if (!sessionId || !isTracking) return;
    
    const currentTime = Date.now();
    const timeOnSite = Math.floor((currentTime - sessionStartTime.current) / 1000);
    
    supabaseApi.updateUserJourney(sessionId, {
      time_on_site: timeOnSite
    }).catch(console.error);
  }, [sessionId, isTracking]);
  
  // Atualizar tempo a cada 30 segundos
  useEffect(() => {
    if (!isTracking) return;
    
    const interval = setInterval(updateTimeOnSite, 30000);
    return () => clearInterval(interval);
  }, [isTracking, updateTimeOnSite]);
  
  // Cleanup ao sair da página
  useEffect(() => {
    const handleBeforeUnload = () => {
      updateTimeOnSite();
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [updateTimeOnSite]);
  
  const getJourneyData = useCallback(() => journeyData, [journeyData]);
  
  return {
    sessionId,
    isTracking,
    trackPageVisit,
    trackSimulation,
    getJourneyData,
    updateTimeOnSite
  };
}

export default useUserJourney;
