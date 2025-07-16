import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { useInfoPopup } from '@/hooks/useInfoPopup';

const InfoPopup: React.FC = () => {
  const { isInfoPopupOpen, closePopup, setIsInfoPopupOpen } = useInfoPopup();

  return (
    <Dialog open={isInfoPopupOpen} onOpenChange={setIsInfoPopupOpen}>
      <DialogContent className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 sm:rounded-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center text-libra-navy text-base">
            <Info className="w-5 h-5 mr-2 text-libra-blue" aria-hidden="true" />
            Informação Importante
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-libra-navy">
          A Libra não realiza nenhum tipo de cobrança até a liberação do crédito
        </p>
        <DialogClose asChild>
          <Button
            variant="outline"
            size="sm"
            className="mt-2 self-end"
            onClick={closePopup}
          >
            Fechar
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default InfoPopup;
