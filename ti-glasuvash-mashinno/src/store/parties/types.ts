export interface Party {
    id: number;
    name: string;
    displayName: string;
}

export interface Preference {
    id: number;
    party?: Party|null;
}