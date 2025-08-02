import { useState, useCallback } from 'react';
import type { ToastMessage } from '../components/Toast';

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((
    type: ToastMessage['type'],
    title: string,
    message: string
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = {
      id,
      type,
      title,
      message,
    };

    setToasts(prev => [...prev, newToast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const success = useCallback((title: string, message: string) => {
    addToast('success', title, message);
  }, [addToast]);

  const error = useCallback((title: string, message: string) => {
    addToast('error', title, message);
  }, [addToast]);

  const info = useCallback((title: string, message: string) => {
    addToast('info', title, message);
  }, [addToast]);

  return {
    toasts,
    removeToast,
    success,
    error,
    info,
  };
};