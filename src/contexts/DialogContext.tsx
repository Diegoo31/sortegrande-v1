import React, { createContext, useState, useContext, ReactNode } from 'react';
import CustomAlert from '../components/CustomAlert';
import ConfirmDialog from '../components/ConfirmDialog';

interface DialogContextType {
  showAlert: (options: AlertOptions) => void;
  showConfirm: (options: ConfirmOptions) => Promise<boolean>;
  closeAll: () => void;
}

interface AlertOptions {
  title?: string;
  message: string;
}

interface ConfirmOptions {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const useDialog = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog deve ser usado dentro de um DialogProvider');
  }
  return context;
};

interface DialogProviderProps {
  children: ReactNode;
}

export const DialogProvider: React.FC<DialogProviderProps> = ({ children }) => {
  const [alertProps, setAlertProps] = useState<(AlertOptions & { isOpen: boolean }) | null>(null);
  const [confirmProps, setConfirmProps] = useState<(ConfirmOptions & { isOpen: boolean, resolve: (value: boolean) => void }) | null>(null);

  const showAlert = (options: AlertOptions) => {
    setAlertProps({ ...options, isOpen: true });
  };

  const showConfirm = (options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirmProps({ ...options, isOpen: true, resolve });
    });
  };

  const closeAll = () => {
    if (confirmProps) {
      confirmProps.resolve(false);
      setConfirmProps(null);
    }
    setAlertProps(null);
  };

  const handleAlertConfirm = () => {
    setAlertProps(null);
  };

  const handleConfirmYes = () => {
    if (confirmProps) {
      confirmProps.resolve(true);
      setConfirmProps(null);
    }
  };

  const handleConfirmNo = () => {
    if (confirmProps) {
      confirmProps.resolve(false);
      setConfirmProps(null);
    }
  };

  return (
    <DialogContext.Provider value={{ showAlert, showConfirm, closeAll }}>
      {children}
      
      {alertProps && alertProps.isOpen && (
        <CustomAlert
          title={alertProps.title}
          message={alertProps.message}
          onConfirm={handleAlertConfirm}
        />
      )}
      
      {confirmProps && confirmProps.isOpen && (
        <ConfirmDialog
          title={confirmProps.title}
          message={confirmProps.message}
          confirmText={confirmProps.confirmText}
          cancelText={confirmProps.cancelText}
          onConfirm={handleConfirmYes}
          onCancel={handleConfirmNo}
        />
      )}
    </DialogContext.Provider>
  );
};

export default DialogProvider; 