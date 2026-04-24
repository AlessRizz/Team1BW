 const banner = document.getElementById('cookie-banner');
  const button = document.getElementById('accept-cookies');

  button.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    banner.style.display = 'none';
  });

  // Проверка при загрузке
  if (localStorage.getItem('cookiesAccepted')) {
    banner.style.display = 'none';
  }