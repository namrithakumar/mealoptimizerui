export interface BaseResponseHandler {
    handleSuccess(successResponse:  any);
    handleFailure(errorResponse : any);
}