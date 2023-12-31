import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { type AppType } from 'next/app';
import { api } from '~/utils/api';
import '~/styles/globals.css';
import Layout from '~/components/layout';
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider
} from '@mantine/core';
import { useState } from 'react';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps }
}) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value: ColorScheme) => {
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
  };
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme
        }}
      >
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default api.withTRPC(MyApp);
