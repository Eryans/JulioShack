import React from 'react';
import { Container } from 'react-bootstrap';

const Wrapper = ({ children, style }) => {
  return (
    <Container className='pt-5 d-flex flex-column justify-content-center align-items-center' style={style}>
      {children}
    </Container>
  );
};

export default Wrapper;
