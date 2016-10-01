import { Dispatcher } from "flux";
import { Action } from "./domain/action";

const dispatcherInstance = new Dispatcher<Action>();

export default dispatcherInstance;
