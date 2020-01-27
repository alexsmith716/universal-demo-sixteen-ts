import { matchRoutes } from 'react-router-config';

function getPromises(match, store) {
  // const arr = match.map(m => m.route);
  // console.log('>>>>>>>>>>>>>>>> asyncGetPromises > getPromises > match.map(m.route): ', arr);
  // ----------------------------------------------------------------------------
  return match.map(m => m.route).reduce(async (a, i) => {
    if (i.preloadData) {
      console.log('>>>>>>>>>>>>>>>> asyncGetPromises > getPromises > YESSSSSS');
      return await i.preloadData(store);
    } else {
      console.log('>>>>>>>>>>>>>>>> asyncGetPromises > getPromises > NOOOOOOO ');
      return Promise.resolve(null);
    }
  })
}

const asyncGetPromises = async (routes, pathname, store) => {
  const match = matchRoutes(routes, pathname);
  const promises = await getPromises(match, store);
  console.log('>>>>>>>>>>>>>>>> asyncGetPromises > await getPromises(): ', promises);
  return { promises };
};

export default asyncGetPromises;
