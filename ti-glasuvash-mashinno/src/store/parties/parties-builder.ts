import { Party, PartyElectionType } from './types';
import * as partiesJSON from '@/data/parties-data.json';

export class PartiesBuilder {
    makeParties(electionType: PartyElectionType): Array<Party> {
        switch(electionType) {
            case PartyElectionType.EuropeanUnion: {
                const parties: Array<Party> = partiesJSON.partiesEU;

                return parties;
            }
            default: {
                const parties: Array<Party> = partiesJSON.parties;

                return parties;
            }
        }
    }
}