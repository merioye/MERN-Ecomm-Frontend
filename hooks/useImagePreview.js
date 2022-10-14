import { useState, useEffect } from 'react';



export const useImagePreview = (selectedImages) => {

    const [imagesPreviews, setImagesPreviews] = useState([]);


    useEffect(()=>{
        if(!selectedImages.length){
            setImagesPreviews([]);
            return;
        }

        setImagesPreviews([]);

        // generating the urls of images
        const previews = selectedImages.map(({ id, image })=>{
            const objectUrl = URL.createObjectURL(image);
            return { id: id, url: objectUrl};
        })
        setImagesPreviews(previews);

        // free memory when ever this component is unmounted
        return ()=>{

            imagesPreviews.forEach(({ url })=>{
                URL.revokeObjectURL(url);
            })

        }

    }, [selectedImages, setImagesPreviews])


    return { imagesPreviews };
}
