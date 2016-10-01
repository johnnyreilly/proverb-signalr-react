import { Dispatcher } from "flux";
import FluxStore from "./FluxStore";
import { SageActionTypes } from "../actions/sageActions";
import { Action } from "../domain/action";
import { Sage } from "../domain/dtos/sage";
import AppDispatcher from "../AppDispatcher";

export interface SageState {
  sages: Map<number, Sage>;
  isInitialised: boolean;
}

class SageStore extends FluxStore<SageState> {
  constructor(dispatcher: Dispatcher<Action>) {
    super(dispatcher, () => ({
      sages: undefined as Map<number, Sage>,
      isInitialised: false
    }));
  }

  getState() {
    return this._state;
  }

  _updateState(updatedSages: Map<number, Sage>) {
    this._state = Object.assign({}, this._state, { sages: updatedSages, isInitialised: true });
    this.emitChange();
  }

  _onDispatch(action: Action) {
    switch (action.type) {
      case SageActionTypes.LOADED_SAGES:
        const sages = action.payload as Sage[];
        this._updateState(new Map([...sages.map(sage => [sage.id, sage] as [number, Sage])]));
        break;
      case SageActionTypes.LOADED_SAGE: // Not actually used at present.... remove?
        const sage = action.payload as Sage;
        this._updateState(this._state.sages ? this._state.sages.set(sage.id, sage) : new Map([[sage.id, sage]]));
        break;
      case SageActionTypes.REMOVED_SAGE:
        const sageId = action.payload as number;
        this._state.sages.delete(sageId);
        this._updateState(this._state.sages);
        break;
    }
  }
}

const greeterStoreInstance = new SageStore(AppDispatcher);
export default greeterStoreInstance;
