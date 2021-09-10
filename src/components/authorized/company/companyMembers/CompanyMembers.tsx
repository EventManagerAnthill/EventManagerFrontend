import React from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../app/state/store";
import { getLinkToJoinCompanyRequested, inviteUsersRequested, selectCompanylinkToJoin } from "../../../../features/company/companySlice";
import { selectLeftBarOpen } from "../../../../features/leftBar/leftBarSlice";
import './CompanyMembers.scss';

export const CompanyMembers = () => {
    let { companyId } = useParams<{ companyId: string | undefined }>();
    const dispatch = useAppDispatch();
    const isLeftBarOpen = useAppSelector(selectLeftBarOpen);
    const linkToJoinCompany = useAppSelector(selectCompanylinkToJoin);
    const inputEmail = React.useRef<HTMLInputElement>(null);
    const [email, setEmail] = React.useState<string>("");
    const [isValidatedEmail, setIsValidatedEmail] = React.useState<boolean>(true);
    const inputLink = React.useRef<HTMLInputElement>(null);


    React.useEffect(() => {
        if (companyId) {
            let param = new URLSearchParams();
            param.append("Id", companyId);
            dispatch(getLinkToJoinCompanyRequested(param));
        }
    }, [companyId]);

    const onClickSendInvitations = () => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email)) {
            if (companyId) {
                dispatch(inviteUsersRequested({companyId: +(companyId), email: [email]}));
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

    return (
        <div className={isLeftBarOpen ? "companyMembersWithLeftBar" : "companyMembers"}>
            <div className="companyMembersHeader">
                <div className="headerInputsBlock">
                    <div className="headerInputAndButtonBlock">
                        <input ref={inputEmail} type="email" className={isValidatedEmail ? "headerInput" : "headerInput headerInputError"} onChange={(e) => setEmail(e.target.value)}/>
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
            <div className="companyMembersMain">

            </div>
            <div className="companyMembersFooter">
                <div className="blockTotal">
                    <span className="total">{`Total objects: 0`}</span>
                </div>
                <div className="blockButtons">
                    <div className="blockPagesButtons">
                        {/* {companiesByOwner && companiesByOwner.paging && getPages(companiesByOwner.paging.totalPages).map((pageNumber) =>
                                companiesByOwner.paging!.currentPage == pageNumber ?
                                    <div className="pageButton">{pageNumber}</div> :
                                    <div className="pageButton pageButtonNotActive" onClick={() => onClickPage(pageNumber)}>{pageNumber}</div>
                            )} */}
                    </div>
                </div>
            </div>
        </div>
    );
}