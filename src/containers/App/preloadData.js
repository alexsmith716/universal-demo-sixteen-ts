import { isLoaded as isInfoLoaded, load as loadInfo } from '../../redux/modules/info';
import { isLoaded as isInfoAlertOneLoaded, load as loadInfoAlertOne } from '../../redux/modules/infoAlertOne';

async function preloadData(store, getState) {
  console.log('>>>>>>>>>>>>>>>> APP > preloadData <<<<<<<<<<<<<<<<<<<<<<')
  console.log('>>>>>>>>>>>>>>>> APP > preloadData > isInfoLoaded?: ', isInfoLoaded(store.getState()))
  // if (!isInfoLoaded(store.getState())) {
  //   await store.dispatch(loadInfo()).catch(() => null);
  // }
  console.log('>>>>>>>>>>>>>>>> APP > preloadData > isInfoAlertOneLoaded?: ', isInfoAlertOneLoaded(store.getState()))
  // if (!isInfoAlertOneLoaded(store.getState())) {
  //   await store.dispatch(loadInfoAlert()).catch(() => null);
  // }
  await store.dispatch(loadInfo());
  await store.dispatch(loadInfoAlertOne());
}

export { preloadData };
