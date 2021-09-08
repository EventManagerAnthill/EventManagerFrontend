import { Color } from "@material-ui/lab/Alert";

export interface SnackbarModel {
    open: boolean;
    message: string;
    severity: Color;
}

export type SnackbarOpenModel = Pick<SnackbarModel, 'message' | 'severity'>