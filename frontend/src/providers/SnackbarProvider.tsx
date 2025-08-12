// SnackbarContext.tsx
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Alert, AlertColor, Snackbar } from '@mui/material';

interface SnackbarOptions {
  verticalPosition?: 'top' | 'bottom';
  horizontalPosition?: 'left' | 'center' | 'right';
  autoHideDuration?: number;
}

interface SnackbarContextType {
  showSnackbar: (message: string, severity: AlertColor, options?: SnackbarOptions) => void;
}

const SnackbarContext = createContext<SnackbarContextType>({
  showSnackbar: () => {}, // Default function
});

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [severity, setSeverity] = useState<AlertColor>('info');
  const [options, setOptions] = useState<SnackbarOptions | undefined>();

  const showSnackbar = (msg: string, sev: AlertColor, options?: SnackbarOptions) => {
    setMessage(msg);
    setSeverity(sev);
    setOptions(options);
    setOpen(true);
  };

  const handleClose = (_event?: unknown, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const verticalPosition = options?.verticalPosition || 'bottom';
  const horizontalPosition = options?.horizontalPosition || 'center';
  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={options?.autoHideDuration ?? 6000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: verticalPosition,
          horizontal: horizontalPosition,
        }}
        sx={verticalPosition === 'bottom' ? { marginBottom: '0' } : {}}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

// Hook to use the snackbar context
export const useSnackbar = (): SnackbarContextType => useContext(SnackbarContext);
