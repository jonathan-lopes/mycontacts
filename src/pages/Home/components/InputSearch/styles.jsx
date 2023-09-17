import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;

  input {
    all: unset;
    box-sizing: border-box;
    width: 100%;
    background: #fff;
    border-radius: 25px;
    height: 50px;
    box-shadow:
      0px,
      4px,
      10px rgba(0, 0, 0, 0.04);
    padding: 0 16px;

    &::placeholder {
      color: #bcbcbc;
    }
  }
`;
