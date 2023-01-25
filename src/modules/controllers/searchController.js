import { router } from '../router';

export const searchController = (formSearch) => {
  formSearch.addEventListener('submit', (e) => {
    e.preventDefault();
    if (formSearch.search.value.trim()) {
      router.navigate(`search?value=${formSearch.search.value}`);
    }
  });
};
