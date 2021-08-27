import React from "react";
import './LeftBar.scss';
import { useAppSelector } from '../../app/state/store';
import { selectLeftBarOpen } from "./leftBarSlice";



export const LeftBar = () => {
    const leftBarOptions = [
        { option: 'My Account', childrenOptions: [{ option: 'Personal settings' }, { option: 'Sign out' }] },
    ];
    
    const isLeftBarOpen = useAppSelector(selectLeftBarOpen);

    const onClick = (option: string) => {
        switch (option) {
            case 'My Account':
                console.log(option);
                break;
        }
    }

    const onClickChild = (childOption: string) => {
        switch (childOption) {
            case 'Sign out':
                console.log(childOption);
                break;
            case 'Personal settings':
                console.log(childOption);
                break;
        }
    }

    return (
        <div className={isLeftBarOpen ? "leftBar" : "leftBarClose"}>
            <div className="blockContent">
                {leftBarOptions.map((option) =>
                    <div className="mainBlockContent" onClick={() => onClick(option.option)}>
                        {option.option}
                        {option.childrenOptions.map((childrenOption) =>
                            <div className="childrenBlockContent" onClick={() => onClickChild(childrenOption.option)}>
                                {childrenOption.option}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
