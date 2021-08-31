import React from "react";
import { UserPassword } from "./userPassword/UserPassword";
import { UserProfile } from "./userProfile/UserProfile";
import './User.scss';
import { getEmail } from "../../../useToken";
import { useAppDispatch } from "../../../app/state/store";
import { getUserRequested } from "../../../features/user/userSlice";

const optionsForUser = [{ label: "Profile", isActive: true }, { label: "Password", isActive: false}];

export const User = () => {
    const [rerender, setRerender] = React.useState<boolean>(false);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        let param = new URLSearchParams();
        param.append("email", getEmail() ?? "");
        dispatch(getUserRequested(param));
    },[]);

    const onClick = (label: string) => {
        optionsForUser.forEach((option) => {
            option.label == label ? option.isActive = true : option.isActive = false;
        });
        setRerender(!rerender);
    };

    React.useEffect(() => {
    }, [rerender]);

    return (
        <div className="user">
            <div className="userTop">
                <div className="userTopBlock">
                    {optionsForUser.map((option) =>
                        <div className={option.isActive ? "tabUser" : "tabUser tabUserNotActive"} onClick={() => onClick(option.label)}>
                            <span>{option.label}</span>
                        </div>
                    )}
                </div>
            </div>
            {optionsForUser.map((option) =>
                <div>
                    {option.isActive && option.label == "Profile" && <UserProfile />}
                    {option.isActive && option.label == "Password" && <UserPassword />}
                </div>
            )}
        </div>
    );
}