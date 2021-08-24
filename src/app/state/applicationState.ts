import { RouterState } from "../../features/routerSlice"
import { SignInState } from "../../features/signIn/signInSlice"
import { SignUpState } from "../../features/signUp/signUpSlice"


export interface ApplicationState {
    routerState: RouterState;
    signInState: SignInState;
    signUpState: SignUpState;
}