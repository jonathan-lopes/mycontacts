import { useEffect } from 'react';
import { toastEventManager } from '../../../helpers/toast';
import useAnimetedList from '../../../hooks/useAnimetedList';
import ToastMessage from '../ToastMessage';
import { Container } from './styles';

export default function ToastContainer() {
  const {
    setItems: setMessages,
    handleRemoveItem,
    handleAnimationEnd,
    renderList,
  } = useAnimetedList();

  useEffect(() => {
    function hanleAddToast({ type, text, duration }) {
      setMessages((prevState) => [
        ...prevState,
        { id: Math.random(), type, text, duration },
      ]);
    }

    toastEventManager.on('addtoast', hanleAddToast);

    return () => toastEventManager.removeListener('addtoast', hanleAddToast);
  }, [setMessages]);

  return (
    <Container>
      {renderList((message, { isLeaving }) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveItem}
          isLeaving={isLeaving}
          onAnimationEnd={handleAnimationEnd}
        />
      ))}
    </Container>
  );
}
