import React from "react";
import './LeftBar.scss';
import { useAppSelector } from '../../app/state/store';
import { selectLeftBarOpen } from "./leftBarSlice";
import { signOut } from "../../useToken";
import { useHistory } from "react-router-dom";


const leftBarOptions = [
    { option: 'My Account', isOpen: false, childrenOptions: [{ option: 'Personal settings' }, { option: 'Sign out' }] },
];

export const LeftBar = () => {
    const history = useHistory();
    const [rerender, setRerender] = React.useState<boolean>(false);
    const isLeftBarOpen = useAppSelector(selectLeftBarOpen);

    const onClick = (name: string) => {
        leftBarOptions.forEach((option) => {
            if (option.option == name) {
                option.isOpen = !option.isOpen;
            };
            setRerender(!rerender);
        });
    }

    React.useEffect(() => {
    }, [rerender]);

    const onClickChild = (childOption: string) => {
        switch (childOption) {
            case 'Personal settings':
                history.push("/personalsettings");
                break;
            case 'Sign out':
                signOut();
                history.push("/");
                break;
        }
    }

    return (
        <div className={isLeftBarOpen ? "leftBar" : "leftBarClose"}>
            <div className="blockContent">
                {leftBarOptions.map((option) =>
                    <div className="mainBlockContent" onClick={() => onClick(option.option)}>
                        <div className={option.isOpen ? "arrow down" : "arrow up"}></div>
                        {option.option}
                        {option.childrenOptions.map((childrenOption) =>
                            <div className={option.isOpen ? "childrenBlockContent" : "childrenBlockContentHidden"} onClick={() => onClickChild(childrenOption.option)}>
                                {childrenOption.option}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
