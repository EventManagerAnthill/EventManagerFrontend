import React from "react";
import { UserPassword } from "./userPassword/UserPassword";
import { UserProfile } from "./userProfile/UserProfile";
import './User.scss';

const optionsForUser = [{ label: "Profile", isActive: true }, { label: "Password", isActive: false}];

export const User = () => {
    const [rerender, setRerender] = React.useState<boolean>(false);

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