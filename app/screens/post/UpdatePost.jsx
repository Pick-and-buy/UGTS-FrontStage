import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    ImageBackground,
} from "react-native";
import { FontAwesome, AntDesign, MaterialIcons, FontAwesome6, Ionicons } from '@expo/vector-icons';
import React, { useState, useRef, useContext, useEffect } from "react";
import { NavigationContaine, useNavigation } from '@react-navigation/native';
import { COLORS, SHADOWS } from "../../constants/theme";
import styles from '../post/updatePost.style';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { updatePost, getPostDetails } from "../../api/post";
import * as ImagePicker from "expo-image-picker";
import { Video } from 'expo-av';
import Button from "../../components/Button";

const UpdatePost = ({ route }) => {
    // console.log(">>> check postId: ", route.params);
    const { postId } = route.params;
    const [postDetails, setPostDetails] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false); // Add state to track data loading

    const navigation = useNavigation();

    const [images, setImages] = useState([
        { index: '1', label: 'Overall picture', name: 'Overallpicture', logoUrl: require('../../../assets/images/bag/overall_picture.png'), value: '' },
        { index: '2', label: 'Brand logo', name: 'Brandlogo', logoUrl: require('../../../assets/images/bag/brand_logo.png'), value: '' },
        { index: '3', label: 'Inside label', name: 'Insidelabel', logoUrl: require('../../../assets/images/bag/inside_label.png'), value: '' },
        { index: '4', label: 'Hardware engravings', name: 'Hardwareengravings', logoUrl: require('../../../assets/images/bag/hardware_engravings.png'), value: '' },
        { index: '5', label: 'Serial number', name: 'Serialnumber', logoUrl: require('../../../assets/images/bag/serial_number.png'), value: '' },
        { index: '6', label: 'Made in label', name: 'Madeinlabel', logoUrl: require('../../../assets/images/bag/made_in_label.png'), value: '' },
        { index: '7', label: 'QR code label', name: 'QRcodelabel', logoUrl: require('../../../assets/images/bag/qr_code_label.png'), value: '' },
        { index: '8', label: 'Hologram label', name: 'Hologramlabel', logoUrl: require('../../../assets/images/bag/hologram_label.png'), value: '' },
        { index: '9', label: 'Zipper head (front)', name: 'Zipperhead(front)', logoUrl: require('../../../assets/images/bag/zipper_head_front.png'), value: '' },
        { index: '10', label: 'Zipper head (back)', name: 'Zipperhead(back)', logoUrl: require('../../../assets/images/bag/zipper_head_back.png'), value: '' },
        { index: '11', label: 'Button', name: 'Button', logoUrl: require('../../../assets/images/bag/button.png'), value: '' },
        { index: '12', label: 'Shoulder strap clasp', name: 'Shoulderstrapclasp', logoUrl: require('../../../assets/images/bag/shoulder_strap_clasp.png'), value: '' },
        { index: '13', label: 'Logo texture close up', name: 'Logotexturecloseup', logoUrl: require('../../../assets/images/bag/logo_texture_close_up_macro_image.png'), value: '' },
        { index: '14', label: 'Authenticity card', name: 'Authenticitycard', logoUrl: require('../../../assets/images/bag/authenticity_card.png'), value: '' },
        { index: '15', label: 'Dust bag', name: 'Dustbag', logoUrl: require('../../../assets/images/bag/dust_bag.png'), value: '' },
        { index: '16', label: '1st optional photo', name: '1stoptionalphoto', logoUrl: require('../../../assets/images/bag/1st_optional_photo.png'), value: '' },
        { index: '17', label: '2nd optional photo', name: '2ndoptionalphoto', logoUrl: require('../../../assets/images/bag/2nd_optional_photo.png'), value: '' },
    ]);
    const [imagesView, setImagesView] = useState([
        { index: '1', label: 'Overall picture', name: 'Overallpicture', logoUrl: require('../../../assets/images/bag/overall_picture.png'), value: '' },
        { index: '2', label: 'Brand logo', name: 'Brandlogo', logoUrl: require('../../../assets/images/bag/brand_logo.png'), value: '' },
        { index: '3', label: 'Inside label', name: 'Insidelabel', logoUrl: require('../../../assets/images/bag/inside_label.png'), value: '' },
        { index: '4', label: 'Hardware engravings', name: 'Hardwareengravings', logoUrl: require('../../../assets/images/bag/hardware_engravings.png'), value: '' },
        { index: '5', label: 'Serial number', name: 'Serialnumber', logoUrl: require('../../../assets/images/bag/serial_number.png'), value: '' },
        { index: '6', label: 'Made in label', name: 'Madeinlabel', logoUrl: require('../../../assets/images/bag/made_in_label.png'), value: '' },
        { index: '7', label: 'QR code label', name: 'QRcodelabel', logoUrl: require('../../../assets/images/bag/qr_code_label.png'), value: '' },
        { index: '8', label: 'Hologram label', name: 'Hologramlabel', logoUrl: require('../../../assets/images/bag/hologram_label.png'), value: '' },
        { index: '9', label: 'Zipper head (front)', name: 'Zipperhead(front)', logoUrl: require('../../../assets/images/bag/zipper_head_front.png'), value: '' },
        { index: '10', label: 'Zipper head (back)', name: 'Zipperhead(back)', logoUrl: require('../../../assets/images/bag/zipper_head_back.png'), value: '' },
        { index: '11', label: 'Button', name: 'Button', logoUrl: require('../../../assets/images/bag/button.png'), value: '' },
        { index: '12', label: 'Shoulder strap clasp', name: 'Shoulderstrapclasp', logoUrl: require('../../../assets/images/bag/shoulder_strap_clasp.png'), value: '' },
        { index: '13', label: 'Logo texture close up', name: 'Logotexturecloseup', logoUrl: require('../../../assets/images/bag/logo_texture_close_up_macro_image.png'), value: '' },
        { index: '14', label: 'Authenticity card', name: 'Authenticitycard', logoUrl: require('../../../assets/images/bag/authenticity_card.png'), value: '' },
        { index: '15', label: 'Dust bag', name: 'Dustbag', logoUrl: require('../../../assets/images/bag/dust_bag.png'), value: '' },
        { index: '16', label: '1st optional photo', name: '1stoptionalphoto', logoUrl: require('../../../assets/images/bag/1st_optional_photo.png'), value: '' },
        { index: '17', label: '2nd optional photo', name: '2ndoptionalphoto', logoUrl: require('../../../assets/images/bag/2nd_optional_photo.png'), value: '' },
    ]);

    const [invoice, setInvoice] = useState("");
    const [videoUri, setVideoUri] = useState("");

    const [isMuted, setIsMuted] = useState(false);

    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedBrandLine, setSelectedBrandLine] = useState(null);

    const FEE = 500000;

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    }

    // Format the price using the helper function
    const formattedPrice = formatPrice(postDetails?.product?.price);
    //Format Fee
    const formattedFee = formatPrice(FEE);

    const fetchPostDetails = async () => {
        const response = await getPostDetails(postId);
        const postInfo = response.data.result;
        setPostDetails(postInfo)

        // Set giá trị ban đầu cho selectedBrand và selectedBrandLine từ dữ liệu bài đăng
        if (postInfo && postInfo.product) {
            setSelectedBrand(postInfo.product.brand.name);
            setSelectedBrandLine(postInfo.product.brandLine.lineName);
        }
        setIsDataLoaded(true);  // Set data loaded to true
    };

    useEffect(() => {
        fetchPostDetails();
    }, [postId]);

    const getLastPartUrl = (url, imagesViewName) => {
        const parts = url.split('/');
        const fileName = parts.pop();
        const namePart = fileName.split('-').pop().split('.')[0];
        return namePart === imagesViewName;
    };

    const setListImage = () => {
        const newImagesView = imagesView.map((image, index) => {
            // Tìm ảnh từ API có last part url của imageUrl trùng với name của imagesView
            const matchedImage = postDetails?.product?.images.find(apiImage => getLastPartUrl(apiImage.imageUrl, image.name));
            // Nếu tìm thấy url có last part === imagesView.name thì gán imageUrl vào value, ngược lại để value trống
            const imageUrl = matchedImage ? matchedImage.imageUrl : '';
            return {
                ...image,
                value: imageUrl,
            };
        });
        setImagesView(newImagesView);
        if (postDetails?.product?.originalReceiptProof) {
            setInvoice(postDetails?.product?.originalReceiptProof);
        }
        if (postDetails?.product?.productVideo) {
            setVideoUri(postDetails?.product?.productVideo)
        }
    }

    useEffect(() => {
        setListImage()
    }, [isDataLoaded])


    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Hãy nhập tiêu đề bài đăng'),
    });

    const handleUpdatePost = async (values, actions) => {
        try {
            let { title, description } = values;
            console.log('>>> check values: ', values);
            let queryId = `${postDetails?.id}`;
            const formData = new FormData();
            const request = {
                title: title,
                description: description,
                product: {
                    id: postDetails?.product?.id
                }
            };

            formData.append('request', JSON.stringify(request));

            const filteredImages = images.filter(image => image.value && image.value !== "");

            if (filteredImages.length === 0) {
                console.warn('Ảnh không được để trống!')
                return;
            } else {
                filteredImages.forEach((image, index) => {
                    if (image) {
                        const fileName = image.value.split('/').pop();
                        formData.append('productImages', {
                            uri: image.value,
                            type: 'image/jpeg',
                            name: fileName,
                        });
                    }
                });
            }

            await updatePost(queryId, formData);
            navigation.goBack();

        } catch (error) {
            console.error('ERROR handle create post: ', error);
        }
    }

    //Upload Image
    const onGalleryMultiplePress = async (index) => {
        try {
            await ImagePicker.requestMediaLibraryPermissionsAsync();
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [1, 1],
            });
            if (!result.canceled) {
                const newImages = [...images];
                newImages[index].value = result.assets[0].uri;
                setImages(newImages);
            }
        } catch (error) {
            console.error('Error Upload Image: ', error);
        }
    }

    const uploadImageCamera = async (index) => {
        try {
            await ImagePicker.requestCameraPermissionsAsync();
            let result = await ImagePicker.launchCameraAsync({
                // Use the front camera and allows editing photo frames at 1:1 ratio
                cameraType: ImagePicker.CameraType.back,
                allowsEditing: true,
                aspect: [1, 1],
            });
            if (!result.canceled) {
                //save images
                const newImages = [...images];
                newImages[index].value = result.assets[0].uri;
                setImages(newImages);
            }
        } catch (error) {
            console.error('Error Upload Image: ', error);
        }
    };

    //Remove Image
    const removeImage = (index) => {
        const newImages = [...images];
        newImages[index].value = '';
        setImages(newImages);
    }

    //Upload Invoice
    const onGalleryUploadInvoice = async () => {
        try {
            await ImagePicker.requestMediaLibraryPermissionsAsync();
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [1, 1],
            });
            if (!result.canceled) {
                const newImages = result.assets[0].uri;
                setInvoice(newImages);
            }
        } catch (error) {
            console.error('Error Upload Image: ', error);
        }
    }

    //Remove Invoice
    const removeInvoice = () => {
        setInvoice("")
    }

    //Upload video
    const UploadVideoScreen = async () => {
        try {
            await ImagePicker.requestMediaLibraryPermissionsAsync();
            let result = await ImagePicker.launchImageLibraryAsync({
                // cameraType: ImagePicker.CameraType.back,
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                allowsEditing: true,
                aspect: [1, 1],
            });
            if (!result.canceled) {
                setVideoUri(result.assets[0].uri);
            }
        } catch (error) {
            console.error('Error Upload Image: ', error);
        }
    };

    //Remove Video
    const removeVideo = () => {
        setVideoUri("");
    }

    if (!isDataLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading...</Text>
            </View>
        );
    }

    const isImageUploaded = (label) => {
        //Step 1: Tìm trong imagesView xem những object nào đang có value khác rỗng
        //Step 2: Tìm trong những object đó xem có label của imagesView === label của images
        const newImagesView = imagesView.find(image => image.label === label && image.value !== '');
        return newImagesView;
    };

    const renderImages = ({ item, index }) => {
        const isUploaded = isImageUploaded(item.label);
        return (
            item.value === null || item.value === "" ?
                (
                    <View key={index}>
                        {!isUploaded ?
                            (
                                <View>
                                    <View key={index} style={styles.image} >
                                        <TouchableOpacity onPress={() => uploadImageCamera(index)}>
                                            <Image
                                                style={styles.imageBrandLogo}
                                                source={item.logoUrl}
                                            />
                                            <FontAwesome name="camera" size={14} color={COLORS.gray} style={{ position: 'absolute', left: 3, top: 5 }} />
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity style={styles.viewBrandLogo} onPress={() => onGalleryMultiplePress(index)}>
                                        <Text style={styles.textBrandLogo}>{item.label}</Text>
                                        <AntDesign name="cloudupload" size={16} color={COLORS.gray} style={{ textAlign: 'center' }} />
                                    </TouchableOpacity>
                                </View>
                            )
                            :
                            (
                                <View>
                                    <View key={index} style={styles.image} >
                                        <View>
                                            <Image
                                                style={styles.imageBrandLogo}
                                                source={item.logoUrl}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.viewBrandLogo}>
                                        <Text style={styles.textBrandLogo}>{item.label}</Text>
                                    </View>
                                </View>
                            )
                        }
                    </View>
                )
                :
                (
                    <View key={index}>
                        <ImageBackground
                            source={{ uri: item.value }}
                            style={styles.image} >
                            <TouchableOpacity onPress={() => removeImage(index)}>
                                <FontAwesome6 style={styles.xmark} name="xmark" size={20} color="white" />
                            </TouchableOpacity>
                        </ImageBackground>
                        <View style={styles.viewBrandLogo}>
                            <Text style={styles.textBrandLogo}>{item.label}</Text>
                        </View>
                    </View>
                )
        );
    };

    const renderImagesView = ({ item, index }) => {
        return (
            item.value === null || item.value === "" ?
                (
                    <View key={index}>
                        <View key={index} style={styles.image} >
                            <TouchableOpacity>
                                <Image
                                    style={styles.imageBrandLogo}
                                    source={item.logoUrl}
                                />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.viewBrandLogo}>
                            <Text style={styles.textBrandLogo}>{item.label}</Text>
                        </TouchableOpacity>
                    </View>
                )
                :
                (
                    <View key={index}>
                        <ImageBackground
                            source={{ uri: item.value }}
                            style={styles.image}>
                        </ImageBackground>
                        <View style={styles.viewBrandLogo}>
                            <Text style={styles.textBrandLogo}>{item.label}</Text>
                        </View>
                    </View>
                )
        );
    };

    return (
        <ScrollView style={{ backgroundColor: COLORS.white }}>
            <Formik
                initialValues={{
                    title: postDetails.title || '',
                    productName: postDetails?.product?.name || '',
                    brandName: postDetails?.product?.brand?.name || '',
                    brandLineName: postDetails?.product?.brandLine?.lineName || '',
                    condition: postDetails?.product?.condition || '',
                    category: postDetails?.product?.category?.categoryName || '',
                    description: postDetails?.description || '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleUpdatePost}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, setFieldTouched, setValues }) => {

                    return (
                        <View style={styles.container}>
                            {/* Header */}
                            <View style={styles.headerContainer}>
                                <FontAwesome6 style={{ marginLeft: 10 }} name="xmark" size={30} color={COLORS.primary}
                                    onPress={() => navigation.goBack()}
                                />
                                <Text style={[styles.textName, { marginLeft: 10 }]}>Cập Nhật Bài Đăng</Text>
                            </View>
                            <View style={styles.shadow}>{/* Tạo Khoảng Trống */}</View>

                            {/* Image Upload */}
                            <View style={styles.imageUploadContaniner}>
                                <View
                                    style={styles.imageUpload}>
                                    <FlatList
                                        data={images}
                                        keyExtractor={(item, index) => index.toString()}
                                        horizontal
                                        renderItem={renderImages}
                                    />
                                </View>

                                {/* Image View */}
                                <View style={[styles.imageUpload, { marginTop: 20 }]}>
                                    <FlatList
                                        data={imagesView}
                                        keyExtractor={(item, index) => index.toString()}
                                        horizontal
                                        renderItem={renderImagesView}
                                    />
                                </View>
                                <View style={{ marginTop: 35, flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                    <Text style={{ fontSize: 16 }}>Thông tin sản phẩm</Text>
                                    <TouchableOpacity
                                        style={{ flexDirection: "row", gap: 10 }}
                                        onPress={() => console.warn("Quy Tắc")}
                                    >
                                        <AntDesign name="questioncircle" size={20} color="#5e5b55" />
                                        <Text>Quy tắc</Text>
                                    </TouchableOpacity>

                                </View>
                            </View>

                            {/* Upload image invoice and video */}
                            <View style={styles.selectOption}>
                                {invoice ?
                                    (
                                        <View style={styles.uploadInvoiceContainer}>
                                            <View style={styles.uploadInvoiceImage}>
                                                <ImageBackground
                                                    style={styles.uploadInvoice}
                                                    source={{ uri: invoice }}
                                                >
                                                    <TouchableOpacity onPress={() => removeInvoice()}>
                                                        <FontAwesome6 style={[styles.xmark, { left: 15, top: 5 }]} name="xmark" size={20} color="white" />
                                                    </TouchableOpacity>
                                                </ImageBackground>
                                            </View>
                                            <View style={{ marginTop: 10 }}>
                                                <Text style={{ textAlign: 'center', fontSize: 16 }}>Ảnh hóa đơn</Text>
                                            </View>
                                        </View>
                                    )
                                    :
                                    (
                                        <View style={styles.uploadInvoiceContainer}>
                                            <TouchableOpacity style={[styles.uploadInvoiceImage, { borderWidth: 2, borderColor: COLORS.offwhite, ...SHADOWS.medium }]}
                                                onPress={onGalleryUploadInvoice}
                                            >
                                                <Image
                                                    style={[styles.imageUploadVideo, { marginVertical: 30 }]}
                                                    source={require('../../../assets/images/gallery.png')}
                                                />
                                            </TouchableOpacity>
                                            <View style={{ marginTop: 10 }}>
                                                <Text style={{ textAlign: 'center', fontSize: 16 }}>Tải ảnh hóa đơn</Text>
                                            </View>
                                        </View>
                                    )

                                }
                                {videoUri ?
                                    (
                                        <View style={styles.uploadVideoContainer}>
                                            <View style={styles.uploadVideo}>
                                                <Video
                                                    source={{ uri: videoUri }}
                                                    style={{ width: '100%', height: '100%' }}
                                                    useNativeControls
                                                    resizeMode="cover"
                                                    shouldPlay
                                                    isLooping
                                                    isMuted={isMuted} // Set initial state to mute
                                                    onPlaybackStatusUpdate={(status) => {
                                                        if (!status.isPlaying && status.isMuted !== isMuted) {
                                                            setIsMuted(true); // Ensure the video starts muted
                                                        }
                                                    }}
                                                />
                                                <TouchableOpacity onPress={() => removeVideo()} style={{ position: 'absolute', bottom: 10, left: 15 }}>
                                                    <FontAwesome6 name="xmark" size={20} color="white" />
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ marginTop: 10 }}>
                                                <Text style={{ textAlign: 'center', fontSize: 16 }}>Video</Text>
                                            </View>
                                        </View>
                                    )
                                    :
                                    (
                                        <View style={styles.uploadVideoContainer}>
                                            <TouchableOpacity style={[styles.uploadVideo, { borderWidth: 2, borderColor: COLORS.offwhite, ...SHADOWS.medium }]}
                                                onPress={UploadVideoScreen}
                                            >
                                                <Image
                                                    style={styles.imageUploadVideo}
                                                    source={require('../../../assets/images/camera.png')}
                                                />
                                            </TouchableOpacity>
                                            <View style={{ marginTop: 10 }}>
                                                <Text style={{ textAlign: 'center', fontSize: 16 }}>Tải video</Text>
                                            </View>
                                        </View>
                                    )

                                }
                            </View>
                            <View style={styles.shadow}></View>

                            {/* Product Information */}
                            <View style={styles.productContainer}>
                                {/* Title */}
                                <View style={{ marginHorizontal: 10 }}>
                                    <View>
                                        <Text style={{ fontSize: 16 }}>Tiêu đề bài đăng <Text style={{ color: 'red', fontSize: 18, fontFamily: 'bold' }}>*</Text></Text>
                                    </View>
                                    <View style={{ height: 40 }}>
                                        <TextInput
                                            value={values.title}
                                            placeholder="Nhập tiêu đề bài đăng"
                                            style={styles.inputProduct}
                                            onFocus={() => {
                                                setFieldTouched("title");
                                            }}
                                            onBlur={() => {
                                                setFieldTouched("title", "");
                                            }}
                                            onChangeText={handleChange("title")}
                                            autoCorrect={false}
                                        />
                                    </View>
                                    {touched.title && errors.title && (
                                        <Text style={styles.errorText}>{errors.title}</Text>
                                    )}
                                </View>
                                <View style={styles.shadow}></View>

                                {/* Tên sản phẩm */}
                                <View style={styles.viewContainer}>
                                    <View style={styles.left}>
                                        <Text style={styles.leftText}>Tên sản phẩm</Text>
                                    </View>
                                    <View style={styles.right}>
                                        <TextInput
                                            value={values.productName}
                                            placeholder="Nhập tên sản phẩm"
                                            style={styles.rightText}
                                            onFocus={() => {
                                                setFieldTouched("productName");
                                            }}
                                            onBlur={() => {
                                                setFieldTouched("productName", "");
                                            }}
                                            onChangeText={handleChange("productName")}
                                            autoCorrect={false}
                                            editable={false}
                                        />
                                    </View>
                                    {touched.productName && errors.productName && (
                                        <Text style={styles.errorText}>{errors.productName}</Text>
                                    )}
                                </View>
                                <View style={styles.shadow}></View>

                                {/* Brand Name */}
                                <View style={styles.viewContainer}>
                                    <View style={styles.left}>
                                        <Text style={styles.leftText}>Nhãn Hàng </Text>
                                    </View>
                                    <View style={styles.right}>
                                        <TextInput
                                            value={values.brandName}
                                            style={styles.rightText}
                                            onFocus={() => {
                                                setFieldTouched("brandName");
                                            }}
                                            onBlur={() => {
                                                setFieldTouched("brandName", "");
                                            }}
                                            onChangeText={handleChange("brandName")}
                                            autoCorrect={false}
                                            editable={false}
                                        />
                                    </View>
                                </View>
                                <View style={styles.shadow}></View>

                                {/* Brand Line */}
                                <View style={styles.viewContainer}>
                                    <View style={styles.left}>
                                        <Text style={styles.leftText}>Dòng Thương Hiệu </Text>
                                    </View>
                                    <View style={styles.right}>
                                        <TextInput
                                            value={values.brandLineName}
                                            style={styles.rightText}
                                            onFocus={() => {
                                                setFieldTouched("brandLineName");
                                            }}
                                            onBlur={() => {
                                                setFieldTouched("brandLineName", "");
                                            }}
                                            onChangeText={handleChange("brandLineName")}
                                            autoCorrect={false}
                                            editable={false}
                                        />
                                    </View>
                                </View>
                                <View style={styles.shadow}></View>

                                {/* Category Name */}
                                <View style={styles.viewContainer}>
                                    <View style={styles.left}>
                                        <Text style={styles.leftText}>Thể Loại </Text>
                                    </View>
                                    <View style={styles.right}>
                                        <TextInput
                                            value={values.category}
                                            style={styles.rightText}
                                            onFocus={() => {
                                                setFieldTouched("category");
                                            }}
                                            onBlur={() => {
                                                setFieldTouched("category", "");
                                            }}
                                            onChangeText={handleChange("category")}
                                            autoCorrect={false}
                                            editable={false}
                                        />
                                    </View>
                                </View>
                                <View style={styles.shadow}></View>

                                {/* Trạng Thái Sản Phẩm */}
                                <View style={styles.viewContainer}>
                                    <View style={styles.left}>
                                        <Text style={styles.leftText}>Trạng Thái Sản Phẩm </Text>
                                    </View>
                                    <View style={styles.right}>
                                        <TextInput
                                            value={values.condition}
                                            style={styles.rightText}
                                            onFocus={() => {
                                                setFieldTouched("condition");
                                            }}
                                            onBlur={() => {
                                                setFieldTouched("condition", "");
                                            }}
                                            onChangeText={handleChange("condition")}
                                            autoCorrect={false}
                                            editable={false}
                                        />
                                    </View>
                                </View>
                                <View style={styles.shadow}></View>

                                {/* Size */}
                                <View style={styles.viewContainer}>
                                    <View style={styles.left}>
                                        <Text style={styles.leftText}>Kích Thước </Text>
                                    </View>
                                    <View style={styles.right}>
                                        <Text style={styles.rightText}>
                                            {postDetails?.product?.size.toLowerCase() === "none" || postDetails?.product?.size.toLowerCase() === "" ?
                                                " N/A" : postDetails?.product?.size}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.shadow}></View>

                                {/* Exterior Material */}
                                <View style={styles.viewContainer}>
                                    <View style={styles.left}>
                                        <Text style={styles.leftText}>Chất Liệu Bên Ngoài </Text>
                                    </View>
                                    <View style={styles.right}>
                                        <Text style={styles.rightText}>
                                            {postDetails?.product?.exteriorMaterial.toLowerCase() === "none" || postDetails?.product?.exteriorMaterial.toLowerCase() === "" ?
                                                " N/A" : postDetails?.product?.exteriorMaterial}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.shadow}></View>

                                {/* Interior Material */}
                                <View style={styles.viewContainer}>
                                    <View style={styles.left}>
                                        <Text style={styles.leftText}>Chất Liệu Bên Trong: </Text>
                                    </View>
                                    <View style={styles.right}>
                                        <Text style={styles.rightText}>
                                            {postDetails?.product?.interiorMaterial.toLowerCase() === "none" || postDetails?.product?.interiorMaterial.toLowerCase() === "" ?
                                                " N/A" : postDetails?.product?.interiorMaterial}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.shadow}></View>

                                {/* Width */}
                                <View style={styles.viewContainer}>
                                    <View style={styles.left}>
                                        <Text style={styles.leftText}>Chiều Rộng </Text>
                                    </View>
                                    <View style={styles.right}>
                                        {postDetails?.product?.width.toLowerCase() === "none" || postDetails?.product?.width.toLowerCase() === "" ?
                                            (
                                                <Text style={[styles.rightText, { marginLeft: 4 }]}>N/A</Text>
                                            )
                                            :
                                            (
                                                <Text style={styles.rightText}>{postDetails?.product?.width} cm</Text>
                                            )
                                        }
                                    </View>
                                </View>
                                <View style={styles.shadow}></View>

                                {/* Height */}
                                <View style={styles.viewContainer}>
                                    <View style={styles.left}>
                                        <Text style={styles.leftText}>Chiều Cao </Text>
                                    </View>
                                    <View style={styles.right}>
                                        {postDetails?.product?.height.toLowerCase() === "none" || postDetails?.product?.height.toLowerCase() === "" ?
                                            (
                                                <Text style={[styles.rightText, { marginLeft: 4 }]}>N/A</Text>
                                            )
                                            :
                                            (
                                                <Text style={styles.rightText}>{postDetails?.product?.height} cm</Text>
                                            )
                                        }
                                    </View>
                                </View>
                                <View style={styles.shadow}></View>

                                {/* Length */}
                                <View style={styles.viewContainer}>
                                    <View style={styles.left}>
                                        <Text style={styles.leftText}>Chiều Dài </Text>
                                    </View>
                                    <View style={styles.right}>
                                        {postDetails?.product?.length.toLowerCase() === "none" || postDetails?.product?.length.toLowerCase() === "" ?
                                            (
                                                <Text style={[styles.rightText, { marginLeft: 4 }]}>N/A</Text>
                                            )
                                            :
                                            (
                                                <Text style={styles.rightText}>{postDetails?.product?.length} cm</Text>
                                            )
                                        }
                                    </View>
                                </View>
                                <View style={styles.shadow}></View>

                                {/* Reference Code */}
                                <View style={styles.viewContainer}>
                                    <View style={styles.left}>
                                        <Text style={styles.leftText}>Mã Tham Chiếu </Text>
                                    </View>
                                    <View style={styles.right}>
                                        <Text style={styles.rightText}>
                                            {postDetails?.product?.referenceCode.toLowerCase() === "none" || postDetails?.product?.referenceCode.toLowerCase() === "" ?
                                                " N/A" : postDetails?.product?.referenceCode}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.shadow}></View>

                                {/* manufactureYear */}
                                <View style={styles.viewContainer}>
                                    <View style={styles.left}>
                                        <Text style={styles.leftText}>Năm Sản Xuất </Text>
                                    </View>
                                    <View style={styles.right}>
                                        <Text style={styles.rightText}>
                                            {postDetails?.product?.manufactureYear.toLowerCase() === "none" || postDetails?.product?.manufactureYear.toLowerCase() === "" ?
                                                " N/A" : postDetails?.product?.manufactureYear}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.shadow}></View>

                                {/* color */}
                                <View style={styles.viewContainer}>
                                    <View style={styles.left}>
                                        <Text style={styles.leftText}>Màu Sắc </Text>
                                    </View>
                                    <View style={styles.right}>
                                        <Text style={styles.rightText}>
                                            {postDetails?.product?.color.toLowerCase() === "none" || postDetails?.product?.color.toLowerCase() === "" ?
                                                " N/A" : postDetails?.product?.color}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.shadow}></View>

                                {/* accessories */}
                                <View style={styles.viewContainer}>
                                    <View style={styles.left}>
                                        <Text style={styles.leftText}>Phụ kiện sản phẩm </Text>
                                    </View>
                                    <View style={styles.right}>
                                        <Text style={styles.rightText}>
                                            {postDetails?.product?.accessories.toLowerCase() === "none" || postDetails?.product?.accessories.toLowerCase() === "" ?
                                                " N/A" : postDetails?.product?.accessories}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.shadow}></View>

                                {/* Date Code */}
                                <View style={styles.viewContainer}>
                                    <View style={styles.left}>
                                        <Text style={styles.leftText}>Date Code </Text>
                                    </View>
                                    <View style={styles.right}>
                                        <Text style={styles.rightText}>
                                            {postDetails?.product?.dateCode.toLowerCase() === "none" || postDetails?.product?.dateCode.toLowerCase() === "" ?
                                                " N/A" : postDetails?.product?.dateCode}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.shadow}></View>

                                {/* Serial Number */}
                                <View style={styles.viewContainer}>
                                    <View style={styles.left}>
                                        <Text style={styles.leftText}>Số sê-ri </Text>
                                    </View>
                                    <View style={styles.right}>
                                        <Text style={styles.rightText}>
                                            {postDetails?.product?.serialNumber.toLowerCase() === "none" || postDetails?.product?.serialNumber.toLowerCase() === "" ?
                                                " N/A" : postDetails?.product?.serialNumber}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.shadow}></View>

                                {/* Purchased Place */}
                                <View style={styles.viewContainer}>
                                    <View style={styles.left}>
                                        <Text style={styles.leftText}>Nơi Mua Sản Phẩm </Text>
                                    </View>
                                    <View style={styles.right}>
                                        <Text style={styles.rightText}>
                                            {postDetails?.product?.purchasedPlace.toLowerCase() === "none" || postDetails?.product?.purchasedPlace.toLowerCase() === "" ?
                                                " N/A" : postDetails?.product?.purchasedPlace}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.shadow}></View>

                                {/* Verify Level */}
                                <View style={styles.viewContainer}>
                                    <View style={styles.left}>
                                        <Text style={styles.leftText}>Verified Level </Text>
                                    </View>
                                    <View style={styles.right}>
                                        <Text style={[styles.rightText, { color: COLORS.primary }]}>
                                            {postDetails?.product?.verifiedLevel}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.shadow}></View>
                            </View>

                            {/* Product Description */}
                            <View style={styles.productDescriptionContainer}>
                                <View style={{ marginVertical: 10 }}>
                                    <Text style={{ fontSize: 16 }}>Mô Tả Sản Phẩm</Text>
                                </View>
                                <View style={{ height: "80%", width: "100%" }}>
                                    <TextInput
                                        value={values.description}
                                        placeholder="Nhập mô tả sản phẩm"
                                        style={[styles.inputProduct, { textAlignVertical: 'top' }]}
                                        onFocus={() => {
                                            setFieldTouched("description");
                                        }}
                                        onBlur={() => {
                                            setFieldTouched("description", "");
                                        }}
                                        onChangeText={handleChange("description")}
                                        autoCorrect={false}
                                        multiline={true}
                                    />
                                </View>
                            </View>

                            {/* Shipping information */}
                            <View style={styles.shippingInformation}>
                                <View style={{ marginVertical: 10 }}>
                                    <Text style={{ fontSize: 16 }}>Thông Tin Vận Chuyển</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={() => console.warn('Quy tắc')}
                                    style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <AntDesign
                                        name="questioncircle"
                                        size={20}
                                        color="#5e5b55"
                                    />
                                    <Text style={{ marginLeft: 10, fontSize: 16 }}>Quy tắc</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{ marginTop: 10 }}>
                                {/* Fee */}
                                <View style={styles.viewContainer}>
                                    <View style={styles.left}>
                                        <Text style={styles.leftText}>Phí Sàn</Text>
                                    </View>
                                    <View style={styles.right}>
                                        <Text style={styles.rightText}>Miễn phí</Text>
                                    </View>
                                </View>
                                <View style={styles.shadow}></View>
                            </View>

                            {/* Thành Tiền */}
                            <View>
                                <View style={styles.viewContainer}>
                                    <View style={styles.left}>
                                        <Text style={styles.leftText}>Lợi Nhuận Bán Hàng </Text>
                                    </View>
                                    <View style={styles.right}>
                                        <Text style={[styles.rightText, { color: COLORS.primary }]}>{formattedPrice} VND</Text>
                                    </View>
                                </View>
                                <View style={styles.shadow}></View>
                            </View>

                            <View style={{ marginTop: 30 }}>
                                <TouchableOpacity style={styles.button}
                                    onPress={handleSubmit}
                                >
                                    <Text style={styles.buttonText}>Cập Nhật</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    )
                }}
            </Formik>
        </ScrollView>
    );
}

export default UpdatePost;


