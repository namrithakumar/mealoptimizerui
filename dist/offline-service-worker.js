self.addEventListener('fetch', (fetchEvent) => {
  console.log('fetch !' + JSON.stringify(fetchEvent.request))
  return fetchEvent.respondWith(fetch(fetchEvent.request)
            .then(res => { return res; })
            .catch(() => { 
              if(caches.match('/offline.html')) {
                console.log('match found in cache for /offline.html');
                return caches.match('/offline.html');
              }
            }))
  
});

importScripts('./ngsw-worker.js');