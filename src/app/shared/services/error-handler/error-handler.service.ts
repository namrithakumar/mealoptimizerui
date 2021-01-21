export class ErrorHandler {

    customErrorMessage : String ='There was an error';
    
    handleError(status? : number) : String {
        return this.customErrorMessage;
    };
}