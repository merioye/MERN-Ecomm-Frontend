import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useImagePreview } from "hooks/useImagePreview";
import { useDispatch } from "react-redux";
import { showErrorAlert, showSuccessAlert } from "redux/alertSlice";

const withImage = (WrappedComponent, h, w, name) => {
    const EnhancedComponent = (props) => {
        const [selectedImages, setSelectedImages] = useState([]);
        const { imagesPreviews } = useImagePreview(selectedImages);
        const dispatch = useDispatch();

        const onDrop = useCallback((acceptedFiles) => {
            if (name === "product") {
                onFilesChange(acceptedFiles);
            } else {
                onFilesChange(acceptedFiles[0]);
            }
        }, []);

        const { getRootProps, getInputProps, isDragActive } = useDropzone({
            onDrop,
        });

        const saveFileToState = (file) => {
            if (name === "product") {
                const imgs = file.map((img) => {
                    return { id: `${img.name}-${Date.now()}`, image: img };
                });

                setSelectedImages([...selectedImages, ...imgs]);
                dispatch(
                    showSuccessAlert("Images has been uploaded successfully")
                );
            } else {
                const img = { id: `${file.name}-${Date.now()}`, image: file };
                setSelectedImages([img]);
                dispatch(
                    showSuccessAlert(`Image has been uploaded successfully`)
                );
            }
        };

        const onFilesChange = (file) => {
            if (name === "product") {
                if (!file.length) return;

                for (let f of file) {
                    if (!f.type.startsWith("image")) {
                        dispatch(
                            showErrorAlert(
                                "Selected files are not of type image, please select images only"
                            )
                        );
                        return;
                    }
                }

                for (let i in file) {
                    const reader = new FileReader();
                    reader.readAsDataURL(file[i]);
                    reader.onload = (e) => {
                        const image = new Image();
                        image.src = e.target.result;
                        image.onload = (e) => {
                            const height = e.target.height;
                            const width = e.target.width;
                            if (height !== h || width !== w) {
                                dispatch(
                                    showErrorAlert(
                                        `All images size should be ${h}*${w}`
                                    )
                                );
                                return;
                            } else {
                                if (i == file.length - 1) {
                                    saveFileToState(file);
                                }
                            }
                        };
                    };
                }
            } else {
                if (!file) return;

                if (!file.type.startsWith("image")) {
                    dispatch(
                        showErrorAlert(
                            "Selected file is not of type image, please select image only"
                        )
                    );
                    return;
                }

                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = (e) => {
                    const image = new Image();
                    image.src = e.target.result;
                    image.onload = (e) => {
                        const height = e.target.height;
                        const width = e.target.width;
                        if (height !== h || width !== w) {
                            dispatch(
                                showErrorAlert(`Image size should be ${h}*${w}`)
                            );
                            return;
                        } else {
                            saveFileToState(file);
                        }
                    };
                };
            }
        };

        const handleRemoveImage = (imageId) => {
            const updatedImages = selectedImages.filter((img) => {
                return img.id !== imageId;
            });
            setSelectedImages(updatedImages);
        };

        return (
            <WrappedComponent
                selectedImages={selectedImages}
                imagesPreviews={imagesPreviews}
                dispatch={dispatch}
                getRootProps={getRootProps}
                getInputProps={getInputProps}
                isDragActive={isDragActive}
                onFilesChange={onFilesChange}
                handleRemoveImage={handleRemoveImage}
                {...props}
            />
        );
    };
    return EnhancedComponent;
};

export default withImage;
