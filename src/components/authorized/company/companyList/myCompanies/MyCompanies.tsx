import React from "react";
import './MyCompanies.scss';
import { useAppDispatch, useAppSelector } from "../../../../../app/state/store";
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';
import { CompanyForList } from "../../companyForList/CompanyForList";
import { selectUserId } from "../../../../../features/user/userSlice";
import { getAllCompaniesByOwnerRequested, selectCompaniesByOwner } from "../../../../../features/company/companySlice";
import { useHistory } from "react-router-dom";
import { selectRouterRedirectTo } from "../../../../../features/routerSlice";

export const MyCompanies = () => {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const companiesByOwner = useAppSelector(selectCompaniesByOwner);
    const userId = useAppSelector(selectUserId);

    React.useEffect(() => {
        let param = new URLSearchParams();
        param.append("userId", String(userId));
        param.append("page", String(companiesByOwner?.paging?.currentPage ?? "1"));
        param.append("pagesize", "10");
        dispatch(getAllCompaniesByOwnerRequested(param));
    }, [userId]);

    const onClickPage = (numberPage: number) => {
        let param = new URLSearchParams();
        param.append("userId", String(userId));
        param.append("page", String(numberPage));
        param.append("pagesize", "10");
        dispatch(getAllCompaniesByOwnerRequested(param));
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
        <div className="myCompanies">
            <div className="myCompaniesMain">
                {companiesByOwner && companiesByOwner.paging && companiesByOwner.paging.totalItems > 0 ?
                    companiesByOwner && companiesByOwner.companies && companiesByOwner.companies.map((company) =>
                        <div className="companyMain">
                            <CompanyForList id={company.id} name={company.name} fotoUrl={company.fotoUrl!} userRole={company.userRole} />
                        </div>
                    ) :
                    <span className="companyMainText">Here you will see the list of your companies. Create your first company!</span>
                }
            </div>
            <div className="myCompaniesFooter">
                <div className="blockTotal">
                    <span className="total">{`Total objects: ${(companiesByOwner && companiesByOwner.paging && companiesByOwner.paging.totalItems) ?? "0"}`}</span>
                </div>
                <div className="blockButtons">
                    <div className="blockPagesButtons">
                        {companiesByOwner && companiesByOwner.paging && getPages(companiesByOwner.paging.totalPages).map((pageNumber) =>
                            companiesByOwner.paging!.currentPage == pageNumber ?
                                <div className="pageButton">{pageNumber}</div> :
                                <div className="pageButton pageButtonNotActive" onClick={() => onClickPage(pageNumber)}>{pageNumber}</div>
                        )}
                    </div>
                    <div>
                        <div className="blockAddCompanyButton" onClick={() => history.push("/company/new")}>
                            <div className="AddCompanyButton">
                                <AddIcon className="AddCompanyButtonLogo" />
                            </div>
                            <div className="blockAddCompanyButtonNotify">
                                <div className="blockNotify">
                                    <InfoIcon className="notifyIcon" />
                                    <span className="notifyText">Add company</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}