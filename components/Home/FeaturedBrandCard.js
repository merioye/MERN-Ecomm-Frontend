import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import Image from 'next/image';


const style = {
    imageContainer: {
        width: '130px',
        height: '130px',
        borderRadius: '5px',
        marginBottom: '8px',
        overflow: 'hidden',
        position: 'relative',
        transitionProperty: 'all',
        transitionDuration: '0.3s',
        '&:hover': {
            filter: 'brightness(70%)'
        }
    },
    heading: {
        fontSize: '14px',
        fontWeight: 600,
        textAlign: 'center',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
    }
}
const FeaturedBrandCard = ( { brand } ) => {

    const router = useRouter();

    return (
        <Box 
            sx={{ cursor: 'pointer' }}
            onClick={()=> router.push(`/search?brand=${brand.name}`)}
        >
            <Box sx={style.imageContainer}>
                <Image
                    src={brand.logoUrl}
                    alt='brandImage'
                    layout='fill'
                    placeholder="blur"
                    blurDataURL={brand.logoUrl}
                />
            </Box>
            <Typography variant='h4' sx={style.heading}>{brand.name}</Typography>
        </Box>
    )
}

export default FeaturedBrandCard;