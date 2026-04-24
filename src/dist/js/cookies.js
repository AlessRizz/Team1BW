document.addEventListener('DOMContentLoaded', () => {
  const banner = document.getElementById('cookie-banner');
  const acceptButton = document.getElementById('accept-cookies');
  const declineButton = document.getElementById('decline-cookies');

  if (!banner || !acceptButton || !declineButton) return;

  acceptButton.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    banner.style.display = 'none';
  });

  declineButton.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'false');
    banner.style.display = 'none';
  });

  if (localStorage.getItem('cookiesAccepted') !== null) {
    banner.style.display = 'none';
  }
});