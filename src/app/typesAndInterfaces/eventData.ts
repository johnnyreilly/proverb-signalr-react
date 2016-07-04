export interface ControllerActivateSuccessData {
    controllerId: string;
    title: string;
}

export interface FailureData {
    controllerId: string;
    showToast: boolean;
    failureReason: any;
}

export interface WaiterStartData {
    controllerId: string;
    message: string;
}

export interface WaiterSuccessData {
    controllerId: string;
}
