import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: var(--blue);
  color: white;
  padding: 8px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  flex-direction: column;
  height: 12vh;
`;

const Link = styled.a`
  color: var(--yellow);
  margin-left: 4px;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
  }
`;

const FooterSpan = styled.span`
  margin-left: 8px;
  font-size: 12px;
  color: #bdc3c7;
  font-weight: bold;
  margin-top: 10px;
`;

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <p>
        Imagine X Front-End Challenge
        <Link href="https://github.com/your-username/imagex-gallery" target="_blank" rel="noopener noreferrer">
          View on GitHub
        </Link>
      </p>
      <FooterSpan>by Alfonso Zavala 💻</FooterSpan>
    </FooterContainer>
  );
};

export default Footer;