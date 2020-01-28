import { isLoaded as isInfoAlertLoaded, load as loadInfoAlert } from '../../redux/modules/infoAlert';

async function preloadData(store, getState) {
  console.log('>>>>>>>>>>>>>>>> ABOUTFOUR > preloadData() <<<<<<<<<<<<<<<<<<<')
  await store.dispatch(loadInfoAlert()).catch(() => null);
}

export { preloadData };
