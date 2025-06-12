-- Adicionar novo status para simulações integradas com CRM
ALTER TABLE public.simulacoes 
DROP CONSTRAINT IF EXISTS simulacoes_status_check;

ALTER TABLE public.simulacoes 
ADD CONSTRAINT simulacoes_status_check 
CHECK (status IN ('novo', 'interessado', 'contatado', 'finalizado', 'integrado_crm'));

-- Comentário sobre o novo status
COMMENT ON COLUMN public.simulacoes.status 
IS 'Status da simulação: novo, interessado, contatado, finalizado, integrado_crm';
