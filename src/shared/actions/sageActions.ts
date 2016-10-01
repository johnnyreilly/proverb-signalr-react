import AppDispatcher from "../AppDispatcher";
import { Sage } from "../domain/dtos/sage";
import sageHub from "../hubs/sageHub";
import { ValidationMessages } from "../domain/saveResult";

export const SageActionTypes = {
  LOADING_SAGES: "SageActionTypes.LOADING_SAGES",
  LOADED_SAGES: "SageActionTypes.LOADED_SAGES",
  LOAD_SAGE: "SageActionTypes.LOAD_SAGE",
  LOADED_SAGE: "SageActionTypes.LOADED_SAGE",
  REMOVE_SAGE: "SageActionTypes.REMOVE_SAGE",
  REMOVED_SAGE: "SageActionTypes.REMOVED_SAGE",
  SAVE_SAGE: "SageActionTypes.SAVE_SAGE",
  SAVED_SAGE: "SageActionTypes.SAVED_SAGE",
  SAVE_SAGE_FAILED: "SageActionTypes.SAVE_SAGE_FAILED"
};

export function loadSages() {
  AppDispatcher.dispatch({ type: SageActionTypes.LOADING_SAGES });
  sageHub.getAll();
}

export function loadedSages(sages: Sage[]) {
  AppDispatcher.dispatch({
    type: SageActionTypes.LOADED_SAGES,
    payload: sages
  });
}

export function loadSage(id: number) {
  AppDispatcher.dispatch({ type: SageActionTypes.LOAD_SAGE });
  sageHub.getById(id);
}

export function loadedSage(sage: Sage) {
  AppDispatcher.dispatch({
    type: SageActionTypes.LOADED_SAGE,
    payload: sage
  });
}

export function removeSage(id: number) {
  AppDispatcher.dispatch({ type: SageActionTypes.REMOVE_SAGE });
  sageHub.remove(id);
}

export function removedSage(sageId: number) {
  AppDispatcher.dispatch({
    type: SageActionTypes.REMOVED_SAGE,
    payload: sageId
  });
}

export function saveSage(sage: Sage) {
  AppDispatcher.dispatch({
    type: SageActionTypes.SAVE_SAGE,
    payload: sage
  });
}

export function savedSage(savedId: number) {
  AppDispatcher.dispatch({
    type: SageActionTypes.SAVED_SAGE,
    payload: savedId
  });
}

export function saveFailed(validationMessages: ValidationMessages) {
  AppDispatcher.dispatch({
    type: SageActionTypes.SAVE_SAGE_FAILED,
    payload: validationMessages
  });
}
