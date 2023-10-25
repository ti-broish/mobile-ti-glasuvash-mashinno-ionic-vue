import { Candidates } from "./candidates/types"

export interface VoteOptionData {
    id: number
    name: string
    data?: Candidates | null
    filled: boolean
}