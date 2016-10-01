import AppDispatcher from "../AppDispatcher";
import { Saying } from "../domain/dtos/saying";
import { ValidationMessages } from "../domain/saveResult";

const SayingActionTypes = {
  LOAD_SAYINGS: "SayingActionTypes.LOAD_SAYINGS",
  LOADED_SAYINGS: "SayingActionTypes.LOADED_SAYINGS",
  LOAD_SAYING: "SayingActionTypes.LOAD_SAYING",
  LOADED_SAYING: "SayingActionTypes.LOADED_SAYING",
  REMOVED_SAYING: "SayingActionTypes.REMOVED_SAYING",
  SAVED_SAYING: "SayingActionTypes.SAVED_SAYING",
  SAVE_FAILED: "SayingActionTypes.SAVE_FAILED"
};

export function loadedSayings(sayings: Saying[]) {
  AppDispatcher.dispatch({
    type: SayingActionTypes.LOADED_SAYINGS,
    payload: sayings
  });
}

export function loadSaying(savedId: number) {
  AppDispatcher.dispatch({
    type: SayingActionTypes.LOAD_SAYING,
    payload: savedId
  });
  loadSaying(savedId);
}

export function loadedSaying(saying: Saying) {
  AppDispatcher.dispatch({
    type: SayingActionTypes.LOADED_SAYING,
    payload: saying
  });
}

export function removedSaying(sayingId: Saying) {
  AppDispatcher.dispatch({
    type: SayingActionTypes.REMOVED_SAYING
  });
}

export function savedSaying(savedId: number) {
  AppDispatcher.dispatch({
    type: SayingActionTypes.SAVED_SAYING,
    payload: savedId
  });
  loadSaying(savedId);
}

export function saveFailed(validationMessages: ValidationMessages) {
  AppDispatcher.dispatch({
    type: SayingActionTypes.SAVE_FAILED,
    payload: validationMessages
  });
}
