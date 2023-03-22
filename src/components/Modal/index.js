import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Overlay, Container, Footer } from './styles';
import Button from '../Button';

export default function Modal({ danger }) {
  return ReactDOM.createPortal(
    <Overlay>
      <Container danger={danger}>
        <h1>Título do Modal</h1>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, est
          odio quae natus voluptatem reiciendis accusamus nesciunt animi ex?
          Dolorem illo rerum ex optio perferendis facilis quam ea distinctio
          delectus!
        </p>

        <Footer>
          <button type="button" className="cancel-button">
            Cancelar
          </button>

          <Button danger type="button">
            Deletar
          </Button>
        </Footer>
      </Container>
    </Overlay>,
    document.getElementById('modal-root'),
  );
}

Modal.propTypes = {
  danger: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
};
