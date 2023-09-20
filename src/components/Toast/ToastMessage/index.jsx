import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import checkCircleIcon from '../../../assets/images/icons/check-circle.svg';
import xCircleIcon from '../../../assets/images/icons/x-circle.svg';
import { Container } from './styles';

export default function ToastMessage({
  message,
  onRemoveMessage,
  isLeaving,
  onAnimationEnd,
}) {
  const animatedElementRef = useRef(null);

  useEffect(() => {
    const elementRef = animatedElementRef.current;

    function handleAnimationEnd() {
      onAnimationEnd(message.id);
    }

    if (isLeaving) {
      elementRef.addEventListener('animationend', handleAnimationEnd);
    }

    return () =>
      elementRef.removeEventListener('animationend', handleAnimationEnd);
  }, [isLeaving, message.id, onAnimationEnd]);

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
      ref={animatedElementRef}
    >
      {message.type === 'danger' && <img src={xCircleIcon} alt="X" />}
      {message.type === 'success' && <img src={checkCircleIcon} alt="Check" />}
      <strong>{message.text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['default', 'success', 'danger']),
    duration: PropTypes.number,
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
  onAnimationEnd: PropTypes.func.isRequired,
  isLeaving: PropTypes.bool.isRequired,
};
