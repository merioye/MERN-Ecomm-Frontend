import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const style = {
    searchBox: {
        height: "100%",
        width: "100%",
        padding: "0px 1rem",
        paddingTop: "8px",
        borderRadius: "8px",
        backgroundColor: "bg.secondary",
        color: "text.light",
    },
};
const AdminSearchBox = ({ placeholder, handleSearch }) => {
    return (
        <TextField
            placeholder={placeholder}
            sx={style.searchBox}
            autoComplete="off"
            variant="standard"
            InputProps={{
                disableUnderline: true,
                style: { fontSize: "14px", fontWeight: 500, color: "#7D879C" },
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon
                            sx={{ color: "#7D879C", fontSize: "20px" }}
                        />
                    </InputAdornment>
                ),
            }}
            onChange={(e) => {
                handleSearch(e.target.value);
            }}
        />
    );
};

export default AdminSearchBox;
