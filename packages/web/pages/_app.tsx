import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { AppProps } from 'next/app';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import ReduxLoadingBar from 'react-redux-loading';
import { Provider, useDispatch } from 'react-redux';
import { createStore } from 'redux';
import Amplify, { Auth } from 'aws-amplify';
import reducer from '@frontend/shared/redux/reducers';
// import middleware from '@frontend/shared/redux/middleware';
import { ApolloProvider } from '@apollo/client';
import { client } from '@frontend/shared/graphql/index';
import aws_exports from '@frontend/shared/aws-exports';
import { setAuthUser, initialAuthUser } from '@frontend/shared/redux/actions/auth';
import colors from '@frontend/shared/config/colors';
// import { loadUserType } from '@frontend/shared/redux/actions/user';
import { Header } from '../src/components/header/Header'
import { Balance } from '../src/components/balance/Balance'
import { IncomeExpenses } from '../src/components/incomeExpenses/IncomeExpenses'
import { TransactionList } from '../src/components/transaction/TransactionList'
import { AddTransaction } from '../src/components/transaction/AddTransaction'


// Global CSS
// import '../src/styles/styles.css';

// CSS from node modules
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import '../src/components/header/Header.css';

Amplify.configure({
  ...aws_exports,
  ssr: true,
  oauth: {
    ...aws_exports.oauth,
    redirectSignIn: true ? 'https://d3fmot6d29rs7w.cloudfront.net/' : 'http://localhost:3000/',
    redirectSignOut: true ? 'https://d3fmot6d29rs7w.cloudfront.net/' : 'http://localhost:3000/',
  },
});

const stripePromise = loadStripe(
  'pk_test_517LnJnDPrb5EfwdRchW3z9AVO6xddwRZtSHqD311B4HW5j9Ouh9dmzU6UDiwH5Hwgh7jWSaqiQn7phQGitMPS0C500jhmK4yHw',
);

const store = createStore(reducer);

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={{ colors }}>
          <Elements stripe={stripePromise}>
            <ReduxLoadingBar style={{ color: 'red', zIndex: 9989, position: 'fixed', top: 0 }} />
            <GetData />
            <Component {...pageProps} />
            <Header/>
            <div className="container">
              <Balance/>
              <IncomeExpenses/>
              <TransactionList/>
              <AddTransaction/>

            </div>
          </Elements>
        </ThemeProvider>
      </ApolloProvider>
    </Provider>
  );
}

export default App;

const GetData = () => {
  const dispatch = useDispatch();
  const getAuthData = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        const data = {
          attributes: user.attributes,
          signInUserSession: user.signInUserSession,
          admin: user.signInUserSession.accessToken.payload['cognito:groups']
            ? user.signInUserSession.accessToken.payload['cognito:groups'].indexOf('superadmin') >
              -1
            : false,
        };
        dispatch(setAuthUser(data));
        // if (localStorage.getItem('isSpaceOwner')) {
        //   dispatch(loadUserType(localStorage.getItem('isSpaceOwner') === 'true' ? true : false));
        // }
        // dispatch(initialAuthUser());
      }
    } catch (error) {
      dispatch(initialAuthUser());
      // console.log("Erro", error);
      // router.push("/");
    }
  };

  useEffect(() => {
    getAuthData();
  }, []);
  return null;
};
