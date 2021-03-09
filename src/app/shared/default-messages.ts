import { HttpRequestStatus } from './http-request-status.enum';

//Setup default messages for Fetch-Menu
const defaultMessagesMenu = new Map<HttpRequestStatus, String>();
defaultMessagesMenu.set(HttpRequestStatus.NO_ACTION, 'Please select diet');
defaultMessagesMenu.set(HttpRequestStatus.REQUEST_SENT, 'Fetching menu');
defaultMessagesMenu.set(HttpRequestStatus.RESPONSE_RECEIVED, 'Please select a meal');

//Setup default messages for Get-OptimizedMealPlans
const defaultMessagesMealPlan = new Map<HttpRequestStatus, String>();
defaultMessagesMealPlan.set(HttpRequestStatus.NO_ACTION, 'Please select meals. Meal plan will be displayed here.');
defaultMessagesMealPlan.set(HttpRequestStatus.REQUEST_SENT, 'Fetching meal plan');
defaultMessagesMealPlan.set(HttpRequestStatus.RESPONSE_RECEIVED, ''); //No message will be displayed, instead the actual optimized meal plan will be displayed

//Setup default messages for Fetch-Recipe
const defaultMessagesRecipe = new Map<HttpRequestStatus, String>();
defaultMessagesRecipe.set(HttpRequestStatus.NO_ACTION, 'Select a meal plan to view recipes');
defaultMessagesRecipe.set(HttpRequestStatus.REQUEST_SENT, 'Fetching recipe');
defaultMessagesRecipe.set(HttpRequestStatus.RESPONSE_RECEIVED, ''); //No message will be displayed, instead the actual recipe will be displayed

//Setup default messages for User-login
const defaultMessagesLogin = new Map<HttpRequestStatus, String>();
defaultMessagesLogin.set(HttpRequestStatus.NO_ACTION, ''); //Login page is self explanatory, we need not display help-text 
defaultMessagesLogin.set(HttpRequestStatus.REQUEST_SENT, 'Login in progress');
defaultMessagesLogin.set(HttpRequestStatus.RESPONSE_RECEIVED, ''); //No message will be displayed, instead the user will be redirected to meal-optimizer/meal-planner page

//Setup default messages for User-registation
const defaultMessagesRegister = new Map<HttpRequestStatus, String>();
defaultMessagesRegister.set(HttpRequestStatus.NO_ACTION, ''); //Registration page is self explanatory, we need not display help-text
defaultMessagesRegister.set(HttpRequestStatus.REQUEST_SENT, 'Registration in progress');
defaultMessagesRegister.set(HttpRequestStatus.RESPONSE_RECEIVED, ''); //No message will be displayed, instead the user will be redirected to meal-optimizer/meal-planner page

export const DefaultMessages = { 
                                menu: defaultMessagesMenu, 
                                mealPlan: defaultMessagesMealPlan, 
                                recipe : defaultMessagesRecipe,
                                login : defaultMessagesLogin,
                                register : defaultMessagesRegister
                                };