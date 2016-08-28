export interface ValidationMessages {
    hasErrors: boolean;
    errors: { [key: string]: string[] };
}

export interface SaveResult {
    isSaved: boolean;
    savedId?: number;
    validations?: ValidationMessages;
}
