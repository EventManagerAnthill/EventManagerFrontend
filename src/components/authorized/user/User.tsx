import React from "react";
import { UserPassword } from "./userPassword/UserPassword";
import { UserProfile } from "./userProfile/UserProfile";
import './User.scss';
import { getEmail } from "../../../useToken";
import { useAppDispatch } from "../../../app/state/store";
import { getUserRequested } from "../../../features/user/userSlice";
import { useState } from "react";

type PersonalSettingTab = 'profile' | 'password';

const optionsForUser = [{ label: "Profile", isActive: true, type: 'profile' as PersonalSettingTab }, { label: "Password", isActive: false, type: 'password' as PersonalSettingTab }];

export const User = () => {
    const [currentTab, setCurrentTab] = useState<PersonalSettingTab>('profile');
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
        const currTab = optionsForUser.find(x => x.isActive)
        setCurrentTab(currTab?.type || 'profile');
    };

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