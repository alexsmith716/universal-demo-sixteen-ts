import { matchRoutes } from 'react-router-config';

function getPromises(match, store) {
  // const arr = match.map(m => m.route);
  // console.log('>>>>>>>>>>>>>>>> asyncGetPromises > getPromises > match.map(m.route): ', arr);
  // ----------------------------------------------------------------------------
  // 'Promise.all' expects an ARRAY of Promises
  // initial value for the accumulator????
  return match.map(m => m.route).reduce(async (a, i) => {
    if (i.loadData) {
      console.log('>>>>>>>>>>>>>>>> asyncGetPromises > getPromises > loadData > YESSSSSS');
      return await i.loadData(store);
    } else {
      console.log('>>>>>>>>>>>>>>>> asyncGetPromises > getPromises > loadData > NOOOOOOO ');
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
