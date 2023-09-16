import { useEffect, useState, useCallback } from 'react';
import { toastEventManager } from '../../helpers/toast';

export default function useToast() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function hanleAddToast({ type, text, duration }) {
      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), type, text, duration },
      ]);
    }

    toastEventManager.on('addtoast', hanleAddToast);

    return () => toastEventManager.removeListener('addtoast', hanleAddToast);
  }, []);

  const handleRemoveMessage = useCallback((id) => {
    setMessages((prevState) =>
      prevState.filter((message) => message.id !== id),
    );
  }, []);

  return {
    messages,
    handleRemoveMessage,
  };
}
