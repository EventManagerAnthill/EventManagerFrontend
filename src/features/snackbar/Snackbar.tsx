import './Snackbar.scss';
import { Snackbar } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { useAppDispatch, useAppSelector } from "../../app/state/store";
import { selectSnackbar, snackbarClose } from "./snackbarSlice";

export const SnackbarComponent = () => {
    const dispatch = useAppDispatch();
    const snackbar = useAppSelector(selectSnackbar);
    
    const onClose = () => {
        dispatch(snackbarClose())
    }

    return (
       <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={onClose}>
         <Alert severity={snackbar.severity} elevation={6} variant="filled" onClose={onClose}>
               {snackbar.message}
         </Alert>
       </Snackbar>
    )
   }