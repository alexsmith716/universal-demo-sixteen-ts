import { matchRoutes } from 'react-router-config';

function getPromises(match, store) {
  return Promise.all(
    match.map(async a => {
      if(a.route.loadData) {
        return await a.route.loadData(store);
      } else {
        return Promise.resolve(null);
      }
    })
  );
}

async function asyncGetPromises(routes, pathname, store) {
  const match = matchRoutes(routes, pathname);
  const promises = await getPromises(match, store);
  return { promises };
}

export default asyncGetPromises;
