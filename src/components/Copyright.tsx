import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from 'react-router-dom';

export const Copyright = () => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link to="/">
          Event Manager
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }