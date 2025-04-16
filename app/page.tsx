'use client';

import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ImageGallery from '../components/ImageGallery';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
`;

const MainContent = styled.main`
  flex: 1;
  overflow: hidden;
  height: calc(100vh - 8vh - 12vh);
`;

export default function Home() {
  return (
    <MainContainer>
      <Header />
      <MainContent>
        <ImageGallery />
      </MainContent>
      <Footer />
    </MainContainer>
  );
}