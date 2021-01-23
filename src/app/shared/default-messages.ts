import { HttpRequestStatus } from './http-request-status.enum';

//Setup default messages for Fetch-Menu
const defaultMessagesMenu = new Map<HttpRequestStatus, String>();
defaultMessagesMenu.set(HttpRequestStatus.NO_ACTION, 'Please select diet type');
defaultMessagesMenu.set(HttpRequestStatus.REQUEST_SENT, 'Waiting for menu');
defaultMessagesMenu.set(HttpRequestStatus.RESPONSE_RECEIVED, 'Please select a meal');

//Setup default messages for Get-OptimizedMealPlans
const defaultMessagesMealPlan = new Map<HttpRequestStatus, String>();
defaultMessagesMealPlan.set(HttpRequestStatus.NO_ACTION, 'Please select meals. Meal plan will be displayed here.');
defaultMessagesMealPlan.set(HttpRequestStatus.REQUEST_SENT, 'Waiting for meal plan');
defaultMessagesMealPlan.set(HttpRequestStatus.RESPONSE_RECEIVED, ''); //No message will be displayed, instead the actual optimized meal plan will be displayed

//Setup default messages for Fetch-Recipe
const defaultMessagesRecipe = new Map<HttpRequestStatus, String>();
defaultMessagesRecipe.set(HttpRequestStatus.NO_ACTION, 'Select a meal plan to view recipes');
defaultMessagesRecipe.set(HttpRequestStatus.REQUEST_SENT, 'Waiting for recipe');
defaultMessagesRecipe.set(HttpRequestStatus.RESPONSE_RECEIVED, ''); //No message will be displayed, instead the actual recipe will be displayed


export const defaultMessages = { 
    menu: defaultMessagesMenu, 
    mealPlan: defaultMessagesMealPlan, 
    recipe : defaultMessagesRecipe
    };