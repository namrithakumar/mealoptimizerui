export interface BaseResponseHandler {
    handleSuccess(successResponse:  any, action? : String);
    handleFailure(errorResponse : any, action? : String);
}