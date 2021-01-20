importScripts('./ngsw-worker.js');

self.addEventListener('sync', (event) => {

    switch(event.tag) {
        case 'user-login' : {
                                console.log('Inside offline-service-worker for ' + event.tag);
                                event.waitUntil(retryRequest());
                                break;
                            }
        case 'categories-fetch' : {
                                console.log('Inside offline-service-worker for ' + event.tag);
                                event.waitUntil(retryRequest());
                                break;
                            }
        case 'menu-find' : {
                                console.log('Inside offline-service-worker for ' + event.tag);
                                event.waitUntil(retryRequest());
                                break;
                            }
        case 'orders-save': {
                                console.log('Inside offline-service-worker for ' + event.tag);
                                event.waitUntil(retryRequest());
                                break;
                            }
        case 'recipe-find': {
                                console.log('Inside offline-service-worker for ' + event.tag);
                                event.waitUntil(retryRequest());
                                break;
                            }
    }
});

function retryRequest() {
    
}