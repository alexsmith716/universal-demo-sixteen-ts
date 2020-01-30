import { isLoaded as isInfoAlertThreeLoaded, load as loadInfoAlertThree } from '../../redux/modules/infoAlertThree';

async function preloadData(store, getState) {
  console.log('>>>>>>>>>>>>>>>> ABOUTTHREE > preloadData() <<<<<<<<<<<<<<<<<<<')
  await store.dispatch(loadInfoAlertThree());
}

export { preloadData };
