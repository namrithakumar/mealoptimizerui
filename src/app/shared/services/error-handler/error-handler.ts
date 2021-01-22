//Parent class for all custom error handlers.
/*
 * Handle errors: There are 3 types of errors in the application,
 *
 * (1) Server errors/ Client errors -> handled in error-interceptor(log for analysis, show full page error)
 * (2) Connection loss -> handled in connection-status-interceptor(display notification on bottom right, store/read from indexed db)
 * (3) User errors -> handled in individual component(display correct error to the user inside the individual component)
*/
export class ErrorHandler {

    customErrorMessage : String ='There was an error';
    
    handleError() : String {
        return this.customErrorMessage;
    };
}