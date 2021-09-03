import React from "react";
import { useAppSelector } from "../../../../app/state/store";
import { selectCompaniesByUser } from "../../../../features/company/companySlice";
import './CompanyNew.scss';

export const CompanyList = () => {
    const companiesByUser = useAppSelector(selectCompaniesByUser);

    return (
        <div>
            {companiesByUser && companiesByUser.map((company) =>
                <div className="companyByUser">

                </div>
            )}
        </div>
    )
}