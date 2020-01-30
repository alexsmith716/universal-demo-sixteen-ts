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

import { preloadData as preloadDataApp } from './containers/App/preloadData';
// import { preloadData as preloadDataHome } from './containers/Home/Home';
import { preloadData as preloadDataAboutThree } from './containers/AboutThree/preloadData';
import { preloadData as preloadDataAboutFour } from './containers/AboutFour/preloadData';

console.log('DDDDDDDDDD > preloadDataApp: ', preloadDataApp);            // [AsyncFunction: Me]
console.log('DDDDDDDDDD > preloadDataAboutThree: ', preloadDataAboutThree) // [AsyncFunction: Le]
console.log('DDDDDDDDDD > preloadDataAboutFour: ', preloadDataAboutFour) // [AsyncFunction: Le]

import './theme/scss/global/styles.global.scss';
// { path: '/aboutfour', component: AboutFour, loadData: preloadDataAboutFour },

export const routes = [
  {
    component: App, 
    loadData: preloadDataApp,
    routes: [
      { path: '/', exact: true, component: Home, },
      { path: '/about', component: About },
      { path: '/aboutone', component: AboutOne },
      { path: '/abouttwo', component: AboutTwo },
      { path: '/aboutthree', component: AboutThree, loadData: preloadDataAboutThree },
      { path: '/aboutfour', component: AboutFour, loadData: preloadDataAboutFour },
      { path: '/stickyfooter', component: StickyFooter },
      { path: '/login', component: Login },
      { path: '/register', component: Register },
      { component: NotFound }
    ]
  }
];
