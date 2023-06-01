import React from 'react';
import { Container } from 'react-bootstrap';

const Wrapper = ({ children }) => {
  return (
    <Container className='pt-5'>
      {children}
    </Container>
  );
};

export default Wrapper;
