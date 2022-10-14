import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    breakpoints: {
        values: {
          xs: 0,
          sm: 400,
          md: 600,
          xm: 960,
          lg: 1280,
          xl: 1920
        }
    },
    palette: {
        bg: {
            primary: '#F6F9FC',
            secondary: '#FFFFFF',
            space: '#0C0E30',
            spaceLight: '#0F3460',
            aliceBlue: '#F3F5F9',
            steal: '#0C2A4D',
            navy: '#3B5998',
            blue: '#4285F4',
            azureBlue: '#4E97FD',
            royalBlue: '#2756B6',
            silver: '#E8E8EE',
            green: '#E7F9ED',
            denim: '#00000033'
        },
        boxShadow: {
            nav: 'rgba(43, 52, 69, 0.1) 0px 4px 16px 0px',
            card: 'rgba(3, 0, 71, 0.09) 0px 1px 3px 0px',
            popup: 'rgba(43, 52, 69, 0.1) 0px 4px 16px 0px',
            modal: 'rgba(3, 0, 71, 0.09) 0px 8px 45px 0px',
            bottomNavigation: 'rgba(0, 0, 0, 0.1) 0px 1px 4px 3px'
        },
        text: {
            primary: '#2B3445',
            secondary: '#373F50',
            secondaryLight: '#373F5099',
            secondary2: '#4B566B',
            light: '#7D879C',
            aliceBlue: '#AEB4BE',
            silver: '#0C0E30',
            green: '#0B7724',
            fadedSilver: '#DAE1E7',
            white: '#FFFFFF'
        },
        border: {
            pink: 'rgba(210, 63, 87, 0.5)',
            black: 'rgba(0, 0, 0, 0.23)'
        },
        pink: {
            dark: '#D23F57',
            darkHover: '#E3364E',
            light: '#FCE9EC',
            lightHover: 'rgba(210, 63, 87, 0.04)'
        }
    },
    authPageContainer: {
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'bg.primary',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    authFormContainer: {
        width: '500px',
        height: 'auto',
        backgroundColor: 'bg.secondary',
        borderRadius: '8px',
        padding: '2rem 3rem',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    },
    authFormTitle: {
        color: 'text.primary',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '20px',
        lineHeight: '1.5',
        marginBottom: '8px'
    },
    authFormInfo: {
        fontSize: '12px',
        color: 'text.secondary',
        textAlign: 'center',
        fontWeight: 600,
        marginBottom: '36px'
    },
    authBtnStyle: {
        width: '100%',
        textTransform: 'capitalize',
        height: '44px',
        fontWeight: 600
    },
    authFormSocialLogo: {
        height: '20px', 
        width: '20px', 
        mr: 1
    },
    authFormOtherPageLinkText: {
        fontSize: '14px', 
        color: 'text.primary', 
        textAlign: 'center', 
        mt: 3
    },
    authFormLink: {
        marginLeft: '8px', 
        fontWeight: 600, 
        paddingBottom: '2px'
    },
    adminPageContainer: {
        width: '100%',
        height: '100vh',
        display: 'flex'
    },
    adminMainContent: {
        height: '100vh',
        overflow: 'auto',
        backgroundColor: 'bg.primary'
    },
    adminTableMainContainer: {
        height: 'auto',
        width: { xl: '1200px', xs: '90%' },
        margin: 'auto',
        padding: '32px 0px',
        marginTop: '60px'
    },
    adminTableContainer: {
        backgroundColor: 'bg.secondary',
        borderRadius: '8px',
        width: '100%',
        overflow: 'hidden'
    },
    adminTableCaption: {
        fontSize: '20px',
        marginBottom: '16px',
        fontWeight: 700,
        color: 'text.primary'
    },
    adminTableColumnHeading: {
        fontSize: '14px',
        fontWeight: 600,
        color: 'text.primary',
        borderBottom: 'none'
    },
    adminTableBodyFirstCell: { 
        display: 'flex',
        alignItems: 'center',
        minWidth: '300px'
    },
    adminTableCellText: {
        color: 'text.primary', 
        fontSize: '14px', 
        fontWeight: 400,
        minWidth: '100px'
    },
    adminTablePaginationContainer: {
        margin: '32px 0px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    adminTablePaginationCountText: {
        color: 'text.primary', 
        position: 'absolute', 
        right: '20px', 
        top: '0px',
        fontSize: '14px',
    },
    adminInput: {
        width: '100%',
        borderRadius: '8px',
        color: 'text.primary',
        fontSize: '14px',
        fontWeight: 600
    },
    userInput: {
        width: '100%',
        borderRadius: '4px',
        color: 'text.primary',
        fontSize: '14px',
        fontWeight: 400
    },
    adminSelectMenuItem:{
        color: 'text.primary',
        fontSize: '14px',
    },
    userSelectMenuItem: {
        color: 'text.primary',
        fontSize: '14px'
    },
    statusAndCategoryBtn: {
        fontSize: '13px', 
        padding: '4px 12px', 
        display: 'inline-block',
        borderRadius: '16px', 
        fontWeight: 600,
        lineHeight: 1.43,
        textTransform: 'capitalize'
    },
    actionBtn: {
        color: 'text.light',
        '&:hover': {
            color: 'bg.azureBlue'
        }
    },
    actionBtnIcon: {
        fontSize: '20px' 
    },
    adminTableImageContainer: {
        height: '40px',
        width: '40px', 
        borderRadius: '8px', 
        mr: 1.5, 
        border: '1px solid #E8E8EE',
        padding: '2px', 
    },
    adminSearchBoxContainer: {
        height: '44px',
        width: '340px'
    },
    "containedBtn": {
        textTransform: 'capitalize',
        fontWeight: 600,
        backgroundColor: 'bg.azureBlue',
        color: 'text.white',
        '&:hover': {
            backgroundColor: 'bg.royalBlue',
        }
    },
    outlinedBtn: {
        textTransform: 'capitalize',
        fontWeight: 600,
        // border: '1px solid #4E97FD',
        // color: 'bg.azureBlue',
        // '&:hover': {
        //     border: '2px solid #4E97FD'
        // }
    },
    "btnPx16": {
        paddingLeft: '16px',
        paddingRight: '16px',
        borderRadius: '8px',
        height: '44px'
    },
    btnPx16y4: {
        padding: '4px 16px'
    },
    "btnPx-20-Py-2": {
        padding: '2px 20px'
    },
    "btnPy5": {
        paddingTop: '5px',
        paddingBottom: '5px',
        width: '100%'
    },
    btnPy10: {
        width: '100%',
        borderRadius: '8px',
        paddingTop: '10px',
        paddingBottom: '10px'
    },
    typography: {
        fontFamily: [
        //   "Nunito",
          "Open Sans",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ].join(",")
    },
    components: {
        MuiInputLabel: {
            defaultProps: {
                sx: {
                    fontSize: "14px",
                    '&:focus': {
                        marginTop: '0px'
                    }
                }
            }
        },
        // MuiTextField: {
        //     styleOverrides: {
        //         root: {
        //             '& .MuiOutlinedInput-root': {
        //                 '&:hover fieldset': {
        //                     borderColor: '#D23F57'
        //                 },
        //                 '&.Mui-focused fieldset': {
        //                     borderColor: '#D23F57'
        //                 },
        //                 "&.Mui-error fieldset": {
        //                     borderColor: 'green'
        //                 },
        //                 "&.Mui-error-focused fieldset": {
        //                     borderColor: 'yellow'
        //                 },
        //                 "&.Mui-focused fieldlabel": {
        //                     color: 'green'
        //                 }
        //             }
        //         }
        //     }
        // }  
    }
});




export const darkTheme = createTheme({
    
});
