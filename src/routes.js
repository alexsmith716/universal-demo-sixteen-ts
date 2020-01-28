import {
  App,
  Home,
  NotFound,
} from './containers';

import About from './containers/About/Loadable';
import AboutOne from './containers/AboutOne/Loadable';
import AboutTwo from './containers/AboutTwo/Loadable';
import AboutThree from './containers/AboutThree/Loadable';
import AboutFour from './containers/AboutFour/Loadable';
import StickyFooter from './containers/StickyFooter/Loadable';
import Login from './containers/Login/Loadable';
import Register from './containers/Register/Loadable';

// import { preloadData as preloadDataApp } from './containers/App/App';
import { preloadData as preloadDataHome } from './containers/Home/Home';
import { preloadData as preloadDataAboutFour } from './containers/AboutFour/preloadData';

console.log('DDDDDDDDDD: ', preloadDataHome)

import './theme/scss/global/styles.global.scss';
// loadData: preloadData

export const routes = [{
  component: App,
  routes: [
    { path: '/', exact: true, component: Home, loadData: preloadDataHome },
    { path: '/about', component: About },
    { path: '/aboutone', component: AboutOne },
    { path: '/abouttwo', component: AboutTwo },
    { path: '/aboutthree', component: AboutThree },
    { path: '/aboutfour', component: AboutFour, loadData: preloadDataAboutFour },
    { path: '/stickyfooter', component: StickyFooter },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { component: NotFound }
  ]
}];
