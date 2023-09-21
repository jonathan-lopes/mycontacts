import PropTypes from 'prop-types';
import { useEffect, memo } from 'react';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';
import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import { Container } from './styles';

const ToastMessage = memo(
  ({ message, onRemoveMessage, isLeaving, animatedRef }) => {
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        onRemoveMessage(message.id);
      }, message.duration || 7000);

      return () => clearTimeout(timeoutId);
    }, [message, onRemoveMessage]);

    function handleRemoveToast() {
      onRemoveMessage(message.id);
    }

    return (
      <Container
        tabIndex={0}
        type={message.type}
        onClick={handleRemoveToast}
        role="button"
        isLeaving={isLeaving}
        ref={animatedRef}
      >
        {message.type === 'danger' && <img src={xCircleIcon} alt="X" />}
        {message.type === 'success' && (
          <img src={checkCircleIcon} alt="Check" />
        )}
        <strong>{message.text}</strong>
      </Container>
    );
  },
);

ToastMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'success', 'danger']),
    duration: PropTypes.number,
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
  isLeaving: PropTypes.bool.isRequired,
  animatedRef: PropTypes.shape().isRequired,
};

ToastMessage.displayName = 'ToastMessage';

export default ToastMessage;
