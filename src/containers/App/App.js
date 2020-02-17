import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';

import { Footer } from '../../components';
import { InfoBar } from '../../components';
import { ReadmeModal } from '../../components';
import { FontsModal } from '../../components';

import config from '../../../config/config';

// >>>>>>>>>>>>>>>>>>>>>>>> App > props:  {
//   history: {
//     createHref: [Function: createHref],
//     action: 'POP',
//     location: { pathname: '/aboutfour', search: '', hash: '', state: undefined },
//     push: [Function (anonymous)],
//     replace: [Function (anonymous)],
//     go: [Function (anonymous)],
//     goBack: [Function (anonymous)],
//     goForward: [Function (anonymous)],
//     listen: [Function (anonymous)],
//     block: [Function (anonymous)]
//   },
//   location: { pathname: '/aboutfour', search: '', hash: '', state: undefined, key: 'ac3df4' },
//   match: { path: '/', url: '/', params: {}, isExact: false },
//   staticContext: {},
//   route: {
//     component: {
//       '$$typeof': Symbol(react.memo),
//       type: [Function: ConnectFunction],
//       compare: null,
//       WrappedComponent: [Function (anonymous)],
//       displayName: 'Connect(Component)'
//     },
//     loadData: [AsyncFunction: loadData],
//     routes: [
//       [Object], [Object],
//       [Object], [Object],
//       [Object], [Object],
//       [Object], [Object],
//       [Object], [Object]
//     ]
//   },
//   online: true,
//   userAgent: 'desktop',
//   isBot: false,
//   dispatch: [Function (anonymous)]
// }

// https://reacttraining.com/blog/useEffect-is-not-the-new-componentDidMount/
// https://reacttraining.com/blog/when-to-use-functions-in-hooks-dependency-array/
// https://reacttraining.com/blog/reach-react-router-future/

// https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/Route.md

// have to re-do / go over 'RouterTrigger'
// and why so little mention/usage of 'renderRoutes/react-router-config' in ReactTraining?

export const App = (props) => {

  console.log('>>>>>>>>>>>>>>>>>>>>>>>> App > props: ', props);

  const online = useSelector(state => state.online);
  const userAgent = useSelector(state => state.device.userAgent);
  const isBot = useSelector(state => state.device.isBot);

  const styles = require('./styles/App.scss');

  // const location = useLocation();

  const [prevPropsLocation, setPrevPropsLocation] = useState(props.location);

  if (props.location.pathname !== prevPropsLocation.pathname) {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> App > useEffect() > Router Location Changed?: ', props.location.pathname !== prevPropsLocation.pathname);
  }

  useEffect(() => {
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> App > useEffect() > useLocation() > props.location.pathname: ', props.location.pathname);
    console.log('>>>>>>>>>>>>>>>>>>>>>>>> App > useEffect() > useLocation() > prevPropsLocation.pathname: ', prevPropsLocation.pathname);
    if (props.location.pathname !== prevPropsLocation.pathname) {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>> App > useEffect() > setPrevPropsLocation(props.location) <<<<<<<<<<<<<<<<<<<<<<');
      setPrevPropsLocation(props.location);
    }
  });

  return (

    <HelmetProvider>

      <div className={`bg-danger ${styles.app}`}>

        <Helmet {...config.app.head} />

        {/* ------------- Bootstrap Navbar ------------- */}

        {/* <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"> */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

          <div className="container">

            <Link to='/' className="navbar-brand js-scroll-trigger">Election App</Link>

            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarResponsive">

              <ul className="navbar-nav mr-auto">

                <li className="nav-item">
                  <a className="nav-link" data-toggle="modal" href="#ReadmeModal">README.js</a>
                </li>

                <li className="nav-item">
                  <Link to='/login' className="nav-link js-scroll-trigger">
                    <span className={`fas fa-fw fa-sign-in-alt ${styles.sharedVarColorRutgersScarletXX}`}></span>Login</Link>
                </li>

                <li className="nav-item">
                  <Link to='/register' className="nav-link js-scroll-trigger">Register</Link>
                </li>

                <li className="nav-item">
                  <a className="nav-link font-old-english" data-toggle="modal" data-target=".fontsModal" href="#">Fonts</a>
                </li>

                <li className="nav-item">
                  <a className="nav-link font-norwester" href="#">
                    <span className={`fas fa-fw fa-headphones ${styles.colorGoldLocal}`}></span><span className={styles.testColorFont}>Headphones!</span></a>
                </li>

                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="dropdown02" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Interesting Links</a>
                  <div className="dropdown-menu" aria-labelledby="dropdown02">
                    <Link to='/about' className="dropdown-item js-scroll-trigger">About</Link>
                    <Link to='/aboutone' className="dropdown-item js-scroll-trigger">About One</Link>
                    <Link to='/abouttwo' className="dropdown-item js-scroll-trigger">About Two</Link>
                    <Link to='/aboutthree' className="dropdown-item js-scroll-trigger">About Three</Link>
                    <Link to='/aboutfour' className="dropdown-item js-scroll-trigger">About Four</Link>
                    <Link to='/stickyfooter' className="dropdown-item js-scroll-trigger">StickyFooter</Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* ------------- Main Content ------------- */}

        <div className="bg-warning">
          {renderRoutes(props.route.routes)}
        </div>

        {/* ------------- Device State ----------- */}

        <div className="d-flex justify-content-center">
          <div className="bg-color-ivory text-center m-2">
            <div className="color-olive font-opensans-bold-webfont">{`'online' store state is ${props.online} !`}</div>
            <div className="color-crimson font-philosopher-bold-webfont">{`device 'userAgent' store state is ${props.userAgent} !`}</div>
            <div className="color-orangered font-norwester">{`device 'bot' store state is ${props.isBot} !`}</div>
          </div>
        </div>

        {/* --------------- InfoBar ---------------- */}

        <InfoBar />

        {/* --------------- Footer ----------------- */}

        <Footer 
          footer={styles.footer} 
          flexContainer={styles.flexContainer} 
          colorGoldLocal={styles.colorGoldLocal}
          complexProp={
            {
              "categories": [{
                "size": "large",
                "color": "brown",
              }]
            }
          }
        />

        {/* --------------- Modals ----------------- */}

        <ReadmeModal />

        <FontsModal 
          styles={ styles }
        />

      </div>
    </HelmetProvider>
  );
}

export default App;
