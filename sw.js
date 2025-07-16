// Daftar domain yang ingin diblokir
const blockedDomains = [
  'ztiztuglcs.com',
  'adsco.re',
  'c.adsco.re',
  'adscore.com'
];

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Cek jika hostname mengandung domain yang diblokir
  if (blockedDomains.some(domain => url.hostname.includes(domain))) {
    console.log('Memblokir permintaan ke:', url.href);
    // Balas dengan response kosong
    event.respondWith(
      new Response('', {
        status: 204,
        statusText: 'No Content'
      })
    );
    return; // Jangan lanjutkan fetch asli
  }

  // Jika bukan domain blokir, lanjutkan fetch seperti biasa
  event.respondWith(fetch(event.request));
});
