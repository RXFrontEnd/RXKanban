/*
 * Define Cache for all kinds of states
*/
import { InMemoryCache, makeVar } from '@apollo/client';
import { AppState } from '../models/localType';

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

export const appStateVar = makeVar<AppState>(
    { 
        isSignedUp: function(){ return !!this.userId && !! this.orgId}
    } as AppState
);


