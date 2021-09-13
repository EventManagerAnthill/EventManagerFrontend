import React from "react";
import './MyCompanies.scss';
import { useAppDispatch, useAppSelector } from "../../../../../app/state/store";
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';
import { CompanyForList } from "../../companyForList/CompanyForList";
import { selectUserFormId } from "../../../../../features/user/userSlice";
import { getAllCompaniesByOwnerRequested, selectCompaniesByOwner, selectCompanyIsLoading } from "../../../../../features/company/companySlice";
import { useHistory } from "react-router-dom";
import { routerReset, selectRouterRedirectTo } from "../../../../../features/routerSlice";
import { Spinner } from "../../../../spinner/Spinner";

export const MyCompanies = () => {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const companiesByOwner = useAppSelector(selectCompaniesByOwner);
    const userId = useAppSelector(selectUserFormId);
    const redirectTo = useAppSelector(selectRouterRedirectTo);
    const companyIsLoading = useAppSelector(selectCompanyIsLoading);
    const [companyName, setCompanyName] = React.useState<string>("");

    React.useEffect(() => {
        let param = new URLSearchParams();
        param.append("userId", String(userId));
        param.append("page", String(companiesByOwner?.paging?.currentPage ?? "1"));
        param.append("pagesize", "10");
        if (companyName !== "") {
            param.append("companyName", companyName);
        }
        dispatch(getAllCompaniesByOwnerRequested(param));
        if (redirectTo) {
            dispatch(routerReset());
        }
    }, [userId, redirectTo]);

    React.useEffect(() => {
        if (companiesByOwner && companiesByOwner.paging) {
            if (companiesByOwner.paging.currentPage > companiesByOwner.paging.totalPages) {
                let param = new URLSearchParams();
                param.append("userId", String(userId));
                param.append("page", "1");
                param.append("pagesize", "10");
                if (companyName !== "") {
                    param.append("companyName", companyName);
                }
                dispatch(getAllCompaniesByOwnerRequested(param));
            }
        }
    });

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
        <>
            {companyIsLoading && <Spinner />}
            <div className="myCompanies">
                <div className="myCompaniesSearch">
                    <input className="input" placeholder="Company name" onChange={e => setCompanyName(e.currentTarget.value)} />
                </div>
                <div className="myCompaniesMain">
                    {companiesByOwner && companiesByOwner.paging && companiesByOwner.paging.totalItems > 0 ?
                        companiesByOwner && companiesByOwner.companies && companiesByOwner.companies.map((company) =>
                            <div className="companyMain">
                                <CompanyForList id={company.id} name={company.name} fotoUrl={company.fotoUrl!} userRole={company.userRole} />
                            </div>
                        ) : companyName == "" ?
                            <span className="companyMainText">Here you will see the list of your companies. Create your first company!</span> :
                            <span className="companyMainText">No results were found for your search</span>
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
        </>
    );
}