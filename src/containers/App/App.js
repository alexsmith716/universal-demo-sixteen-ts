import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { provideHooks } from 'redial';
import { withRouter } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import qs from 'qs';
import { Link } from 'react-router-dom';

import { Footer } from '../../components';
// import { InfoBar } from '../../components';
import { ReadmeModal } from '../../components';
import { FontsModal } from '../../components';

import config from '../../../config/config';
// import { isLoaded as isInfoLoaded, load as loadInfo } from '../../redux/modules/info';

@connect(state => ({
  online: state.online,
  userAgent: state.device.userAgent,
  isBot: state.device.isBot
}))

// async function preloadData(store) {
//   console.log('>>>>>>>>>>>>>>>> APP > preloadData() <<<<<<<<<<<<<<<<<<<')
//   await Promise.resolve(null);
// }

// @provideHooks({
//   fetch: async ({ store: { dispatch, getState } }) => {
//     if (!isInfoLoaded(getState())) {
//       await dispatch(loadInfo()).catch(() => null);
//     }
//   }
// })

@withRouter

export class App extends Component {

  static propTypes = {
    route: PropTypes.objectOf(PropTypes.any).isRequired,
    location: PropTypes.objectOf(PropTypes.any).isRequired,
    online: PropTypes.bool.isRequired,
    userAgent: PropTypes.string.isRequired,
    isBot: PropTypes.string.isRequired,
  };

  static defaultProps = {
    user: null
  };

  state = {
    user: this.props.user,
    prevProps: this.props
  };

  static getDerivedStateFromProps(props, state) {
    const { prevProps } = state;
    // chance to compare incoming props to previous props
    const user = !_.isEqual(prevProps.user, props.user) ? props.user : state.user;

    if (!prevProps.user && props.user) {
      const query = qs.parse(props.location.search, { ignoreQueryPrefix: true });
      props.pushState(query.redirect || '/login-success');
    } else if (prevProps.user && !props.user) {
      props.pushState('/');
    }

    return {
      user,
      prevProps: props
    };
  }

  render() {

    const { notifs, route, online, userAgent, isBot } = this.props;
    const styles = require('./styles/App.scss');

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
            {renderRoutes(route.routes)}
          </div>

          {/* ------------- Device State ----------- */}

          <div className="d-flex justify-content-center">
            <div className="bg-color-ivory text-center m-2">
              <div className="color-olive font-opensans-bold-webfont">{`'online' store state is ${online} !`}</div>
              <div className="color-crimson font-philosopher-bold-webfont">{`device 'userAgent' store state is ${userAgent} !`}</div>
              <div className="color-orangered font-norwester">{`device 'bot' store state is ${isBot} !`}</div>
            </div>
          </div>

          {/* --------------- InfoBar ---------------- */}

          {/* <InfoBar /> */}

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
}
