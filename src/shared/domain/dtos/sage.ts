import { Saying } from "./Saying";

export interface Sage {
    id: number;
    name: string;
    username: string;
    email: string;
    dateOfBirth: Date;
    sayings?: Saying[];
}
