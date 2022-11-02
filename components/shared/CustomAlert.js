import { Snackbar, Alert, Slide } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resetAlert } from "redux/alertSlice";

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}
const CustomAlert = () => {
    const { alert } = useSelector((state) => state.alert);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(resetAlert());
    };
    return (
        <Snackbar
            open={alert.showAlert}
            autoHideDuration={3500}
            onClose={handleClose}
            TransitionComponent={SlideTransition}
            sx={{ zIndex: 3000 }}
        >
            <Alert
                onClose={handleClose}
                severity={alert.severity}
                sx={{ width: "100%" }}
                variant="filled"
            >
                {alert.message}
            </Alert>
        </Snackbar>
    );
};

export default CustomAlert;
