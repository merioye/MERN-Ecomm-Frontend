import { useTheme, Grid, Typography, Box } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

const style = {
    container: {
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: "bg.secondary",
        color: "text.primary",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
    },
    imageContainer: {
        height: "50px",
        width: "50px",
        borderRadius: "50%",
        overflow: "hidden",
        marginRight: "1rem",
        position: "relative",
    },
    heading: {
        fontSize: "14px",
        fontWeight: 600,
        color: "text.primary",
    },
};
const CategoryCard = ({ category }) => {
    const router = useRouter();
    const theme = useTheme();

    return (
        <Grid
            item
            xs={1.8}
            sx={style.container}
            style={{ boxShadow: theme.palette.boxShadow.card }}
            onClick={() => router.push(`/search?category=${category.name}`)}
        >
            <Box sx={style.imageContainer}>
                <Image
                    src={category.logoUrl}
                    alt="categoryImage"
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={category.logoUrl}
                />
            </Box>

            <Typography sx={style.heading}>{category.name}</Typography>
        </Grid>
    );
};

export default CategoryCard;
