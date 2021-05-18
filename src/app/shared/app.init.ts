import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService) {
    return () =>
      keycloak.init({
        config: {
          url: 'http://meal-optimizer-iam:8080/auth',
          realm: 'mealplanner',
          clientId: 'meal-planner-app-client'
        },
        loadUserProfileAtStartUp : true
      });
  }