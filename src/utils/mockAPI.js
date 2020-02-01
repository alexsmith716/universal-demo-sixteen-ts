
// In REST, both 4xx and 5xx types of codes denote an error
// The main difference between the two is whose fault that error is
// A 4xx code indicates an error caused by the user,
//  5xx codes tell the client that they did everything correctly and it's the server itself who caused the problem

function postRequestConcatResolveRejectPromise(resolveReject, requestFound, delay, req) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (resolveReject === 'resolve') {
        if (requestFound) {
          resolve({
            value: `${resolveReject}`,
            time: Date.now(),
            delay: delay,
            message: 'RESOLVED! 200 - Data Found.',
            status: 200,
            data: req ? req.data.concat(req.newData) : null
          });
        } else {
          resolve({
            value: `${resolveReject}`,
            time: Date.now(),
            delay: delay,
            message: 'RESOLVED! 404 - Data Not Found.',
            status: 404,
          });
        }
      } else {
        reject({
          value: `${resolveReject}`,
          time: Date.now(),
          delay: delay,
          message: 'REJECTED! 500 - General Error.',
          status: 500,
        });
      }
    }, delay);
  });
  console.log('###### mockAPI > postRequestConcatResolveRejectPromise PROMISE: ', promise);
  return promise;
};

// ------------------------------------------------------------------------

export function postRequestConcatExportASYNC(resolveReject, requestFound, delay, req) {

  console.log('###### mockAPI > postRequestConcatExportASYNC > resolveReject: ', resolveReject, ' requestFound: ', requestFound, ' delay: ', delay, ' req: ', req);

  resolveReject === 'reject' ? delay = 0 : null;

  const promise = postRequestConcatResolveRejectPromise(resolveReject, requestFound, delay, req);
  console.log('###### mockAPI > postRequestConcatExportASYNC > PROMISE: ', promise);

  // not passing value as next result here / not chaining
  // promise.then(result => {
  //   console.log('###### mockAPI > postRequestConcatExportASYNC > PROMISE.THEN1:', result);
  //   return result;
  // });

  // promise.then(result => {
  //   console.log('###### mockAPI > postRequestConcatExportASYNC > PROMISE.THEN2:', result);
  //   return result;
  // });

  // pending promise now fulfilled or rejected
  // chaining - returned handler value is result of next chained handler
  // a sequence of asynchronous tasks done one after another
  const thenProm = promise
    .then(result => {
      console.log('###### mockAPI > postRequestConcatExportASYNC > PROMISE.THEN1:', result);
      result.message += ' P1 Good Result!'
      return result;
    })
    // .then(result => {
    //   console.log('###### mockAPI > postRequestConcatExportASYNC > PROMISE.THEN2:', result);
    //   result.message += ' P2,'
    //   return result;
    // })
    // .then(result => {
    //   console.log('###### mockAPI > postRequestConcatExportASYNC > PROMISE.THEN3:', result);
    //   result.message += ' P3,'
    //   return result;
    // })
    .catch(error => {
      // handle rejected promise in action creator (closest rejection handler)
      console.log('###### mockAPI > postRequestConcatExportASYNC > CATCH:ERROR:', error);
      // return Promise.reject(error);
      // throw error;
      return error;
    })
    .then(result => {
      // continue/rethrow after catching/handling error
      console.log('###### mockAPI > postRequestConcatExportASYNC > AFTER CATCH > PROMISE.THEN2:', result);

      const message = result.value === 'reject' ? 'RESOLVED! 404 - Data Not Found.' : result.message;
      const status = result.value === 'reject' ? 404 : result.status;

      const resolveRejectedPromise = {
        time: result.time,
        delay: result.delay,
        message: message,
        status: status,
      }

      result.value === 'reject' ? resolveRejectedPromise.message += ' P1 After An Error!' : null;
      

      return resolveRejectedPromise;
    });

  return thenProm;
  // return promise;
}

// =======================================================================

function startResolvedRejectedPromise(v, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (v === 'resolve') {
        resolve({
          value: `${v}`,
          time: Date.now(),
          delay: `${delay}`,
          message: 'RESOLVED! This came from the mock API.'
        });
      } else {
        reject({
          value: `${v}`,
          time: Date.now(),
          delay: `${delay}`,
          message: 'REJECTED! This came from the mock API.'
        });
      }
    }, delay);
  });
};

export async function getSomeAsyncData(location) {

  console.log('###### mockAPI > getSomeAsyncData > location: ', location);

  const response = await startResolvedRejectedPromise('resolve', 5200);
  console.log('###### mockAPI > getSomeAsyncData > startResolvedRejectedPromise(5200) response: ', response);
  return response;
}

export function mockAPI(doWhat, delay) {
  console.log('###### export function mockAPI <<<<<<<<<<<<<<<<<<<<<<<');
  return new Promise(( resolve ) => {
    setTimeout( () => resolve( doWhat() ), delay);
  });
}
