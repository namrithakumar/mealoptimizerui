importScripts('./ngsw-worker.js');

self.addEventListener('sync', (event) => {
    if(event.tag === 'post-data') {
        console.log('Calling background sync');
    }});