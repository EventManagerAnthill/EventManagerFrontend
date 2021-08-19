import { SignInState } from "../../features/signIn/signInSlice"
import { RouterState } from "../../features/routerSlice"

export interface ApplicationState {
    signInState: SignInState;
    routerState: RouterState;
}