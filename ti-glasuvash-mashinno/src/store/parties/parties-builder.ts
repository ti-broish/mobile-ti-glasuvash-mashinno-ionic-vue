import { Party } from './types';
import * as partiesJSON from '@/data/parties-data.json';

export class PartiesBuilder {
    makeParties(): Array<Party> {
        const parties: Array<Party> = [];
        const partiesLength = partiesJSON.parties.length

        for (let i = 0; i < partiesLength; i++) {
            const json = partiesJSON.parties[i];
            let party: Party

            if (i + 1 == partiesLength) {
                party = { id: json.id, name: json.name, displayName: json.name };
            } else {
                if (json.id < 10) {
                    party = { id: json.id, name: json.name, displayName: json.name + " 0" + json.id };
                } else {
                    party = { id: json.id, name: json.name, displayName: json.name + " " + json.id };
                }
            }

            parties.push(party);
        }

        return parties;
    }
}