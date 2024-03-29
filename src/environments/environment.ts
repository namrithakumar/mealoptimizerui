// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Usually the environments are local, dev, test, staging, pre prod and prod. Here we restrict to dev, test and prod.
export const environment = {
  production: false,
  hostUrl : 'http://localhost',
  applicationName : 'mealoptimizer',
  port : 9090,
  envName : 'dev'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
