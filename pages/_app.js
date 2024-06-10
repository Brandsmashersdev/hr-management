import React from 'react';
import { NoteProvider } from '../components/NodeProvider';
import { BrowserRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import '../styles/index.scss';

const MyApp = ({ Component, pageProps }) => {
  return (
    // <NoteProvider>
    //   {typeof window !== 'undefined' ? (
    //     <BrowserRouter>
    //       <Component {...pageProps} />
    //     </BrowserRouter>
    //   ) : (
    //     <StaticRouter location={pageProps.location}>
    //       <Component {...pageProps} />
    //     </StaticRouter>
    //   )}
    // </NoteProvider>
   <Component {...pageProps} />
  );
};

export default MyApp;