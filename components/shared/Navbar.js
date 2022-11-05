import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { showErrorAlert } from "redux/alertSlice";
import { getCartItems } from "redux/cartSlice";
import { useSocket } from "hooks/useSocket";
import {
    useTheme,
    Box,
    Grid,
    Typography,
    TextField,
    InputAdornment,
    Button,
    IconButton,
    ClickAwayListener,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import NavProfilePopup from "components/shared/NavProfilePopup";
import debounce from "utils/debounce";
import axiosInstance from "config/axios";
import Currency from "react-currency-formatter";

const style = {
    container: {
        // height: "80px",
        height: { xs: "65px", m: "80px" },
        width: "100%",
        backgroundColor: "bg.secondary",
        position: "fixed",
        top: "0px",
        left: "0px",
        zIndex: 3,
    },
    navbar: {
        width: { lg: "1200px", xs: "90%" },
        margin: "auto",
        height: "100%",
    },
    logo: {
        marginRight: "16px",
        fontWeight: 700,
        color: "bg.spaceLight",
        fontSize: "27px",
    },
    searchBoxContainer: {
        height: "44px",
        position: "relative",
    },
    searchBox: {
        height: "100%",
        borderRadius: "40px",
        paddingRight: "0px",
        overflow: "hidden",
        width: "100%",
        fontSize: "14px",
        fontWeight: 400,
        color: "text.secondary2",
    },
    categoryBtn: {
        paddingLeft: { xm: "24px", xs: "10px" },
        paddingRight: { xm: "24px", xs: "10px" },
        fontSize: "14px",
        textTransform: "capitalize",
        fontWeight: 600,
        height: "44px",
        border: "none",
        borderRadius: "0px",
        backgroundColor: "bg.azureBlue",
        color: "text.white",
        boxShadow: "none",
        "&:hover": {
            backgroundColor: "bg.royalBlue",
            boxShadow: "none",
        },
    },
    iconButton: {
        fontSize: "1.5rem",
        backgroundColor: "bg.aliceBlue",
        padding: "10px",
        color: "text.secondaryLight",
        position: "relative",
        marginLeft: "20px",
        display: { xm: "flex", xs: "none" },
        justifyContent: "center",
        alignItems: "center",
    },
    cartItemsCount: {
        position: "absolute",
        right: "-5px",
        top: "-10px",
        backgroundColor: "bg.azureBlue",
        color: "text.white",
        borderRadius: "50%",
        padding: "4px",
        fontSize: "12px",
        minWidth: "22px",
    },
    searchResults: {
        position: "absolute",
        left: "0px",
        top: "44px",
        width: "100%",
        borderRadius: "8px",
    },
    popup: {
        height: "auto",
        maxHeight: "400px",
        width: "auto",
        backgroundColor: "bg.secondary",
    },
    itemsList: {
        display: "flex",
        flexDirection: "column",
    },
    productsHeading: {
        fontSize: "14px",
        fontWeight: 600,
        color: "text.primary",
        padding: "8px 16px",
        backgroundColor: "bg.aliceBlue",
    },
    item: {
        fontSize: "14px",
        fontWeight: 400,
        textTransform: "capitalize",
        color: "text.primary",
        padding: "10px 16px",
        width: "100%",
    },
    imageContainer: {
        position: "relative",
        height: "64px",
        width: "64px",
        marginRight: "20px",
    },
    productName: {
        fontSize: "14px",
        fontWeight: 600,
        color: "text.primary",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        textAlign: "left",
    },
    viewAllBtn: {
        padding: "10px 16px",
        color: "bg.azureBlue",
        width: "100%",
        textTransform: "capitalize",
    },
};
const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);
    const [searchResults, setSearchResults] = useState([]);
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [profilePopup, setProfilePopup] = useState(null);
    const [inputValue, setInputValue] = useState("");
    const dispatch = useDispatch();
    const router = useRouter();
    const theme = useTheme();
    useSocket();

    useEffect(() => {
        dispatch(getCartItems());
    }, []);

    const redirect = () => {
        setSearchResults(false);
        router.push(`/search?productName=${inputValue}`);
    };
    const fetchSuggestions = async (value) => {
        setInputValue(String(value).trim());

        if (!value.trim().length) {
            setSearchResults([]);
            setShowSearchResults(false);
            return;
        }
        try {
            const res = await axiosInstance.get(
                `${
                    process.env.NEXT_PUBLIC_SERVER_BASE_URL
                }/api/products/search?search=${value.trim()}&page=0.5`
            );
            setSearchResults(res.data.result);
            setShowSearchResults(true);
        } catch (e) {
            console.log(e);
            dispatch(showErrorAlert(e.response.data.message));
        }
    };

    const handleSearch = debounce(fetchSuggestions, 500);

    return (
        <Box
            sx={style.container}
            style={{ boxShadow: theme.palette.boxShadow.nav }}
        >
            <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                sx={style.navbar}
            >
                <Grid
                    xs={0}
                    xm={3}
                    item
                    sx={{ display: { xm: "block", xs: "none" } }}
                >
                    <Link href="/">
                        <a>
                            <Typography variant="h4" sx={style.logo}>
                                TeleCart
                            </Typography>
                        </a>
                    </Link>
                </Grid>

                <Grid xs={9.5} xm={5} item sx={style.searchBoxContainer}>
                    <TextField
                        sx={style.searchBox}
                        placeholder="Searching for..."
                        autoComplete="off"
                        InputProps={{
                            style: style.searchBox,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon
                                        sx={{
                                            color: "text.light",
                                            fontSize: "20px",
                                        }}
                                    />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Button
                                        sx={style.categoryBtn}
                                        variant="contained"
                                        onClick={redirect}
                                    >
                                        Search
                                    </Button>
                                </InputAdornment>
                            ),
                        }}
                        onChange={(e) => handleSearch(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === "Enter") {
                                setTimeout(() => {
                                    setShowSearchResults(false);
                                    router.push(
                                        `/search?productName=${e.target.value.trim()}`
                                    );
                                }, 100);
                            }
                        }}
                    />

                    {showSearchResults && (
                        <ClickAwayListener
                            onClickAway={() => setShowSearchResults(false)}
                        >
                            <Box
                                sx={style.popup}
                                style={{
                                    ...style.searchResults,
                                    boxShadow: theme.palette.boxShadow.nav,
                                }}
                            >
                                {searchResults.length ? (
                                    <Typography
                                        variant="h6"
                                        sx={style.productsHeading}
                                    >
                                        Products
                                    </Typography>
                                ) : null}
                                <Box sx={style.itemsList}>
                                    {searchResults.length ? (
                                        searchResults.map((product) => {
                                            return (
                                                <Link
                                                    key={product._id}
                                                    href={`/product/${product._id}`}
                                                >
                                                    <a>
                                                        <Button
                                                            sx={style.item}
                                                            style={{
                                                                justifyContent:
                                                                    "flex-start",
                                                            }}
                                                        >
                                                            <Box
                                                                sx={
                                                                    style.imageContainer
                                                                }
                                                            >
                                                                <Image
                                                                    src={
                                                                        product
                                                                            .images[0]
                                                                            .imageUrl
                                                                    }
                                                                    alt="productImage"
                                                                    layout="fill"
                                                                    placeholder="blur"
                                                                    blurDataURL={
                                                                        product
                                                                            .images[0]
                                                                            .imageUrl
                                                                    }
                                                                />
                                                            </Box>
                                                            <Box
                                                                sx={{
                                                                    display:
                                                                        "flex",
                                                                    flexDirection:
                                                                        "column",
                                                                    justifyContent:
                                                                        "center",
                                                                    width: "calc(100% - 84px)",
                                                                }}
                                                            >
                                                                <Typography
                                                                    variant="body1"
                                                                    sx={
                                                                        style.productName
                                                                    }
                                                                    mb="6px"
                                                                >
                                                                    {
                                                                        product.name
                                                                    }
                                                                </Typography>
                                                                <Typography
                                                                    variant="body1"
                                                                    sx={{
                                                                        ...style.productName,
                                                                        color: "bg.azureBlue",
                                                                    }}
                                                                >
                                                                    {product.isOnSale ? (
                                                                        <Currency
                                                                            quantity={
                                                                                product.salePrice
                                                                            }
                                                                            currency="usd"
                                                                        />
                                                                    ) : (
                                                                        <Currency
                                                                            quantity={
                                                                                product.regularPrice
                                                                            }
                                                                            currency="usd"
                                                                        />
                                                                    )}
                                                                </Typography>
                                                            </Box>
                                                        </Button>
                                                    </a>
                                                </Link>
                                            );
                                        })
                                    ) : (
                                        <Typography
                                            variant="body1"
                                            sx={style.item}
                                            style={{
                                                textAlign: "center",
                                                padding: "30px 0px",
                                            }}
                                        >
                                            No results matched!
                                        </Typography>
                                    )}
                                    {searchResults.length ? (
                                        <Button
                                            sx={style.viewAllBtn}
                                            onClick={redirect}
                                        >
                                            View all results &gt;
                                        </Button>
                                    ) : null}
                                </Box>
                            </Box>
                        </ClickAwayListener>
                    )}
                </Grid>

                <Grid
                    xs={2}
                    xm={3}
                    item
                    style={{ display: "flex", justifyContent: "flex-end" }}
                >
                    {user ? (
                        <IconButton
                            sx={{
                                height: "45px",
                                width: "45px",
                                padding: "0px",
                                borderRadius: "50%",
                                positon: "relative",
                                overflow: "hidden",
                            }}
                            onClick={(e) => setProfilePopup(e.currentTarget)}
                            aria-describedby={
                                Boolean(profilePopup)
                                    ? "simple-popover"
                                    : undefined
                            }
                        >
                            <Image
                                src={
                                    user.avatar
                                        ? user.avatar
                                        : "/images/man.svg"
                                }
                                alt="profileImage"
                                height="100%"
                                width="100%"
                                placeholder="blur"
                                blurDataURL={
                                    user.avatar
                                        ? user.avatar
                                        : "/images/man.svg"
                                }
                            />
                        </IconButton>
                    ) : (
                        <Link href="/login">
                            <a>
                                <IconButton
                                    sx={{
                                        height: "45px",
                                        width: "45px",
                                        padding: "0px",
                                    }}
                                >
                                    <Image
                                        src="/images/man.svg"
                                        alt="profileImage"
                                        height="100%"
                                        width="100%"
                                        placeholder="blur"
                                        blurDataURL="/images/man.svg"
                                    />
                                </IconButton>
                            </a>
                        </Link>
                    )}

                    <Link href="/cart">
                        <a>
                            <IconButton sx={style.iconButton}>
                                <ShoppingBagOutlinedIcon />
                                {cartItems.length ? (
                                    <Box sx={style.cartItemsCount}>
                                        {cartItems.length}
                                    </Box>
                                ) : null}
                            </IconButton>
                        </a>
                    </Link>

                    <NavProfilePopup
                        profilePopup={profilePopup}
                        setProfilePopup={setProfilePopup}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Navbar;
