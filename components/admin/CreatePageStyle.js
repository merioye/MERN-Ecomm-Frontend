const style = {
    formContainer: {
        backgroundColor: "bg.secondary",
        borderRadius: "8px",
        width: "100%",
        padding: "48px",
        overflow: "hidden",
        color: "text.primary",
        fontSize: "14px",
        fontWeight: 400,
        lineHeight: 1.5,
    },
    inputContainer: {
        width: "48%",
    },
    dragContainer: {
        width: "100%",
        marginTop: "24px",
        backgroundColor: "bg.primary",
        padding: "32px 80px",
        minHeight: "200px",
        borderRadius: "10px",
        border: "1.5px dashed #E3E9EF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "relative",
        transitionProperty: "all",
        transitionDuration: "0.1s",
        marginBottom: "24px",
    },
    dragInstruction: {
        fontWeight: 600,
        fontSize: "14px",
        color: "text.light",
        marginBottom: "8px",
    },
    divider: {
        color: "text.fadedSilver",
    },
    selectFilesBtn: {
        color: "bg.azureBlue",
        fontWeight: 600,
        border: "1px solid rgba(78, 151, 253, 0.5)",
        borderRadius: "8px",
        textTransform: "capitalize",
        margin: "32px 0px",
        paddingRight: "32px",
        paddingLeft: "32px",
        position: "relative",
    },
    dragImageSizeText: {
        fontSize: "12px",
        color: "text.light",
    },
    fileInput: {
        height: "100%",
        width: "100%",
        position: "absolute",
        left: "0px",
        top: "0px",
        opacity: 0,
    },
    removeImageBtn: {
        position: "absolute",
        right: "-10px",
        top: "-32px",
    },
    removeImageIcon: {
        color: "text.primary",
        fontSize: "18px",
    },
    saveBtn: {
        backgroundColor: "bg.azureBlue",
        color: "text.white",
        borderRadius: "8px",
        fontWeight: 600,
        "&:hover": {
            backgroundColor: "bg.royalBlue",
        },
    },
};

export default style;
