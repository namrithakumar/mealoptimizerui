import { InjectionToken, Injector } from '@angular/core';

export class DisplayService {
    public createInjector(content : String) {
        return Injector.create({
          providers : [
            { provide: CONTAINER_DATA, useValue : content}]
        });
      }
}
export const CONTAINER_DATA = new InjectionToken<{}>('CONTAINER_DATA');