/*
 * Define Cache for all kinds of states
*/
import { InMemoryCache, makeVar } from '@apollo/client';
import { AppState } from '../models/localType';
import { APP_KEY } from '../utils/constant';

export const cache: InMemoryCache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                appState: {
                    read(){
                        return appStateVar();
                    }
                }
            }
        }
    }
});

const currentState: AppState = {
    ...JSON.parse(localStorage.getItem(APP_KEY) || '{}'),
    isSignedUp: function(){ return !!this.userId && !! this.orgId}
} as AppState;

export const appStateVar = makeVar<AppState>(
    currentState
);


