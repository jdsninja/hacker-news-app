import React from 'react';
import { Container } from './layoutStyles';

function Layout({
  children,
}) {
  return (
    <Container>
      {children}
    </Container>
  );
}

export default Layout;
