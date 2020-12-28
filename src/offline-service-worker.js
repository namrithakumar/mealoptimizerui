self.addEventListener('fetch', (fetchEvent) => {
  return fetchEvent.respondWith(fetch(fetchEvent.request)
            .then(res => { return res; })
            .catch(() => {
                // Check if the user is offline first and is trying to navigate to a web page
                console.log('Request method : ' + fetchEvent.request.method);
                console.log('Request method : ' + fetchEvent.request.url);
                console.log('Match found in cache for /offline.html : ' + caches.match('/offline.html')?true:false);
                return caches.match('/offline.html');
          }))
        });
importScripts('./ngsw-worker.js');