import React from "react";
import './AllCompanies.scss';
import { useAppDispatch, useAppSelector } from "../../../../../app/state/store";
import AddIcon from '@material-ui/icons/Add';
import InfoIcon from '@material-ui/icons/Info';
import { CompanyForList } from "../../companyForList/CompanyForList";
import { selectUserFormId } from "../../../../../features/user/userSlice";
import { getAllCompaniesByUserRequested, selectCompaniesByUser, selectCompanyIsLoading } from "../../../../../features/company/companySlice";
import { useHistory } from "react-router-dom";
import { routerReset, selectRouterRedirectTo } from "../../../../../features/routerSlice";
import { Spinner } from "../../../../spinner/Spinner";

export const AllCompanies = () => {
    const dispatch = useAppDispatch();
    const history = useHistory();
    const companiesByUser = useAppSelector(selectCompaniesByUser);
    const userId = useAppSelector(selectUserFormId);
    const redirectTo = useAppSelector(selectRouterRedirectTo);
    const companyIsLoading = useAppSelector(selectCompanyIsLoading);
    const [companyName, setCompanyName] = React.useState<string>("");

    React.useEffect(() => {
        let param = new URLSearchParams();
        param.append("userId", String(userId));
        param.append("page", String(companiesByUser?.paging?.currentPage ?? "1"));
        param.append("pagesize", "10");
        if (companyName !== "") {
            param.append("companyName", companyName);
        }
        dispatch(getAllCompaniesByUserRequested(param));
        if (redirectTo) {
            dispatch(routerReset());
        }
    }, [userId, redirectTo, companyName]);

    React.useEffect(() => {
        if (companiesByUser && companiesByUser.paging) {
            if (companiesByUser.paging.currentPage > companiesByUser.paging.totalPages) {
                let param = new URLSearchParams();
                param.append("userId", String(userId));
                param.append("page", "1");
                param.append("pagesize", "10");
                if (companyName !== "") {
                    param.append("companyName", companyName);
                }
                dispatch(getAllCompaniesByUserRequested(param));
            }
        }
    }, [companiesByUser?.paging?.totalPages]);

    const onClickPage = (numberPage: number) => {
        let param = new URLSearchParams();
        param.append("userId", String(userId));
        param.append("page", String(numberPage));
        param.append("pagesize", "10");
        dispatch(getAllCompaniesByUserRequested(param));
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
            <div className="allCompanies">
                <div className="allCompaniesSearch">
                    <input className="input" placeholder="Company name" onChange={e => setCompanyName(e.currentTarget.value)} />
                </div>
                <div className="allCompaniesMain">
                    {companiesByUser && companiesByUser.paging && (companiesByUser.paging.totalItems > 0) ?
                        companiesByUser && companiesByUser.companies && companiesByUser.companies.map((company) =>
                            <div className="companyMain">
                                <CompanyForList id={company.id} name={company.name} fotoUrl={company.fotoUrl!} userRole={company.userRole} />
                            </div>
                        ) : companyName == "" ?
                            <span className="companyMainText">Here you will see the list of your companies. Create your first company!</span> :
                            <span className="companyMainText">No results were found for your search</span>
                    }
                </div>
                <div className="allCompaniesFooter">
                    <div className="blockTotal">
                        <span className="total">{`Total objects: ${(companiesByUser && companiesByUser.paging && companiesByUser.paging.totalItems) ?? "0"}`}</span>
                    </div>
                    <div className="blockButtons">
                        <div className="blockPagesButtons">
                            {companiesByUser && companiesByUser.paging && getPages(companiesByUser.paging.totalPages).map((pageNumber) =>
                                companiesByUser.paging!.currentPage == pageNumber ?
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