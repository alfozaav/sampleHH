import React from 'react';
import { Providers } from '../lib/redux/provider';
import './globals.css';

export const metadata = {
  title: 'imagineX Gallery',
  description: 'A React image gallery using Redux Toolkit',
};

import StyledComponentsRegistry from '../lib/utils/registry';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <StyledComponentsRegistry>
            {children}
          </StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  );
}