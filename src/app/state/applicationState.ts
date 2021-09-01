import { CompanyState } from "../../features/company/companySlice"
import { IdentifyState } from "../../features/identify/identifySlice"
import { LeftBarState } from "../../features/leftBar/leftBarSlice"
import { ResetPasswordState } from "../../features/resetPassword/resetPasswordSlice"
import { RouterState } from "../../features/routerSlice"
import { SignInState } from "../../features/signIn/signInSlice"
import { SignUpState } from "../../features/signUp/signUpSlice"
import { UserState } from "../../features/user/userSlice"


export interface ApplicationState {
    routerState: RouterState;
    signInState: SignInState;
    signUpState: SignUpState;
    identifyState: IdentifyState;
    resetPasswordState: ResetPasswordState;
    leftBarState: LeftBarState;
    userState: UserState;
    companyState: CompanyState;
}