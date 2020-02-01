// Actions
// -------------------
const LOAD = 'redux-example/info/LOAD';
const LOAD_SUCCESS = 'redux-example/info/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/info/LOAD_FAIL';

import { postRequestConcatExportASYNC } from '../../utils/mockAPI';

const initialState = {
  loaded: false,
  data: null,
};

// Reducer
// -------------------
export default function reducer(state = initialState, action = {}) {

  switch (action.type) {

    case LOAD:
      console.log('>>>>>>>>>>>>>>>> INFO > LOAD > REDUCER > state: ', state);
      console.log('>>>>>>>>>>>>>>>> INFO > LOAD > REDUCER > action: ', action);
      return {
        ...state,
        loading: true,
      };

    case LOAD_SUCCESS:
      console.log('>>>>>>>>>>>>>>>> INFO > LOAD_SUCCESS > REDUCER > state: ', state);
      console.log('>>>>>>>>>>>>>>>> INFO > LOAD_SUCCESS > REDUCER > action: ', action);
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
      };

    case LOAD_FAIL:
      console.log('>>>>>>>>>>>>>>>> INFO > LOAD_FAIL > REDUCER > state: ', state);
      console.log('>>>>>>>>>>>>>>>> INFO > LOAD_FAIL > REDUCER > action: ', action);
      return {
        ...state,
        loading: false,
        loaded: false,
        // error: action.error,
        error: true,
        errorResponse: {message: action.error.message, documentation_url:''},
      };

    default:
      return state;
  }
}

// Actions (action creators)
// -------------------
export function isLoaded(globalState) {
  return globalState.info && globalState.info.loaded;
}

export function load() {
  console.log('>>>>>>>>>>>>>>>> REDUX > INFO > load() +++++++++++++++++++++++++++');
  let location = 'https://api.github.com/feeds';
  // let location = 'https://www.metaweather.com/api/location/2459115/';
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: () => postRequestConcatExportASYNC('resolve', true, 6600)
      .then(
        result => {
          console.log('>>>>>>>>>>>>>>>> REDUX > INFO > load() > THEN 1111111 +++++++++++++++++++++++++++');
          // result.message += ' P6.'
          return result;
        }, 
        // error => {
        //   // handle rejected promise in action creator (closest rejection handler)
        //   console.log('>>>>>>>>>>>>>>>> REDUX > INFO > load() > THEN 2222222 +++++++++++++++++++++++++++');
        //   return Promise.reject(error);
        //   throw error;
        // }
      )
      // .catch(error => {
      //   // handle rejected promise in action creator (closest rejection handler)
      //   console.log('>>>>>>>>>>>>>>>> REDUX > INFO > addNewDataFunc() > CATCH:ERROR:', error);
      //   return Promise.reject(error);
      //   throw error;
      // })
  };
};

// export function load() {
//   console.log('>>>>>>>>>>>>>>>> REDUX > INFO > load() +++++++++++++++++++++++++++');
//   let location = 'https://api.github.com/feeds';
//   // let location = 'https://www.metaweather.com/api/location/2459115/';
//   return {
//     types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
//     // await getSomeAsyncData(location);
//     promise: async () => {
//       try {
//         const response = await getSomeAsyncData(location);
//         return response;
//       } catch (error) {
//         return Promise.reject(error);
//         throw error;
//       }
//     }
//   };
// };
