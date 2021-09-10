import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import './Spinner.scss';

export const Spinner = () => {
    return (
        <div className="spinner">
            <div className="spinner-svg">
                <CircularProgress />
            </div>
        </div>
    );
}