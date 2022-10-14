import { Box } from '@mui/material';
import Image from 'next/image';
import Carousel from 'react-material-ui-carousel';


const style = {
    container: {
        width: '100%',
        marginBottom: '60px'
    },
    imageContainer: {
        width: '100%',
        height: '620px',
        position: 'relative'
    }
}
const HomePageSlider = () => {
    return (
        <Box sx={style.container}>
            <Carousel
            >
                {
                    [1,2,3,4,5].map((item)=>(
                        <Box
                            key={item}
                            sx={style.imageContainer}
                        >
                            <Image
                                src={`/images/poster${item}.jpg`}
                                alt='bannerImage'
                                layout='fill'
                                placeholder='blur'
                                blurDataURL={`/images/poster${item}.jpg`}
                            />
                        </Box>
                    ))
                }   
            </Carousel>
        </Box>
    )
}

export default HomePageSlider;