import { matchRoutes } from 'react-router-config';

// function getPromises(match, store) {
//   console.log('##################### asyncGetPromises > getPromisesXX > MATCH: ', match);
//   // -------------------------------
//   const p = match.map(o => o.route)
//   console.log('##################### asyncGetPromises > getPromisesXX > route: ', p);
//   // -------------------------------
//   const u = match.map(t => t.route.loadData)
//   console.log('##################### asyncGetPromises > getPromisesXX > route.loadData: ', u);
//   // -------------------------------
//   const h = match.map(q => q.route.loadData).filter(r => r !== undefined)
//   console.log('##################### asyncGetPromises > getPromisesXX > FILTER!!: ', h);
//   // -------------------------------
//   const x = match.map(xx => {
//     console.log('##################### asyncGetPromises > getPromisesXX > xx.route: ', xx.route)
//     if(xx.route.loadData) {
//       console.log('##################### asyncGetPromises > getPromisesXX > xx.route.loadData?: ', xx.route.loadData)
//       return xx.route.loadData;
//     } else {
//       return null;
//     }
//   })
//   console.log('##################### asyncGetPromises > getPromisesXX > FINAL X: ', x)
//   return x;
// }

// function getPromises(match, store) {
//   return Promise.all(
//     match.map(async a => {
//       if(a.route.loadData) {
//         return await a.route.loadData(store);
//       } else {
//         return await Promise.resolve(null);
//       }
//     })
//   );
// }

function getPromisesZZ(match, store) {
  return match.map(a => {
    if(a.route.loadData) {
      const p = a.route.loadData(store)
      console.log('##################### asyncGetPromises > getPromises > PPPPPPP1: ', p)
      return p;
    } else {
      const pp = Promise.resolve(null)
      console.log('##################### asyncGetPromises > getPromises > PPPPPPP2: ', pp)
      return pp;
    }
  });
}

function getPromises(match, store) {
  const arr = match.map(q => q.route.loadData).filter(r => r !== undefined);
  console.log('##################### asyncGetPromises > getPromises > filter > arr: ', arr)
  return arr.map(a => a(store));
}

async function asyncGetPromises(routes, pathname, store) {
  const match = matchRoutes(routes, pathname);
  // getPromisesXX(match, store);
  const promises = await getPromises(match, store);
  console.log('##################### asyncGetPromises > RETURN promises: ', promises)
  return promises;
}

export default asyncGetPromises;
