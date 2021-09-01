import React from "react";
import './LeftBar.scss';
import { useAppDispatch, useAppSelector } from '../../app/state/store';
import { selectLeftBarOpen } from "./leftBarSlice";
import { getEmail, signOut } from "../../useToken";
import { useHistory } from "react-router-dom";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getAllCompaniesByUserRequested, selectCompaniesByUser } from "../company/companySlice";


const leftBarOptions = [
    { option: 'My Account', isOpen: false, childrenOptions: [{ option: 'Personal settings' }, { option: 'Sign out' }] },
    { option: 'My Companies', isOpen: false, childrenOptions: [{ option: 'Add new company' }] },
    { option: 'My Events', isOpen: false, childrenOptions: [{ option: 'Add new event' }] },
];

export const LeftBar = () => {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const [rerender, setRerender] = React.useState<boolean>(false);
    const companiesByUser = useAppSelector(selectCompaniesByUser);
    const isLeftBarOpen = useAppSelector(selectLeftBarOpen);

    React.useEffect(() => {
        let param = new URLSearchParams();
        param.append("email", getEmail() ?? "");
        dispatch(getAllCompaniesByUserRequested(param));
    }, [isLeftBarOpen]);

    const onClick = (name: string) => {
        leftBarOptions.forEach((option) => {
            if (option.option == name) {
                option.isOpen = !option.isOpen;
            };
            setRerender(!rerender);
        });
    }

    const onClickChild = (childOption: string) => {
        switch (childOption) {
            case 'Personal settings':
                history.push("/personalsettings");
                break;
            case 'Sign out':
                signOut();
                history.push("/");
                break;
            case 'Add new company':
                history.push("/company/new");
                break;
            case 'Add new event':
                history.push("/event/new");
                break;
        }
    }

    return (
        <div className={isLeftBarOpen ? "leftBar" : "leftBarClose"}>
            <div className="blockContent">
                {leftBarOptions.map((option) =>
                    <div className="mainBlockContent" onClick={() => onClick(option.option)}>
                        <div className="mainBlock">
                            {option.isOpen ? <ExpandLessIcon className="arrow" /> : <ExpandMoreIcon className="arrow" />}
                            {option.option}
                        </div>
                        {option.childrenOptions.map((childrenOption) =>
                            <div className={option.isOpen ? "childrenBlockContent" : "childrenBlockContentHidden"} onClick={() => onClickChild(childrenOption.option)}>
                                {childrenOption.option}
                            </div>
                        )}
                        {option.option == "My Companies" && companiesByUser && companiesByUser.map((company) =>
                            <div className={option.isOpen ? "childrenBlockContent" : "childrenBlockContentHidden"} onClick={() => history.push(`company/${company.id}`)}>
                                {company.name}
                            </div>)}
                    </div>
                )}
            </div>
        </div>
    );
}
