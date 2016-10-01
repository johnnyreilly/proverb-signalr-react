import AppDispatcher from "../AppDispatcher";

const SignalRActionTypes = {
  PROXY_INVOKE_FAILED: "SignalRActionTypes.PROXY_INVOKE_FAILED"
};

export function signalRProxyInvokeFailed(error: any) {
  AppDispatcher.dispatch({
    type: SignalRActionTypes.PROXY_INVOKE_FAILED,
    payload: error
  });
}
