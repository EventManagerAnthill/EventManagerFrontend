import React from "react";
import { Link } from 'react-router-dom';
import './Copyright.scss';

export const Copyright = () => {
  return (
    <span className="Copyright">
      {'Copyright © '}
      <Link className="Copyright" to="/">
        Event Manager
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </span>
  );
}