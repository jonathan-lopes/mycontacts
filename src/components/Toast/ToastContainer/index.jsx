import ToastMessage from '../ToastMessage';
import useToast from '../useToast';
import { Container } from './styles';

export default function ToastContainer() {
  const { messages, handleRemoveMessage } = useToast();

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </Container>
  );
}
