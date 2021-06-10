export interface Party {
    id: number;
    name: string;
}

export interface Preference {
    id: number;
    party?: Party|null;
}