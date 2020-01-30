import React from 'react';
import ReactDOM from 'react-dom/server';
import { Provider } from 'react-redux';
import { Router, StaticRouter } from 'react-router';
import { createMemoryHistory } from 'history';
import { renderRoutes } from 'react-router-config';
import { CookieStorage, NodeCookiesWrapper } from 'redux-persist-cookie-storage'; 
import { trigger } from 'redial';

import asyncMatchRoutes from './utils/asyncMatchRoutes';
import asyncGetPromises from './utils/asyncGetPromises';
import { routes } from './routes';
import configureStore from './redux/configureStore';
import initialStatePreloaded from './redux/initial-preloaded-state';
import { getUserAgent, isBot } from './utils/device';

import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';

import Html from './helpers/Html';
import config from '../config/config';
import apiClient from './helpers/apiClient';

import { HelmetProvider } from 'react-helmet-async';
import serialize from 'serialize-javascript';

// -------------------------------------------------------------------
export default ({ clientStats }) => async (req, res) => {

  req.counterPreloadedState = Math.floor(Math.random() * (100 - 1)) + 1;
  req.userAgent = getUserAgent(req.headers['user-agent']);
  req.isBot = isBot(req.headers['user-agent']);

  const history = createMemoryHistory({ initialEntries: [req.originalUrl] });

  const preloadedState = initialStatePreloaded(req);

  const providers = {
    client: apiClient(req)
  };

  const store = configureStore({
    history,
    data: {...preloadedState},
    helpers: providers
  });

  // =======================================================================================
  console.log('>>>>>>>>>>>>>>>>>>>>>>>> SERVER > store.getState() 1111 ###################################################: ', store.getState());
  const promises = await asyncGetPromises(routes, req.path, store);
  console.log('>>>>>>>>>>>>>>>>>>>>>>>> SERVER > promises: ', promises);

  Promise.all(promises)
    .then((foo) => {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>> SERVER > Promise.all(promises) ###################################################: ', foo);
      console.log('>>>>>>>>>>>>>>>>>>>>>>>> SERVER > store.getState() 2222 ###################################################: ', store.getState());
      //
      function hydrate(a) {
        res.write('<!doctype html>');
        ReactDOM.renderToNodeStream(<Html assets={a} store={store} />).pipe(res);
      }

      try {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>> SERVER > store.getState() 3333 ###################################################: ', store.getState());

        // // =============================================================================
        // // Match routes based on history object:
        // // Get array of route handler components:
        // const { components, match } = await asyncMatchRoutes(routes, req.path);
        // // Define locals to be provided to all lifecycle hooks:
        // const triggerLocals = {
        //   ...providers,
        //   store,
        //   match,
        //   history,
        //   location: history.location
        // };
        // // Wait for async data fetching to complete, then render:
        // await trigger('fetch', components, triggerLocals);
        // // =============================================================================

        const helmetContext = {};
        const context = {};

        const component = (
          <HelmetProvider context={helmetContext}>
            <Provider store={store} {...providers}>
              <Router history={history}>
                <StaticRouter location={req.originalUrl} context={context}>
                  {renderRoutes(routes)}
                </StaticRouter>
              </Router>
            </Provider>
          </HelmetProvider>
        );

        const content = ReactDOM.renderToString(component);

        const assets = flushChunks(clientStats, { chunkNames: flushChunkNames() });

        const status = context.status || 200;

        if (__DISABLE_SSR__) {
          return hydrate(assets);
        }

        if (context.url) {
          return res.redirect(301, context.url);
        }

        const { location } = history;

        if (decodeURIComponent(req.originalUrl) !== decodeURIComponent(location.pathname + location.search)) {
          return res.redirect(301, location.pathname);
        }

        // const used = process.memoryUsage().heapUsed / 1024 / 1024;
        // console.log(`SERVER.JS: The script uses approximately ${Math.round(used * 100) / 100} MB`);

        const reduxStore = serialize(store.getState());

        const html = <Html assets={assets} content={content} store={reduxStore} />;

        const ssrHtml = `<!DOCTYPE html><html lang="en-US">${ReactDOM.renderToString(html)}</html>`;
        res.status(200).send(ssrHtml);

      } catch (error) {
        res.status(500);
        hydrate(flushChunks(clientStats, { chunkNames: flushChunkNames() }));
      }
    })
    //
    .catch(error => {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>> SERVER > Promise.all > ERROR: ', error);
    })
};
