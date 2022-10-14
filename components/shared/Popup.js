import { useTheme, Popover } from "@mui/material";

const Popup = ({ children, popup, setPopup, anchorOrigin, transformOrigin }) => {

    const theme = useTheme();
    
    return (
        <Popover
            id={Boolean(popup) ? 'simple-popover' : undefined}
            open={Boolean(popup)}
            anchorEl={popup}
            onClose={()=> setPopup(null)}
            anchorOrigin={anchorOrigin ? anchorOrigin : { vertical: 'bottom', horizontal: 'left' }}
            transformOrigin={transformOrigin ? transformOrigin : { vertical: 'top', horizontal: 'center' }}
            PaperProps={{
                style: {
                    boxShadow: theme.palette.boxShadow.nav,
                    borderRadius: '8px',
                }
            }}
        > { children } </Popover>
    )
}

export default Popup;