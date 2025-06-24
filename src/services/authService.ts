/**
 * Serviço de autenticação para admin
 */

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'admin';
}

export class AuthService {
  private static readonly TOKEN_KEY = 'libra_admin_token';
  private static readonly USER_KEY = 'libra_admin_user';
  
  // Credenciais válidas (em produção, isso viria do backend)
  private static readonly VALID_CREDENTIALS = [
    {
      email: 'admin@libracredito.com.br',
      password: 'libra2024@admin',
      user: {
        id: '1',
        email: 'admin@libracredito.com.br',
        name: 'Administrador',
        role: 'admin' as const
      }
    },
    {
      email: 'gestor@libracredito.com.br', 
      password: 'gestor2024@libra',
      user: {
        id: '2',
        email: 'gestor@libracredito.com.br',
        name: 'Gestor',
        role: 'admin' as const
      }
    }
  ];

  /**
   * Fazer login
   */
  static async login(credentials: LoginCredentials): Promise<AuthUser> {
    return new Promise((resolve, reject) => {
      // Simular delay de rede
      setTimeout(() => {
        const validCredential = this.VALID_CREDENTIALS.find(
          cred => cred.email === credentials.email && cred.password === credentials.password
        );

        if (validCredential) {
          // Gerar token simples (em produção seria JWT do backend)
          const token = btoa(`${credentials.email}:${Date.now()}`);
          
          // Salvar no localStorage
          localStorage.setItem(this.TOKEN_KEY, token);
          localStorage.setItem(this.USER_KEY, JSON.stringify(validCredential.user));
          
          resolve(validCredential.user);
        } else {
          reject(new Error('Email ou senha incorretos'));
        }
      }, 1000);
    });
  }

  /**
   * Fazer logout
   */
  static logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  /**
   * Verificar se está autenticado
   */
  static isAuthenticated(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const user = localStorage.getItem(this.USER_KEY);
    return !!(token && user);
  }

  /**
   * Obter usuário atual
   */
  static getCurrentUser(): AuthUser | null {
    try {
      const userStr = localStorage.getItem(this.USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error('Erro ao obter usuário atual:', error);
      return null;
    }
  }

  /**
   * Obter token atual
   */
  static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Verificar se o token ainda é válido (simulação)
   */
  static isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      // Decodificar token simples
      const decoded = atob(token);
      const [email, timestamp] = decoded.split(':');
      
      // Token válido por 24 horas
      const tokenAge = Date.now() - parseInt(timestamp);
      const isValid = tokenAge < 24 * 60 * 60 * 1000;
      
      if (!isValid) {
        this.logout();
      }
      
      return isValid;
    } catch (error) {
      this.logout();
      return false;
    }
  }
}

export default AuthService;