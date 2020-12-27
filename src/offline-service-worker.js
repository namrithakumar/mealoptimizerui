self.addEventListener('fetch', (fetchEvent) => {
  return fetchEvent.respondWith(fetch(fetchEvent.request)
            .then(res => { return res; })
            .catch(() => { 
              if(caches.match('/offline.html')) {
                return caches.match('/offline.html');
              }
            }))
  
});

importScripts('./ngsw-worker.js');