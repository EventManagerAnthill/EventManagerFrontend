import React from "react";
import './LeftBar.scss';
import { useAppDispatch, useAppSelector } from '../../app/state/store';
import { selectLeftBarOpen } from "./leftBarSlice";
import { getEmail, signOut } from "../../useToken";
import { useHistory } from "react-router-dom";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getAllCompaniesByUserRequested, selectCompaniesByUser } from "../company/companySlice";
import { getAllEventsByUserRequested, selectEventsByUser } from "../event/eventSlicer";
import { selectRouterRedirectTo } from "../routerSlice";


const leftBarOptions = [
    { option: 'My Account', isOpen: false, childrenOptions: [{ option: 'Personal settings' }, { option: 'Sign out' }] },
    { option: 'My Companies', isOpen: false, childrenOptions: [{ option: 'List of my companies' }, { option: 'Add new company' }] },
    { option: 'My Events', isOpen: false, childrenOptions: [{ option: 'List of my events' }] },
];

export const LeftBar = () => {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const [rerender, setRerender] = React.useState<boolean>(false);
    const companiesByUser = useAppSelector(selectCompaniesByUser);
    const eventsByUser = useAppSelector(selectEventsByUser);
    const isLeftBarOpen = useAppSelector(selectLeftBarOpen);
    const redirectTo = useAppSelector(selectRouterRedirectTo);

    React.useEffect(() => {
        if (isLeftBarOpen == true) {
            let param = new URLSearchParams();
            param.append("email", getEmail() ?? "");
            dispatch(getAllCompaniesByUserRequested(param));
            dispatch(getAllEventsByUserRequested(param))
        }
    }, [isLeftBarOpen, redirectTo]);

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
            case 'List of my companies':
                history.push("/company/list");
                break;
            case 'Add new company':
                history.push("/company/new");
                break;
            case 'List of my events':
                history.push("/event/list");
                break;
        }
    }

    return (
        <div className={isLeftBarOpen ? "leftBar" : "leftBarClose"}>
            <div className="blockContent">
                {leftBarOptions.map((option) =>
                    <div className="mainBlockContent" >
                        <div className="mainBlock">
                            {option.isOpen ? <ExpandLessIcon className="arrow" /> : <ExpandMoreIcon className="arrow" />}
                            <div onClick={() => onClick(option.option)}>{option.option}</div>
                        </div>
                        {option.childrenOptions.map((childrenOption) =>
                            <div className={option.isOpen ? "childrenBlockContent" : "childrenBlockContentHidden"} onClick={() => onClickChild(childrenOption.option)}>
                                {childrenOption.option}
                            </div>
                        )}
                        {option.option == "My Companies" && companiesByUser && companiesByUser.map((company) =>
                            <div className={option.isOpen ? "childrenBlockContent" : "childrenBlockContentHidden"} onClick={() => history.push(`/company/${company.id}`)}>
                                {company.name}
                            </div>)}
                        {option.option == "My Events" && eventsByUser && eventsByUser.map((event) =>
                            <div className={option.isOpen ? "childrenBlockContent" : "childrenBlockContentHidden"} onClick={() => history.push(`/event/${event.id}`)}>
                                {event.name}
                            </div>)}
                    </div>
                )}
            </div>
        </div>
    );
}
