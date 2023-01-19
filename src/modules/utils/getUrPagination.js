import { router } from '../router';

export const getUrPagination = (pageNumber) => {
  const currentLocation = router.getCurrentLocation();

  let url = currentLocation.url;

  return currentLocation.params?.value
    ? `${url}?value=${currentLocation.params.value}&page=${pageNumber}`
    : `${url}?page=${pageNumber}`;
};
