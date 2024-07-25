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
import { COLORS } from "../constants/theme";
import styles from '../screens/post/createPostDetails.style';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Dropdown } from 'react-native-element-dropdown';
import { callFetchListBrands } from "../api/brand";
import { createPost } from "../api/post";
import { getAllCategoriesByBrandLineName } from "../api/category";
import { getAllBrandLinesByBrandName } from "../api/brandLine";
import * as ImagePicker from "expo-image-picker";
import Button from "../components/Button";
import { Video } from 'expo-av';

const CreatePost = () => {

  const navigation = useNavigation();

  const [listBrandName, setListBrandName] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [listBrandLines, setListBrandLines] = useState([]);

  const [images, setImages] = useState([
    { id: '1', name: 'Overall picture (upload)', logoUrl: require('../../assets/images/bag/overall_picture.png'), value: '' },
    { id: '2', name: 'Brand logo (upload)', logoUrl: require('../../assets/images/bag/brand_logo.png'), value: '' },
    { id: '3', name: 'Inside label (upload)', logoUrl: require('../../assets/images/bag/inside_label.png'), value: '' },
    { id: '4', name: 'Hardware engravings (upload)', logoUrl: require('../../assets/images/bag/hardware_engravings.png'), value: '' },
    { id: '5', name: 'Serial number (upload)', logoUrl: require('../../assets/images/bag/serial_number.png'), value: '' },
    { id: '6', name: 'Made in label (upload)', logoUrl: require('../../assets/images/bag/made_in_label.png'), value: '' },
    { id: '7', name: 'QR code label (upload)', logoUrl: require('../../assets/images/bag/qr_code_label.png'), value: '' },
    { id: '8', name: 'Hologram label (upload)', logoUrl: require('../../assets/images/bag/hologram_label.png'), value: '' },
    { id: '9', name: 'Zipper head (front) (upload)', logoUrl: require('../../assets/images/bag/zipper_head_front.png'), value: '' },
    { id: '10', name: 'Zipper head (back) (upload)', logoUrl: require('../../assets/images/bag/zipper_head_back.png'), value: '' },
    { id: '11', name: 'Button (upload)', logoUrl: require('../../assets/images/bag/button.png'), value: '' },
    { id: '12', name: 'Shoulder strap clasp (upload)', logoUrl: require('../../assets/images/bag/shoulder_strap_clasp.png'), value: '' },
    { id: '13', name: 'Logo texture close up (upload)', logoUrl: require('../../assets/images/bag/logo_texture_close_up_macro_image.png'), value: '' },
    { id: '14', name: 'Authenticity card (upload)', logoUrl: require('../../assets/images/bag/authenticity_card.png'), value: '' },
    { id: '15', name: 'Dust bag (upload)', logoUrl: require('../../assets/images/bag/dust_bag.png'), value: '' },
    { id: '16', name: '1st optional photo (upload)', logoUrl: require('../../assets/images/bag/1st_optional_photo.png'), value: '' },
    { id: '17', name: '2nd optional photo (upload)', logoUrl: require('../../assets/images/bag/2nd_optional_photo.png'), value: '' },
  ]);
  const [invoice, setInvoice] = useState("");
  const [videoUri, setVideoUri] = useState("");

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedBrandLine, setSelectedBrandLine] = useState(null);

  const [loader, setLoader] = useState(false);

  const FEE = 500000;

  useEffect(() => {
    fetchAllBrands();
  }, [])

  //Get Brand Lines by brandName
  useEffect(() => {
    if (selectedBrand) {
      fetchAllBrandLines(selectedBrand);
    }
  }, [selectedBrand])

  //Get Categories by Brand Line Name
  useEffect(() => {
    if (selectedBrandLine) {
      fetchAllCategories(selectedBrandLine);
    }
  }, [selectedBrandLine])

  const fetchAllBrands = async () => {
    setLoader(true);
    const res = await callFetchListBrands();
    if (res && res.data && res?.data?.result) {
      const brand = res?.data?.result?.brands.map(item => {
        return {
          label: item.name,
          value: item.name
        }
      })
      setListBrandName(brand)
    }
    setLoader(false);
  }

  const fetchAllCategories = async (brandLineName) => {
    setLoader(true);
    let query = `brandLineName=${brandLineName}`;
    const res = await getAllCategoriesByBrandLineName(query);

    if (res && res.data && res?.data?.result) {
      const category = res?.data?.result.map(item => {
        return {
          label: item.categoryName,
          value: item.categoryName,
        }
      })
      setListCategory(category)
    }
    setLoader(false);
  }

  const fetchAllBrandLines = async (brandName) => {
    setLoader(true);
    let query = `brandName=${brandName}`;
    const res = await getAllBrandLinesByBrandName(query);

    if (res && res.data && res?.data?.result) {
      const brandLine = res?.data?.result.map(item => {
        return {
          label: item.lineName,
          value: item.lineName
        }
      })
      setListBrandLines(brandLine)
    }
    setLoader(false);
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Hãy nhập tiêu đề bài đăng'),
    productName: Yup.string().required('Hãy nhập tên sản phẩm'),
    brandName: Yup.string().required('Hãy chọn thương hiệu'),
    condition: Yup.string().required('Hãy chọn trạng thái sản phẩm'),
    //brandLineName: Yup.string().required('Hãy chọn dòng thương hiệu'),
    //category: Yup.string().required('Hãy chọn thể loại'),
    price: Yup.string().required('Hãy nhập giá tiền'),
  });

  const dataProductCondition = [
    { label: 'BRAND_NEW', value: 'BRAND_NEW' },
    { label: 'EXCELLENT', value: 'EXCELLENT' },
    { label: 'VERY_GOOD', value: 'VERY_GOOD' },
    { label: 'GOOD', value: 'GOOD' },
    { label: 'FAIR', value: 'FAIR' },
  ];

  const dataSize = [
    { label: 'Small', value: 'Small' },
    { label: 'Media', value: 'Media' },
    { label: 'Large', value: 'Large' },
    { label: 'Extra Large', value: 'Extra Large' },
  ];

  const handleCreatePost = async (values, actions) => {
    try {
      let { title, brandName, productName, brandLineName, condition, category, exteriorMaterial,
        interiorMaterial, size, width, height, length, referenceCode, manufactureYear, color, accessories, dateCode,
        serialNumber, purchasedPlace, description, price,
        // dataShippingMethod, dataShippingTime, shippingAddress, fee, saleProfit,
      } = values;
      console.log(values);

      const calculatedPrice = parseInt(values.price, 10) - FEE;

      const formData = new FormData();

      const request = {
        title: title,
        description: description,
        brand: { name: brandName },
        brandLine: { lineName: brandLineName },
        category: { categoryName: category },
        product: {
          name: productName,
          price: calculatedPrice,
          color: color,
          size: size,
          width: width,
          height: height,
          length: length,
          referenceCode: referenceCode,
          manufactureYear: manufactureYear,
          exteriorMaterial: exteriorMaterial,
          interiorMaterial: interiorMaterial,
          accessories: accessories,
          dateCode: dateCode,
          serialNumber: serialNumber,
          purchasedPlace: purchasedPlace,
          story: '',
        },
        condition: condition,
      };

      formData.append('request', JSON.stringify(request));
      console.log('>>> check images: ', images);
      images.forEach((image, index) => {
        if (image.value) {
          const fileName = image.split('/').pop();
          formData.append('productImage', {
            uri: image.value,
            type: 'image/jpeg',
            name: fileName,
          });
        }
      });

      await createPost(formData);
      navigation.navigate('Home')
      setImages([
        { id: '1', name: 'Overall picture (upload)', logoUrl: require('../../assets/images/bag/overall_picture.png'), value: '' },
        { id: '2', name: 'Brand logo (upload)', logoUrl: require('../../assets/images/bag/brand_logo.png'), value: '' },
        { id: '3', name: 'Inside label (upload)', logoUrl: require('../../assets/images/bag/inside_label.png'), value: '' },
        { id: '4', name: 'Hardware engravings (upload)', logoUrl: require('../../assets/images/bag/hardware_engravings.png'), value: '' },
        { id: '5', name: 'Serial number (upload)', logoUrl: require('../../assets/images/bag/serial_number.png'), value: '' },
        { id: '6', name: 'Made in label (upload)', logoUrl: require('../../assets/images/bag/made_in_label.png'), value: '' },
        { id: '7', name: 'QR code label (upload)', logoUrl: require('../../assets/images/bag/qr_code_label.png'), value: '' },
        { id: '8', name: 'Hologram label (upload)', logoUrl: require('../../assets/images/bag/hologram_label.png'), value: '' },
        { id: '9', name: 'Zipper head (front) (upload)', logoUrl: require('../../assets/images/bag/zipper_head_front.png'), value: '' },
        { id: '10', name: 'Zipper head (back) (upload)', logoUrl: require('../../assets/images/bag/zipper_head_back.png'), value: '' },
        { id: '11', name: 'Button (upload)', logoUrl: require('../../assets/images/bag/button.png'), value: '' },
        { id: '12', name: 'Shoulder strap clasp (upload)', logoUrl: require('../../assets/images/bag/shoulder_strap_clasp.png'), value: '' },
        { id: '13', name: 'Logo texture close up (upload)', logoUrl: require('../../assets/images/bag/logo_texture_close_up_macro_image.png'), value: '' },
        { id: '14', name: 'Authenticity card (upload)', logoUrl: require('../../assets/images/bag/authenticity_card.png'), value: '' },
        { id: '15', name: 'Dust bag (upload)', logoUrl: require('../../assets/images/bag/dust_bag.png'), value: '' },
        { id: '16', name: '1st optional photo (upload)', logoUrl: require('../../assets/images/bag/1st_optional_photo.png'), value: '' },
        { id: '17', name: '2nd optional photo (upload)', logoUrl: require('../../assets/images/bag/2nd_optional_photo.png'), value: '' },
      ]);
      setInvoice("");
      actions.resetForm({
        title: '',
        brandName: '',
        productName: '',
        brandLineName: '',
        condition: '',
        category: '',
        exteriorMaterial: '',
        interiorMaterial: '',
        size: '',
        width: '',
        height: '',
        length: '',
        referenceCode: '',
        manufactureYear: '',
        color: '',
        accessories: '',
        dateCode: '',
        serialNumber: '',
        purchasedPlace: '',
        story: '',
        description: '',
        price: '',
      })

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
        //allowsMultipleSelection: true,  // allow multiple images
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <ScrollView style={{ backgroundColor: COLORS.white }}>
      <Formik
        initialValues={{
          title: '', productName: '', brandName: '', brandLineName: '', condition: '',
          category: '', exteriorMaterial: '', interiorMaterial: '', size: '', width: '',
          height: '', length: '', referenceCode: '', manufactureYear: '', color: '',
          accessories: '', dateCode: '', serialNumber: '', purchasedPlace: '', description: '', price: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleCreatePost}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, setFieldTouched }) => {

          const total = values.price ? parseInt(values.price, 10) - FEE : '';
          const formatFee = formatPrice(FEE);
          const formatTotal = formatPrice(total);

          return (
            <View style={styles.container}>
              {/* Header */}
              <View style={styles.headerContainer}>
                <Text style={[styles.textName, { marginLeft: 50 }]}>Thông Tin Bài Đăng</Text>
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
                      item.value === null || item.value === "" ?
                        (
                          <View key={index}>
                            <View key={index} style={styles.image} >
                              <TouchableOpacity onPress={() => uploadImageCamera(index)}>
                                <Image
                                  style={styles.imageBrandLogo}
                                  source={item.logoUrl}
                                />
                              </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.viewBrandLogo} onPress={() => onGalleryMultiplePress(index)}>
                              <Text style={styles.textBrandLogo}>{item.name}</Text>
                            </TouchableOpacity>
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
                              <Text style={styles.textBrandLogo}>{item.name}</Text>
                            </View>
                          </View>
                        )
                    )}
                  />

                </View>
                <View style={{ marginTop: 20, flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                  <Text style={{ fontSize: 16, color: '#6e6d6d' }}>Thông tin sản phẩm</Text>
                  <TouchableOpacity
                    style={{ flexDirection: "row", gap: 10 }}
                    onPress={() => console.warn("Quy Tắc")}
                  >
                    <AntDesign name="questioncircle" size={20} color="#6e6d6d" />
                    <Text style={{ color: '#6e6d6d' }}>Quy tắc</Text>
                  </TouchableOpacity>

                </View>
              </View>
              {/* Upload Image by gallery and Camera Option */}
              <View style={styles.selectOption}>
                {invoice === "" ? (
                  <TouchableOpacity
                    onPress={onGalleryUploadInvoice}
                    style={[styles.uploadContainer, { marginLeft: 10 }]}>
                    <Image
                      style={styles.imageSelect}
                      source={require('../../assets/images/gallery.png')}
                    />
                    <Text style={{ fontSize: 16 }}>Tải Ảnh Hóa Đơn</Text>
                  </TouchableOpacity>
                )
                  :
                  (
                    <View style={styles.uploadInvoiceContainer}>
                      <ImageBackground
                        style={styles.uploadInvoice}
                        source={{ uri: invoice }}
                      >
                        <TouchableOpacity onPress={() => removeInvoice()}>
                          <FontAwesome6 style={[styles.xmark, { left: 15, top: 5 }]} name="xmark" size={20} color="white" />
                        </TouchableOpacity>
                      </ImageBackground>
                    </View>
                  )
                }

                {videoUri === "" ? (
                  <TouchableOpacity
                    onPress={UploadVideoScreen}
                    style={styles.uploadContainer}>
                    <Image
                      style={styles.imageSelect}
                      source={require('../../assets/images/camera.png')}
                    />
                    <Text style={{ fontSize: 16 }}>Upload video</Text>
                  </TouchableOpacity>
                )
                  :
                  (
                    <View style={styles.uploadVideoContainer}>
                      <Video
                        source={{ uri: videoUri }}
                        style={{ width: '100%', height: '100%' }}
                        // style={styles.uploadVideo}
                        useNativeControls
                        resizeMode="cover"
                        isLooping
                      />
                      <TouchableOpacity onPress={() => removeVideo()} style={{ position: 'absolute', bottom: 10, left: 15 }}>
                        <FontAwesome6 name="xmark" size={20} color="white" />
                      </TouchableOpacity>
                    </View>
                  )
                }
              </View>
              <View style={styles.shadow}></View>

              {/* Product Information */}
              <View style={styles.productContainer}>
                {/* Title */}
                <View style={{ marginHorizontal: 5 }}>
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
                <View style={{ marginHorizontal: 5 }}>
                  <View>
                    <Text style={{ fontSize: 16 }}>Tên sản phẩm <Text style={{ color: 'red', fontSize: 18, fontFamily: 'bold' }}>*</Text></Text>
                  </View>
                  <View style={{ height: 40 }}>
                    <TextInput
                      value={values.productName}
                      placeholder="Nhập tên sản phẩm"
                      style={styles.inputProduct}
                      onFocus={() => {
                        setFieldTouched("productName");
                      }}
                      onBlur={() => {
                        setFieldTouched("productName", "");
                      }}
                      onChangeText={handleChange("productName")}
                      autoCorrect={false}
                    />
                  </View>
                  {touched.productName && errors.productName && (
                    <Text style={styles.errorText}>{errors.productName}</Text>
                  )}
                </View>
                <View style={styles.shadow}></View>

                {/* Brand Name */}
                <View style={styles.dropdownContainer}>
                  <Text style={styles.label}>Nhãn Hàng <Text style={{ color: 'red', fontSize: 18, fontFamily: 'bold' }}>*</Text></Text>
                  <Dropdown
                    style={styles.dropdown}
                    data={listBrandName}
                    labelField="label"
                    valueField="value"
                    value={values.brandName}
                    onChange={(item) => {
                      setFieldValue('brandName', item.value);
                      setSelectedBrand(item.value);
                    }}
                  />
                  {touched.brandName && errors.brandName && (
                    <Text style={styles.errorText}>{errors.brandName}</Text>
                  )}
                </View>
                <View style={styles.shadow}></View>

                {/* Brand Line */}
                <View style={styles.dropdownContainer}>
                  <Text style={styles.label}>Dòng Thương Hiệu</Text>
                  <Dropdown
                    style={styles.dropdown}
                    data={listBrandLines}
                    labelField="label"
                    valueField="value"
                    value={values.brandLineName}
                    onChange={(item) => {
                      setFieldValue('brandLineName', item.value);
                      setSelectedBrandLine(item.value);
                    }}
                  />
                </View>
                <View style={styles.shadow}></View>

                {/* Category Name */}
                <View style={styles.dropdownContainer}>
                  <Text style={styles.label}>Thể Loại</Text>
                  <Dropdown
                    style={styles.dropdown}
                    data={listCategory}
                    labelField="label"
                    valueField="value"
                    value={values.category}
                    onChange={(item) => {
                      setFieldValue('category', item.value);
                    }}
                  />
                </View>
                <View style={styles.shadow}></View>

                {/* Trạng Thái Sản Phẩm */}
                <View style={styles.dropdownContainer}>
                  <Text style={styles.label}>Trạng Thái Sản Phẩm <Text style={{ color: 'red', fontSize: 18, fontFamily: 'bold' }}>*</Text></Text>
                  <Dropdown
                    style={styles.dropdown}
                    data={dataProductCondition}
                    labelField="label"
                    valueField="value"
                    value={values.condition}
                    onChange={(item) => {
                      setFieldValue('condition', item.value);
                    }}
                  />
                  {touched.condition && errors.condition && (
                    <Text style={styles.errorText}>{errors.condition}</Text>
                  )}
                </View>
                <View style={styles.shadow}></View>

                {/* Size */}
                <View style={styles.dropdownContainer}>
                  <Text style={styles.label}>Kích Thước</Text>
                  <Dropdown
                    style={styles.dropdown}
                    data={dataSize}
                    labelField="label"
                    valueField="value"
                    value={values.size}
                    onChange={(item) => {
                      setFieldValue('size', item.value);
                    }}
                  />
                  {touched.size && errors.size && (
                    <Text style={styles.errorText}>{errors.size}</Text>
                  )}
                </View>
                <View style={styles.shadow}></View>

                {/* Exterior Material */}
                <View style={styles.viewContainer}>
                  <View style={styles.textCenter}>
                    <Text style={{ fontSize: 16 }}>Chất Liệu Bên Ngoài: </Text>
                  </View>
                  <View style={[styles.textCenter, { width: "60%" }]}>
                    <TextInput
                      value={values.exteriorMaterial}
                      placeholder="Nhập chất liệu bên ngoài"
                      style={styles.inputProduct}
                      onFocus={() => {
                        setFieldTouched("exteriorMaterial");
                      }}
                      onBlur={() => {
                        setFieldTouched("exteriorMaterial", "");
                      }}
                      onChangeText={handleChange("exteriorMaterial")}
                      autoCorrect={false}
                    />
                  </View>
                </View>
                <View style={styles.shadow}></View>

                {/* Interior Material */}
                <View style={styles.viewContainer}>
                  <View style={styles.textCenter}>
                    <Text style={{ fontSize: 16 }}>Chất Liệu Bên Trong: </Text>
                  </View>
                  <View style={[styles.textCenter, { width: "60%" }]}>
                    <TextInput
                      value={values.interiorMaterial}
                      placeholder="Nhập chất liệu bên trong"
                      style={styles.inputProduct}
                      onFocus={() => {
                        setFieldTouched("interiorMaterial");
                      }}
                      onBlur={() => {
                        setFieldTouched("interiorMaterial", "");
                      }}
                      onChangeText={handleChange("interiorMaterial")}
                      autoCorrect={false}
                    />
                  </View>
                </View>
                <View style={styles.shadow}></View>

                {/* Width */}
                <View style={styles.viewContainer}>
                  <View style={styles.textCenter}>
                    <Text style={{ fontSize: 16 }}>Chiều Rộng: </Text>
                  </View>
                  <View style={styles.textCenter}>
                    <TextInput
                      keyboardType='number-pad'
                      value={values.width}
                      placeholder="Nhập chiều rộng sản phẩm"
                      style={styles.inputProduct}
                      onFocus={() => {
                        setFieldTouched("width");
                      }}
                      onBlur={() => {
                        setFieldTouched("width", "");
                      }}
                      onChangeText={handleChange("width")}
                      autoCorrect={false}
                    />
                  </View>
                </View>
                <View style={styles.shadow}></View>

                {/* Height */}
                <View style={styles.viewContainer}>
                  <View style={styles.textCenter}>
                    <Text style={{ fontSize: 16 }}>Chiều Cao: </Text>
                  </View>
                  <View style={styles.textCenter}>
                    <TextInput
                      keyboardType='number-pad'
                      value={values.height}
                      placeholder="Nhập chiều cao sản phẩm"
                      style={styles.inputProduct}
                      onFocus={() => {
                        setFieldTouched("height");
                      }}
                      onBlur={() => {
                        setFieldTouched("height", "");
                      }}
                      onChangeText={handleChange("height")}
                      autoCorrect={false}
                    />
                  </View>
                </View>
                <View style={styles.shadow}></View>

                {/* Length */}
                <View style={styles.viewContainer}>
                  <View style={styles.textCenter}>
                    <Text style={{ fontSize: 16 }}>Chiều Dài: </Text>
                  </View>
                  <View style={styles.textCenter}>
                    <TextInput
                      keyboardType='number-pad'
                      value={values.length}
                      placeholder="Nhập chiều dài sản phẩm"
                      style={styles.inputProduct}
                      onFocus={() => {
                        setFieldTouched("length");
                      }}
                      onBlur={() => {
                        setFieldTouched("length", "");
                      }}
                      onChangeText={handleChange("length")}
                      autoCorrect={false}
                    />
                  </View>
                </View>
                <View style={styles.shadow}></View>

                {/* Reference Code */}
                <View style={styles.viewContainer}>
                  <View style={styles.textCenter}>
                    <Text style={{ fontSize: 16 }}>Mã Tham Chiếu: </Text>
                  </View>
                  <View style={[styles.textCenter, { width: "67%" }]}>
                    <TextInput
                      value={values.referenceCode}
                      placeholder="Nhập mã tham chiếu sản phẩm"
                      style={styles.inputProduct}
                      onFocus={() => {
                        setFieldTouched("referenceCode");
                      }}
                      onBlur={() => {
                        setFieldTouched("referenceCode", "");
                      }}
                      onChangeText={handleChange("referenceCode")}
                      autoCorrect={false}
                    />
                  </View>
                </View>
                <View style={styles.shadow}></View>

                {/* manufactureYear */}
                <View style={styles.viewContainer}>
                  <View style={styles.textCenter}>
                    <Text style={{ fontSize: 16 }}>Năm Sản Xuất: </Text>
                  </View>
                  <View style={[styles.textCenter, { width: "65%" }]}>
                    <TextInput
                      keyboardType='number-pad'
                      value={values.manufactureYear}
                      placeholder="VD: 2024"
                      style={styles.inputProduct}
                      onFocus={() => {
                        setFieldTouched("manufactureYear");
                      }}
                      onBlur={() => {
                        setFieldTouched("manufactureYear", "");
                      }}
                      onChangeText={handleChange("manufactureYear")}
                      autoCorrect={false}
                    />
                  </View>
                </View>
                <View style={styles.shadow}></View>

                {/* color */}
                <View style={styles.viewContainer}>
                  <View style={styles.textCenter}>
                    <Text style={{ fontSize: 16 }}>Màu Sắc: </Text>
                  </View>
                  <View style={[styles.textCenter, { width: "78%" }]}>
                    <TextInput
                      value={values.color}
                      placeholder="Nhập màu sắc của sản phẩm"
                      style={styles.inputProduct}
                      onFocus={() => {
                        setFieldTouched("color");
                      }}
                      onBlur={() => {
                        setFieldTouched("color", "");
                      }}
                      onChangeText={handleChange("color")}
                      autoCorrect={false}
                    />
                  </View>
                </View>
                <View style={styles.shadow}></View>

                {/* accessories */}
                <View style={styles.viewContainer}>
                  <View style={styles.textCenter}>
                    <Text style={{ fontSize: 16 }}>Phụ kiện sản phẩm: </Text>
                  </View>
                  <View style={[styles.textCenter, { width: "62%" }]}>
                    <TextInput
                      value={values.accessories}
                      placeholder="Nhập phụ kiện (nếu có)"
                      style={styles.inputProduct}
                      onFocus={() => {
                        setFieldTouched("accessories");
                      }}
                      onBlur={() => {
                        setFieldTouched("accessories", "");
                      }}
                      onChangeText={handleChange("accessories")}
                      autoCorrect={false}
                    />
                  </View>
                </View>
                <View style={styles.shadow}></View>

                {/* Date Code */}
                <View style={styles.viewContainer}>
                  <View style={styles.textCenter}>
                    <Text style={{ fontSize: 16 }}>Date Code: </Text>
                  </View>
                  <View style={[styles.textCenter, { width: "75%" }]}>
                    <TextInput
                      value={values.dateCode}
                      placeholder="Nhập Date Code (nếu có)"
                      style={styles.inputProduct}
                      onFocus={() => {
                        setFieldTouched("dateCode");
                      }}
                      onBlur={() => {
                        setFieldTouched("dateCode", "");
                      }}
                      onChangeText={handleChange("dateCode")}
                      autoCorrect={false}
                    />
                  </View>
                </View>
                <View style={styles.shadow}></View>

                {/* Serial Number */}
                <View style={styles.viewContainer}>
                  <View style={styles.textCenter}>
                    <Text style={{ fontSize: 16 }}>Số sê-ri: </Text>
                  </View>
                  <View style={[styles.textCenter, { width: "80%" }]}>
                    <TextInput
                      value={values.serialNumber}
                      placeholder="VD: #Gucci-012"
                      style={styles.inputProduct}
                      onFocus={() => {
                        setFieldTouched("serialNumber");
                      }}
                      onBlur={() => {
                        setFieldTouched("serialNumber", "");
                      }}
                      onChangeText={handleChange("serialNumber")}
                      autoCorrect={false}
                    />
                  </View>
                </View>
                <View style={styles.shadow}></View>

                {/* Purchased Place */}
                <View style={styles.viewContainer}>
                  <View style={styles.textCenter}>
                    <Text style={{ fontSize: 16 }}>Nơi Mua Sản Phẩm: </Text>
                  </View>
                  <View style={[styles.textCenter, { width: "60%" }]}>
                    <TextInput
                      value={values.purchasedPlace}
                      placeholder="Nhập địa điểm"
                      style={styles.inputProduct}
                      onFocus={() => {
                        setFieldTouched("purchasedPlace");
                      }}
                      onBlur={() => {
                        setFieldTouched("purchasedPlace", "");
                      }}
                      onChangeText={handleChange("purchasedPlace")}
                      autoCorrect={false}
                    />
                  </View>
                </View>
                <View style={styles.shadow}></View>

              </View>

              {/* Product Description */}
              <View style={styles.productDescriptionContainer}>
                <View style={{ marginVertical: 10 }}>
                  <Text style={{ fontSize: 16 }}>Mô Tả Sản Phẩm</Text>
                </View>
                <View style={{ height: 40, width: "100%" }}>
                  <TextInput
                    value={values.description}
                    placeholder="Nhập mô tả sản phẩm"
                    style={styles.inputProduct}
                    onFocus={() => {
                      setFieldTouched("description");
                    }}
                    onBlur={() => {
                      setFieldTouched("description", "");
                    }}
                    onChangeText={handleChange("description")}
                    autoCorrect={false}
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

              <View style={{ marginVertical: 20 }}>
                {/* price */}
                <View style={styles.viewContainer}>
                  <View style={styles.textCenter}>
                    <Text style={{ fontSize: 16 }}>Giá Tiền: <Text style={{ color: 'red', fontSize: 18, fontFamily: 'bold' }}>* </Text></Text>
                  </View>
                  <View style={[styles.textCenter, { width: "70%" }]}>
                    <TextInput
                      keyboardType='number-pad'
                      value={values.price}
                      placeholder="Nhập giá tiền"
                      style={styles.inputProduct}
                      onFocus={() => {
                        setFieldTouched("price");
                      }}
                      onBlur={() => {
                        setFieldTouched("price", "");
                      }}
                      onChangeText={handleChange("price")}
                      autoCorrect={false}
                    />
                  </View>
                </View>
                {touched.price && errors.price && (
                  <Text style={[styles.errorText, { marginLeft: 5, marginTop: 5 }]}>{errors.price}</Text>
                )}
                <View style={styles.shadow}></View>

                {/* Fee */}
                <View style={styles.viewContainer}>
                  <View style={styles.textCenter}>
                    <Text style={{ fontSize: 16 }}>Phí Sàn: {formatFee}VND</Text>
                  </View>
                </View>
                <View style={styles.shadow}></View>
              </View>

              {/* Thành Tiền */}
              <View style={{ marginTop: -20 }}>
                <View style={styles.viewContainer}>
                  <View style={styles.textCenter}>
                    <Text style={{ fontSize: 16 }}>Tiền: <Text style={{ color: 'red', paddingLeft: 25 }}>{formatTotal}VND</Text></Text>
                  </View>

                </View>
                <View style={styles.shadow}></View>
              </View>

              {/* <View>
                <Button
                  title={"Đăng Bài"}
                  onPress={handleSubmit}
                  isValid={true}
                />
              </View> */}

              <View style={{ marginTop: 30 }}>
                <TouchableOpacity style={styles.button}
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonText}>Đăng Bài</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        }}
      </Formik>
    </ScrollView>
  );
}

export default CreatePost;
