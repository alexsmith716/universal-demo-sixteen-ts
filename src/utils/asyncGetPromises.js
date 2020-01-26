import { matchRoutes } from 'react-router-config';

function getPromises(match, store) {
  return match.map( async x => {
    if (x.route.loadData) {
      console.log('>>>>>>>>>>>>>>>> asyncGetPromises > getPromises > YES: ', x.route.loadData);
      return await x.route.loadData(store);
    } else {
      console.log('>>>>>>>>>>>>>>>> asyncGetPromises > getPromises > NO: ', x.route.loadData);
      return Promise.resolve(null);
    }
  });
}

const asyncGetPromises = async (routes, pathname, store) => {
  const match = matchRoutes(routes, pathname);
  const promises = await getPromises(match, store);
  console.log('>>>>>>>>>>>>>>>> asyncGetPromises > await getPromises > promises: ', promises);
  return { promises };
};

export default asyncGetPromises;
