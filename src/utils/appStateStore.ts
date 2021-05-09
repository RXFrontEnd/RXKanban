import { appStateVar } from "../apollo/cache";
import { AppState, AppStateInput } from "../models/localType";
import { APP_KEY } from "./constant";



export const updateAppState = (state: AppStateInput) => {
    const appState = {...appStateVar(), ...state};
    appStateVar(appState);
    localStorage.setItem(APP_KEY, JSON.stringify(appState));
}

export const clearAppState = () => {
    appStateVar({
        isSignedUp: function(){ return !!this.userId && !! this.orgId}
    } as AppState);
    localStorage.removeItem(APP_KEY);
}

