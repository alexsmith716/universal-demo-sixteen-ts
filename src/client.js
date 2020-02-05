import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { renderRoutes } from 'react-router-config';
import {createBrowserHistory} from 'history';
import { HelmetProvider } from 'react-helmet-async';

import localForage from 'localforage';
import { getStoredState } from 'redux-persist';
import { AppContainer } from 'react-hot-loader';

import asyncGetPromises from './utils/asyncGetPromises';
import { Provider } from 'react-redux';
import { RouterTrigger } from './components';
import { routes } from './routes';
import apiClient from './helpers/apiClient';
import configureStore from './redux/configureStore';
import isOnline from './utils/isOnline';
import './js/app';

const persistConfig = {
  key: 'root',
  storage: localForage,
  // redux-persist:
  // inboundState:  the state being rehydrated from storage
  // originalState: the state before the REHYDRATE action
  stateReconciler(inboundState, originalState) {
    // preloadedState from window object
    return originalState;
  },
  // redux-persist:
  whitelist: ['device', 'info', 'infoAlert', 'infoAlertThree', 'infoAlertFour']
};

const spinnerContainer = document.createElement('div');
spinnerContainer.classList.add('d-inline-flex', 'spinner-layered', 'text-light');
// spinnerContainer.className = 'd-inline-flex spinner-layered text-light';
const dest = document.getElementById('react-root');
document.body.insertBefore(spinnerContainer, dest);

const client = apiClient();

const providers = {
  client
};

(async () => {

  // redux-persist:
  // delays rendering of app UI until persisted state has been retrieved and saved to redux
  const preloadedState = await getStoredState(persistConfig);
  const online = window.REDUX_DATA ? true : await isOnline();
  const history = createBrowserHistory();

  const store = configureStore({
    history,
    data: {
      ...preloadedState,
      ...window.REDUX_DATA,
      online
    },
    helpers: providers,
    persistConfig
  });

  const triggerHooks = async (_routes, pathname, store) => {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> CLIENT > triggerHooks > store.getState() 1111 ######: ', store.getState());
    spinnerContainer.classList.add('spinner-border');

    // Don't fetch data for initial route, server has already done the work:
    if (window.__PRELOADED__) {
      // Delete initial data so that subsequent data fetches can occur:
      console.log('>>>>>>>>>>>>>>>>>>>>>>>> CLIENT > triggerHooks > window.__PRELOADED__?? 11: ', window.__PRELOADED__);
      delete window.__PRELOADED__;
    } else {
      // Fetch mandatory data dependencies for 2nd route change onwards:
      console.log('>>>>>>>>>>>>>>>>>>>>>>>> CLIENT > triggerHooks > window.__PRELOADED__?? 22: ', window.__PRELOADED__);
      await asyncGetPromises(_routes, pathname, store);
    }
    // defer certain data fetching operations to client >>>> server-side performance <<<<
    spinnerContainer.classList.remove('spinner-border');
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> CLIENT > triggerHooks > store.getState() 2222 ######: ', store.getState());
  };

  const hydrate = _routes => {
    const element = (
      <HelmetProvider>
        <AppContainer>
          <Provider store={store} {...providers}>
            <Router history={history}>
              <RouterTrigger trigger={pathname => triggerHooks(_routes, pathname, store)}>
                {renderRoutes(_routes)}
              </RouterTrigger>
            </Router>
          </Provider>
        </AppContainer>
      </HelmetProvider>
    );

    if (dest.hasChildNodes()) {
      ReactDOM.hydrate(element, dest);
    } else {
      ReactDOM.render(element, dest);
    }
  };

  hydrate(routes);

  // if (__DEVTOOLS__ && !window.__REDUX_DEVTOOLS_EXTENSION__) {
  //   console.log('>>>>>>>>>>>>>>>>>>> CLIENT > __DEVTOOLS__ <<<<<<<<<<<<<<<<<<<<<<');
  //   const devToolsDest = document.createElement('div');
  //   window.document.body.insertBefore(devToolsDest, null);
  //   const DevTools = require('./containers/DevTools/DevTools').default;

  //   ReactDOM.hydrate(
  //     <Provider store={store}>
  //       <DevTools />
  //     </Provider>,
  //     devToolsDest
  //   );
  // }

  if (!__DEVELOPMENT__ && 'serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('>>>>>>>>>>>>>>>>>>>>>>>> CLIENT > serviceWorker in navigator > SW Registered! > ');
      // registration
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          switch (installingWorker.state) {
            case 'installed':
              if (navigator.serviceWorker.controller) {
                // old content purged and fresh content added to cache
                console.log('>>>>>>>>>>>>>>>>>>>>>>>> CLIENT > serviceWorker > new or updated content is available <<<<<<<<<<<<<');
              } else {
                // precaching complete
                console.log('>>>>>>>>>>>>>>>>>>>>>>>> CLIENT > serviceWorker > content cached for offline use <<<<<<<<<<<<<');
              }
              break;
            case 'redundant':
              console.log('>>>>>>>>>>>>>>>>>>>>>>>> CLIENT > serviceWorker > installed service worker redundant <<<<<<<<<<<<<');
              break;
            default:
              // ignore
          }
        };
      };
    } catch (error) {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>> CLIENT > serviceWorker > Error registering service worker: ', error);
    }

    await navigator.serviceWorker.ready;
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> CLIENT > serviceWorker > SW Ready! <<<<<<<<<<<<<')
    // registration.active
  } else {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> CLIENT > !__DEVELOPMENT__ && serviceWorker in navigator NO!! <<<<<<<<<<<<<');
  }
})();
