document.addEventListener('click', e => {
  const searchBar = document.querySelector('.search-bar')
  const dropdown = document.querySelector('.search-results-container');

  if (e.target !== searchBar && dropdown) dropdown.style.display = 'none';

  if (e.target === searchBar && dropdown) dropdown.style.display = 'block';
})