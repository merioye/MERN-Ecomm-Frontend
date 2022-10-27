import { Box } from "@mui/material";
import Carousel from "react-material-ui-carousel";

const style = {
    container: {
        width: "100%",
        marginBottom: "60px",
    },
    imageContainer: {
        width: "100%",
        height: "620px",
        position: "relative",
    },
};
const HomePageSlider = () => {
    return (
        <Box sx={style.container}>
            <Carousel>
                {[1, 2, 3, 4, 5].map((item) => (
                    <img
                        key={item}
                        loading="lazy"
                        src={`/images/poster${item}.jpg`}
                        alt="bannerImage"
                        style={{ width: "100%", height: "auto" }}
                    />
                ))}
            </Carousel>
        </Box>
    );
};

export default HomePageSlider;
