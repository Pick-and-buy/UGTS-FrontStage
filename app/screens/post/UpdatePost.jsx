import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Dimensions,
    FlatList,
    ImageBackground,
    // Button,
} from "react-native";
import { FontAwesome, AntDesign, MaterialIcons, FontAwesome6, Ionicons } from '@expo/vector-icons';
import React, { useState, useRef, useContext, useEffect } from "react";
import { NavigationContaine, useNavigation } from '@react-navigation/native';
import { COLORS } from "../../constants/theme";
import styles from '../post/updatePost.style';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Dropdown } from 'react-native-element-dropdown';
import { callFetchListBrands } from "../../api/brand";
import { updatePost, getPostDetails } from "../../api/post";
import { getAllCategoriesByBrandLineName } from "../../api/category";
import { getAllBrandLinesByBrandName } from "../../api/brandLine";
import * as ImagePicker from "expo-image-picker";
import Button from "../../components/Button";

const UpdatePost = ({ route }) => {
    // console.log(">>> check postId: ", route.params);
    const { postId } = route.params;
    const [postDetails, setPostDetails] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false); // Add state to track data loading

    const navigation = useNavigation();

    const [images, setImages] = useState([null, null, null, null, null]);

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

    const setListImage = () => {
        const newImages = [];
        postDetails?.product?.images.map(item => {
            newImages.push(item.imageUrl)
        });

        while (newImages.length < 5) {
            newImages.push("")
        }
        setImages(newImages);
    }

    useEffect(() => {
        setListImage()
    }, [isDataLoaded])


    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Hãy nhập tiêu đề bài đăng'),
        // productName: Yup.string().required('Hãy nhập tên sản phẩm'),
        // brandName: Yup.string().required('Hãy chọn thương hiệu'),
        // condition: Yup.string().required('Hãy chọn trạng thái sản phẩm'),
        // brandLineName: Yup.string().required('Hãy chọn dòng thương hiệu'),
        // category: Yup.string().required('Hãy chọn thể loại'),
        // price: Yup.string().required('Hãy nhập giá tiền'),
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
            console.log('>>> check image: ', );
            images.forEach((image, index) => {
                if (image) {
                    const fileName = image.split('/').pop();
                    formData.append('productImages', {
                        uri: image,
                        type: 'image/jpeg',
                        name: fileName,
                    });
                }
            });
            await updatePost(queryId, formData);
            // navigation.navigate('Home')
            // setImages([null, null, null, null, null]);

        } catch (error) {
            console.error('ERROR handle create post: ', error);
        }
    }

    //Upload Image
    const onGalleryMultiplePress = async () => {
        try {
            await ImagePicker.requestMediaLibraryPermissionsAsync();
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                aspect: [1, 1],
                allowsMultipleSelection: true,  // allow multiple images
            });
            if (!result.canceled) {
                const newImages = result?.assets?.map(asset => asset.uri);
                const updatedImages = [...newImages, ...images].slice(0, 5);
                setImages(updatedImages);
            }
        } catch (error) {
            console.error('Error Upload Image: ', error);
        }
    }

    const uploadImageCamera = async () => {
        try {
            await ImagePicker.requestCameraPermissionsAsync();
            let result = await ImagePicker.launchCameraAsync({
                // Use the front camera and allows editing photo frames at 1:1 ratio
                cameraType: ImagePicker.CameraType.back,
                allowsEditing: true,
                aspect: [1, 1],
            });
            console.log('>>> check result: ', result);
            if (!result.canceled) {
                //save images
                const newImages = result?.assets?.map(asset => asset.uri);
                const updatedImages = [...newImages, ...images].slice(0, 5);
                setImages(updatedImages);
            }
        } catch (error) {
            console.error('Error Upload Image: ', error);
        }
    };

    //Remove Image
    const removeImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        newImages.push("")
        setImages(newImages);
    }

    if (!isDataLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Loading...</Text>
            </View>
        );
    }

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
                    // exteriorMaterial: postDetails?.product?.exteriorMaterial || '',
                    // interiorMaterial: postDetails?.product?.interiorMaterial || '',
                    // size: postDetails?.product?.size || '',
                    // width: postDetails?.product?.width || '',
                    // height: postDetails?.product?.height || '',
                    // length: postDetails?.product?.length || '',
                    // referenceCode: postDetails?.product?.referenceCode || '',
                    // manufactureYear: postDetails?.product?.manufactureYear || '',
                    // color: postDetails?.product?.color || '',
                    // accessories: postDetails?.product?.accessories || '',
                    // dateCode: postDetails?.product?.dateCode || '',
                    // serialNumber: postDetails?.product?.serialNumber || '',
                    // purchasedPlace: postDetails?.product?.purchasedPlace || '',
                    description: postDetails?.description || '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleUpdatePost}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, setFieldTouched, setValues }) => {

                    const total = values.price ? parseInt(values.price, 10) - parseInt(formattedFee, 10) : '';
                    // Format the price using the helper function
                    const formattedTotal = formatPrice(total);

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
                                        renderItem={({ item, index }) => (
                                            item === null || item === "" ?
                                                (
                                                    <View key={index} style={styles.image} >
                                                        <TouchableOpacity onPress={uploadImageCamera}>
                                                            <View style={{ position: 'absolute', top: 3, left: 1 }}>
                                                                <Text style={{ color: COLORS.gray }}>{index + 1}</Text>
                                                            </View>
                                                            <FontAwesome style={{ marginTop: 20, marginHorizontal: 20 }} name="camera" size={26} color={COLORS.gray} />
                                                            <Text style={{ marginTop: 10, color: COLORS.gray, textAlign: 'center' }}>Ảnh</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                )
                                                :
                                                (
                                                    <View key={index}>
                                                        <ImageBackground
                                                            source={{ uri: item }}
                                                            style={styles.image} >
                                                            <TouchableOpacity onPress={() => removeImage(index)}>
                                                                <FontAwesome6 style={styles.xmark} name="xmark" size={20} color="white" />
                                                            </TouchableOpacity>
                                                        </ImageBackground>
                                                    </View>
                                                )
                                        )}
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
                            {/* Upload Image by gallery and Camera Option */}
                            <View style={styles.selectOption}>
                                {/* Upload Image by gallery */}
                                <TouchableOpacity
                                    onPress={onGalleryMultiplePress}
                                    style={[styles.uploadContainer, { marginLeft: 20 }]}>
                                    <Image
                                        style={styles.imageSelect}
                                        source={require('../../../assets/images/gallery.png')}
                                    />
                                    <Text style={{ fontSize: 16 }}>Thư viện</Text>
                                </TouchableOpacity>
                                {/* Upload Image by Camera */}
                                <TouchableOpacity
                                    onPress={uploadImageCamera}
                                    style={styles.uploadContainer}>
                                    <Image
                                        style={styles.imageSelect}
                                        source={require('../../../assets/images/camera.png')}
                                    />
                                    <Text style={{ fontSize: 16 }}>Chụp ảnh</Text>
                                </TouchableOpacity>
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
                                        <Text style={styles.rightText}>{formattedFee} VND</Text>
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


