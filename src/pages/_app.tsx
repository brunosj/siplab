import { AppProps } from 'next/app';
import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import { siteMetadata } from '../utils/siteMetadata';
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class' defaultTheme={siteMetadata.theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp);
