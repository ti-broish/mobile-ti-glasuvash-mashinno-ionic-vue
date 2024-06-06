export enum PartyElectionType {
    NationalAssembly = 0, 
    EuropeanUnion
}

export interface Party {
    id: number;
    name: string; 
    electionType: PartyElectionType
}

export interface Preference {
    id: number;
    party?: Party|null;
}