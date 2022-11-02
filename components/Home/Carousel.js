import { useRef } from "react";
import Slider from "react-slick";
import { Box, IconButton } from "@mui/material";
import ProductCard from "components/shared/ProductCard";
import SmallProductCard from "components/Home/SmallProductCard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const style = {
    itemsContainer: {
        width: "1200px",
        margin: "auto",
        marginBottom: "50px",
        position: "relative",
        borderRadius: "8px",
    },
    arrowIcon: {
        position: "absolute",
        zIndex: 1,
        backgroundColor: "bg.spaceLight",
        color: "text.white",
        fontSize: "20px",
        "&:hover": {
            backgroundColor: "bg.spaceLight",
        },
    },
};
const settings1 = {
    infinite: false,
    slidesToShow: 4,
    swipeToSlide: false,
    arrows: false,
    speed: 500,
};
const settings2 = {
    infinite: false,
    slidesToShow: 6,
    swipeToSlide: false,
    arrows: false,
    speed: 500,
};
const Carousel = ({ type, heading, products }) => {
    const sliderRef = useRef(null);

    return (
        <Box sx={style.itemsContainer}>
            <IconButton
                sx={style.arrowIcon}
                style={{ left: "-10px", top: "43%" }}
                onClick={() => sliderRef.current?.slickPrev()}
            >
                <ArrowBackIcon />
            </IconButton>
            <IconButton
                sx={style.arrowIcon}
                style={{ right: "-10px", top: "43%" }}
                onClick={() => sliderRef.current?.slickNext()}
            >
                <ArrowForwardIcon />
            </IconButton>

            {type === "product" && (
                <Slider ref={sliderRef} {...settings1}>
                    {products.map((product) => {
                        return (
                            <ProductCard
                                key={product._id}
                                fromCarousel={true}
                                product={product}
                            />
                        );
                    })}
                </Slider>
            )}
            {type === "smallProduct" && (
                <Slider ref={sliderRef} {...settings2}>
                    {products.map((product) => {
                        return (
                            <SmallProductCard
                                key={product._id}
                                heading={heading}
                                product={product}
                            />
                        );
                    })}
                </Slider>
            )}
        </Box>
    );
};

export default Carousel;
