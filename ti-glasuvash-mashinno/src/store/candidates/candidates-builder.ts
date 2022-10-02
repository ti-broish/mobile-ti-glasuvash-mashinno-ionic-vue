import { Candidates } from './types';
import * as candidatesJSON from '@/data/candidates-data.json';

export class CandidatesBuilder {
    makeCandidates(): Array<Candidates> {
        const candidates: Array<Candidates> = candidatesJSON.candidates;

        return candidates;
    }
}