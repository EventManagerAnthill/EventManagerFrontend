import React from "react";
import { Copyright } from "../../copyright/Copyright";
import './BaseInformation.scss';
import MessyDoodle from '../../../assets/images/MessyDoodle.png';

export const BaseInformation = () => {
    return (
        <div className="BaseInformation">
            <div className="BaseInformation-Div">
                <div>
                    <span className="BaseInformation-Span">Now you can organize events easier and better</span>
                </div>
                <div className="BaseInformation-DivImage">
                    <img className="BaseInformation-Image" src={MessyDoodle} />
                </div>
            </div>
            <div>
                <Copyright />
            </div>
        </div>
    );
}