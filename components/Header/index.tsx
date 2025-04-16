import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: var(--blue);
  color: white;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8vh;
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 24px;
  font-weight: bold;
`;

const Header: React.FC = () => (
  <HeaderContainer>
    <Logo>
      <img src="/logo.webp" alt="ImagineX White Logo" />
    </Logo>
  </HeaderContainer>
);

export default Header;