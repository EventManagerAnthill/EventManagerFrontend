import { Color } from "@material-ui/lab/Alert";

export interface SnackbarData {
    open?: boolean;
    message: string;
    severity: Color;
}