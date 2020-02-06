import { isLoaded as isInfoAlertFourLoaded, load as loadInfoAlertFour } from '../../redux/modules/infoAlertFour';

async function preloadData(store, getState) {
  console.log('>>>>>>>>>>>>>>>> AboutFour > preloadData > store.getState()!!!: ', store.getState());

  console.log('>>>>>>>>>>>>>>>> AboutFour > preloadData > loadInfoAlertFour?: ', isInfoAlertFourLoaded(store.getState()));
  if (!isInfoAlertFourLoaded(store.getState())) {
    await store.dispatch(loadInfoAlertFour());
  }
}

export { preloadData };
