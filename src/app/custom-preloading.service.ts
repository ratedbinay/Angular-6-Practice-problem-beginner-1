import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// Since we are creating a Custom Preloading Strategy, this service
// class must implement PreloadingStrategy abstract class

export class CustomPreloadingService implements PreloadingStrategy {

  constructor() { }

  
  preload(route: Route, fn: () => Observable<any>): Observable<any> {

    // If data property exists on the route of the lazy loaded module
    // and if that data property also has preload property set to
    // true, then return the fn() which preloads the module

    if (route.data && route.data['preload']) {
      return fn();

    // If data property does not exist or preload property is set to
    // false, then return Observable of null, so the module is not
    // preloaded in the background

    } else {
      return of(null);
    }
  }
}