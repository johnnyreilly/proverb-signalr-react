import { Sage } from "./Sage";

export interface Saying {
    id: number;
    sageId: number;
    sage?: Sage;
    text: string;
}

