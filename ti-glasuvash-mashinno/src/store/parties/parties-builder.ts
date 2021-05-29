import { Party } from './types';
import * as partiesJSON from '@/data/parties-data.json';

export class PartiesBuilder {
    makeParties(): Array<Party> {
        const parties: Array<Party> = partiesJSON.parties;

        return parties;
    }
}