import { isLoaded as isInfoAlertFourLoaded, load as loadInfoAlertFour } from '../../redux/modules/infoAlertFour';

async function preloadData(store, getState) {
  console.log('>>>>>>>>>>>>>>>> ABOUTFOUR > preloadData() <<<<<<<<<<<<<<<<<<<')
  await store.dispatch(loadInfoAlertFour());
}

export { preloadData };
