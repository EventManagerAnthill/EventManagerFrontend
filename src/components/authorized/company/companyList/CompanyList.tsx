import React from "react";
import { useAppSelector } from "../../../../app/state/store";
import { selectCompaniesByUser } from "../../../../features/company/companySlice";
import { AllCompanies } from "./allCompanies/AllCompanies";
import './CompanyList.scss';
import { MyCompanies } from "./myCompanies/MyCompanies";

type CompanyListTab = 'all companies' | 'my companies' | 'my invitations';

const optionsForUserCompanies = [
    { label: "All companies", isActive: true, type: 'all companies' as CompanyListTab },
    { label: "My companies", isActive: false, type: 'my companies' as CompanyListTab },
    { label: "My invitations", isActive: false, type: 'my invitations' as CompanyListTab }];

export const CompanyList = () => {
    const [currentTab, setCurrentTab] = React.useState<CompanyListTab>('all companies');

    const onClick = (optionType: string) => {
        optionsForUserCompanies.map((tab) => {
            if (tab.type == optionType) {
                tab.isActive = true;
                setCurrentTab(tab.type)
            } else
                tab.isActive = false;
        });
    };

    return (
        <div className="companyList">
            <div className="companyListTop">
                <div className="companyListTopBlock">
                    {optionsForUserCompanies.map((option) =>
                        <div className={option.isActive ? "tabcompanyList" : "tabcompanyList tabcompanyListNotActive"}
                            onClick={() => onClick(option.type)}
                        >
                            <span>{option.label}</span>
                        </div>
                    )}
                </div>
            </div>
            {optionsForUserCompanies.map((option) =>
                <div>
                    {option.isActive && option.label == "All companies" && <AllCompanies />}
                    {option.isActive && option.label == "My companies" && <MyCompanies />}
                </div>
            )}
        </div>
    )
}