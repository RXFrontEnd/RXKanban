/**
 * Application state: to show interfaces logically.
 */
export type AppState = {
    isSignedUp: () => boolean;
    userId: string;
    userName: string;
    email: string;
    orgId: string;
    orgName: string;
    currentBoardId: string;
    currentBoardName: string;
}

export type LocalQueries = {
    appState: AppState;
}



