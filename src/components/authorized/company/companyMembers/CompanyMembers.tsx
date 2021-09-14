import React from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/state/store";
import { getLinkToJoinCompanyRequested, inviteUsersRequested, selectCompanylinkToJoin } from "../../../../features/company/companySlice";
import { selectLeftBarOpen } from "../../../../features/leftBar/leftBarSlice";
import { routerReset, selectRouterRedirectTo } from "../../../../features/routerSlice";
import { getCompanyUsersRequested, selectCompanyUsers } from "../../../../features/user/userSlice";
import { UserForCompanyMembers } from "../../user/userForCompanyMembers/UserForCompanyMembers";
import './CompanyMembers.scss';

interface CompanyMembersSearch {
    firstName: string;
    lastName: string;
}

export const CompanyMembers = () => {
    let { companyId } = useParams<{ companyId: string | undefined }>();
    const dispatch = useAppDispatch();
    const isLeftBarOpen = useAppSelector(selectLeftBarOpen);
    const linkToJoinCompany = useAppSelector(selectCompanylinkToJoin);
    const inputEmail = React.useRef<HTMLInputElement>(null);
    const [email, setEmail] = React.useState<string>("");
    const [isValidatedEmail, setIsValidatedEmail] = React.useState<boolean>(true);
    const inputLink = React.useRef<HTMLInputElement>(null);
    const companyUsers = useAppSelector(selectCompanyUsers);
    const redirectTo = useAppSelector(selectRouterRedirectTo);
    const [search, setSearch] = React.useState<CompanyMembersSearch>({ firstName: "", lastName: "" });


    React.useEffect(() => {
        if (companyId) {
            let param = new URLSearchParams();
            param.append("Id", companyId);
            dispatch(getLinkToJoinCompanyRequested(param));
            getCompanyUser(companyId);
        }
    }, [companyId]);

    React.useEffect(() => {
        if (companyId) {
            getCompanyUser(companyId);
            if (redirectTo) {
                dispatch(routerReset());
            }
        }
    }, [redirectTo, search.firstName, search.lastName]);

    React.useEffect(() => {
        if (companyUsers && companyUsers.paging) {
            if (companyUsers.paging.currentPage > companyUsers.paging.totalPages) {
                let param = new URLSearchParams();
                param.append("CompanyId", String(companyId));
                param.append("page", "1");;
                param.append("pagesize", "10");
                if (search.firstName !== "") {
                    param.append("firstName", search.firstName);
                }
                if (search.lastName !== "") {
                    param.append("lastName", search.lastName);
                }
                dispatch(getCompanyUsersRequested(param));
            }
        }
    }, [companyUsers?.paging?.totalPages]);

    const getCompanyUser = (companyId: string) => {
        let param = new URLSearchParams();
        param.append("CompanyId", companyId);
        param.append("page", String(companyUsers?.paging?.currentPage ?? "1"));;
        param.append("pagesize", "10");
        if (search.firstName !== "") {
            param.append("firstName", search.firstName);
        }
        if (search.lastName !== "") {
            param.append("lastName", search.lastName);
        }
        dispatch(getCompanyUsersRequested(param));
    }

    const onClickSendInvitations = () => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email)) {
            if (companyId) {
                dispatch(inviteUsersRequested({ companyId: +(companyId), email: [email] }));
            }
            setEmail("");
            setIsValidatedEmail(true);
            if (null !== inputEmail.current) {
                inputEmail.current.value = "";
            }
        } else
            setIsValidatedEmail(false);
    }

    const onClickCopyLink = () => {
        if (null !== inputLink.current) {
            inputLink.current.select();
            document.execCommand("copy");
        }
    };

    const onClickPage = (numberPage: number) => {
        let param = new URLSearchParams();
        param.append("CompanyId", String(companyId));
        param.append("page", String(numberPage));
        param.append("pagesize", "10");
        if (search.firstName !== "") {
            param.append("firstName", search.firstName);
        }
        if (search.lastName !== "") {
            param.append("lastName", search.lastName);
        }
        dispatch(getCompanyUsersRequested(param));
    };

    const getPages = (totalPages: number) => {
        let content = [];
        let i: number = 1;
        while (i <= totalPages) {
            content.push(i)
            i++;
        }
        return content;
    };

    return (
        <div className={isLeftBarOpen ? "companyMembersWithLeftBar" : "companyMembers"}>
            <div className="companyMembersHeader">
                <div className="headerInputsBlock">
                    <div className="headerInputAndButtonBlock">
                        <input ref={inputEmail} type="email" className={isValidatedEmail ? "headerInput" : "headerInput headerInputError"} onChange={(e) => setEmail(e.target.value)} />
                        <button className="headerButton" onClick={() => onClickSendInvitations()}>Send invitations</button>
                    </div>
                    <div className="headerInputAndButtonBlock">
                        <div className="headerInputAndSpanBlock">
                            <input className="headerInput" value={linkToJoinCompany} readOnly={true} ref={inputLink} />
                            <span className="headerSpan">Copy this link and share in your messenger</span>
                        </div>
                        <button className="headerButton" onClick={() => onClickCopyLink()}>Copy</button>
                    </div>
                </div>
            </div>
            <hr className="companyMemberHR"/>
            <div className="companyMembersSearch">
                <div className="searchInput">
                    <input className="input" placeholder="Last name" onChange={e => setSearch({ ...search, lastName: e.currentTarget.value })} />
                </div>
                <div className="searchInput">
                    <input className="input" placeholder="First name" onChange={e => setSearch({ ...search, firstName: e.currentTarget.value })} />
                </div>
            </div>
            <div className="companyMembersMain">
                {companyUsers && companyUsers.paging && (companyUsers.paging.totalItems > 0) ?
                    companyUsers && companyUsers.users && companyUsers.users.map((user) =>
                        <div className="membersBlock">
                            <UserForCompanyMembers id={user.id} firstName={user.firstName} lastName={user.lastName} fotoUrl={user.fotoUrl!} />
                        </div>) :
                    <span className="companyMembersMainText">No results were found for your search</span>
                }
            </div>
            <div className="companyMembersFooter">
                <div className="blockTotal">
                    <span className="total">{`Total objects: ${(companyUsers && companyUsers.paging && companyUsers.paging.totalItems) ?? "0"}`}</span>
                </div>
                <div className="blockButtons">
                    <div className="blockPagesButtons">
                        {companyUsers && companyUsers.paging && getPages(companyUsers.paging.totalPages).map((pageNumber) =>
                            companyUsers.paging!.currentPage == pageNumber ?
                                <div className="pageButton">{pageNumber}</div> :
                                <div className="pageButton pageButtonNotActive" onClick={() => onClickPage(pageNumber)}>{pageNumber}</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}