import React,{useContext} from 'react';
import '../styles/index.scss';
import { UserProvider } from './UserContext';

const MyApp = ({ Component, pageProps }) => {
  return (
    <UserProvider>
    <Component {...pageProps} />
    </UserProvider>
  );
};
export default MyApp;
