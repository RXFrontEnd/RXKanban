export type AppState = {
    isSignedUp: () => boolean;
    userId: string;
    userName: string;
    orgId: string;
    orgName: string;
}

export type LocalQueries = {
    appState: AppState;
}