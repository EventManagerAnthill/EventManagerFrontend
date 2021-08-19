import React from 'react';
import {
    Avatar,
    Box,
    Container,
    Grid,
    makeStyles,
    TextField,
    Typography,
    Button,
    CssBaseline
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { Link } from 'react-router-dom';
import { Copyright } from '../../components/Copyright';
import { useAppDispatch, useAppSelector } from '../../app/state/store';
import { SignInModel } from './signInModel';
import { selectSignInIsLoading, selectSignInModel, signInRequested } from './signInSlice';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export const SignIn = () => {
    const classes = useStyles();
    const isLoading = useAppSelector(selectSignInIsLoading);
    const signInModel = useAppSelector(selectSignInModel);
    const dispatch = useAppDispatch();
    const [state, setState] = React.useState<SignInModel>(signInModel);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(signInRequested(state));
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} onSubmit={e => handleSubmit(e)}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        type="email"
                        autoFocus
                        onChange={(e) => setState({ ...state, email: e.currentTarget.value })}
                        defaultValue={signInModel.email}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => setState({ ...state, password: e.currentTarget.value })}
                        defaultValue={signInModel.password}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={isLoading}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link to="/identify">
                                {"Forgot password?"}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/signup">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container >
    );
}

