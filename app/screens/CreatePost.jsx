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
  Alert,
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
import { createPost_Level_1, createPost_Level_2 } from "../api/post";
import { getAllCategoriesByBrandLineName } from "../api/category";
import { getAllBrandLinesByBrandName } from "../api/brandLine";
import * as ImagePicker from "expo-image-picker";
import Button from "../components/Button";
import { Video } from 'expo-av';
import Checkbox from 'expo-checkbox';

const CreatePost = () => {
  const navigation = useNavigation();

  const [listBrandName, setListBrandName] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [listBrandLines, setListBrandLines] = useState([]);

  const [images, setImages] = useState([
    { index: '1', label: 'Overall picture', name: 'Overallpicture', logoUrl: require('../../assets/images/bag/overall_picture.png'), value: '' },
    { index: '2', label: 'Brand logo', name: 'Brandlogo', logoUrl: require('../../assets/images/bag/brand_logo.png'), value: '' },
    { index: '3', label: 'Inside label', name: 'Insidelabel', logoUrl: require('../../assets/images/bag/inside_label.png'), value: '' },
    { index: '4', label: 'Hardware engravings', name: 'Hardwareengravings', logoUrl: require('../../assets/images/bag/hardware_engravings.png'), value: '' },
    { index: '5', label: 'Serial number', name: 'Serialnumber', logoUrl: require('../../assets/images/bag/serial_number.png'), value: '' },
    { index: '6', label: 'Made in label', name: 'Madeinlabel', logoUrl: require('../../assets/images/bag/made_in_label.png'), value: '' },
    { index: '7', label: 'QR code label', name: 'QRcodelabel', logoUrl: require('../../assets/images/bag/qr_code_label.png'), value: '' },
    { index: '8', label: 'Hologram label', name: 'Hologramlabel', logoUrl: require('../../assets/images/bag/hologram_label.png'), value: '' },
    { index: '9', label: 'Zipper head (front)', name: 'Zipperhead(front)', logoUrl: require('../../assets/images/bag/zipper_head_front.png'), value: '' },
    { index: '10', label: 'Zipper head (back)', name: 'Zipperhead(back)', logoUrl: require('../../assets/images/bag/zipper_head_back.png'), value: '' },
    { index: '11', label: 'Button', name: 'Button', logoUrl: require('../../assets/images/bag/button.png'), value: '' },
    { index: '12', label: 'Shoulder strap clasp', name: 'Shoulderstrapclasp', logoUrl: require('../../assets/images/bag/shoulder_strap_clasp.png'), value: '' },
    { index: '13', label: 'Logo texture close up', name: 'Logotexturecloseup', logoUrl: require('../../assets/images/bag/logo_texture_close_up_macro_image.png'), value: '' },
    { index: '14', label: 'Authenticity card', name: 'Authenticitycard', logoUrl: require('../../assets/images/bag/authenticity_card.png'), value: '' },
    { index: '15', label: 'Dust bag', name: 'Dustbag', logoUrl: require('../../assets/images/bag/dust_bag.png'), value: '' },
    { index: '16', label: '1st optional photo', name: '1stoptionalphoto', logoUrl: require('../../assets/images/bag/1st_optional_photo.png'), value: '' },
    { index: '17', label: '2nd optional photo', name: '2ndoptionalphoto', logoUrl: require('../../assets/images/bag/2nd_optional_photo.png'), value: '' },
  ]);
  const [invoice, setInvoice] = useState("");
  const [videoUri, setVideoUri] = useState("");

  const [isMuted, setIsMuted] = useState(false);

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedBrandLine, setSelectedBrandLine] = useState(null);

  const [loader, setLoader] = useState(false);

  const [isChecked_2, setChecked_2] = useState(false);
  const [isChecked_3, setChecked_3] = useState(false);
  const FEE = 0;

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

  const validateImages = () => {
    // check điều kiện khi 4 ảnh đầu có giá trị = ''
    for (let i = 0; i < 4; i++) {
      if (images[i].value === '') {
        return false;
      }
    }
    // check điều kiện khi người dùng bấm vào xác thực level 2 và ảnh hóa đơn + video bị lỗi
    if (isChecked_2) {
      if (invoice === '' || videoUri === '') {
        return false;
      }
    }
    return true;
  };

  const handleCreatePost = async (values, actions) => {
    try {
      if (validateImages() === true) {
        // Handle form submission here
        let { title, brandName, productName, brandLineName, condition, category, exteriorMaterial,
          interiorMaterial, size, width, height, length, referenceCode, manufactureYear, color, accessories, dateCode,
          serialNumber, purchasedPlace, description, price,
          // dataShippingMethod, dataShippingTime, shippingAddress, fee, saleProfit,
        } = values;

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
        images.forEach((image, index) => {
          if (image.value) {
            const fileName = `${image.name}.jpg`;
            formData.append('productImages', {
              uri: image.value,
              type: 'image/jpeg',
              name: fileName,
            });
          }
        });

        if (invoice) {
          const invoiceFileName = invoice.split('/').pop();
          formData.append('originalReceiptProof', {
            uri: invoice,
            type: 'image/jpeg',
            name: invoiceFileName,
          });
        }

        if (videoUri) {
          const videoFileName = videoUri.split('/').pop();
          formData.append('productVideo', {
            uri: videoUri,
            type: 'video/mp4',
            name: videoFileName,
          });
        }

        if (invoice && videoUri) {
          await createPost_Level_2(formData)
        } else {
          await createPost_Level_1(formData);
        }
        navigation.navigate('Home')
        setImages([
          { index: '1', label: 'Overall picture', name: 'Overallpicture', logoUrl: require('../../assets/images/bag/overall_picture.png'), value: '' },
          { index: '2', label: 'Brand logo', name: 'Brandlogo', logoUrl: require('../../assets/images/bag/brand_logo.png'), value: '' },
          { index: '3', label: 'Inside label', name: 'Insidelabel', logoUrl: require('../../assets/images/bag/inside_label.png'), value: '' },
          { index: '4', label: 'Hardware engravings', name: 'Hardwareengravings', logoUrl: require('../../assets/images/bag/hardware_engravings.png'), value: '' },
          { index: '5', label: 'Serial number', name: 'Serialnumber', logoUrl: require('../../assets/images/bag/serial_number.png'), value: '' },
          { index: '6', label: 'Made in label', name: 'Madeinlabel', logoUrl: require('../../assets/images/bag/made_in_label.png'), value: '' },
          { index: '7', label: 'QR code label', name: 'QRcodelabel', logoUrl: require('../../assets/images/bag/qr_code_label.png'), value: '' },
          { index: '8', label: 'Hologram label', name: 'Hologramlabel', logoUrl: require('../../assets/images/bag/hologram_label.png'), value: '' },
          { index: '9', label: 'Zipper head (front)', name: 'Zipperhead(front)', logoUrl: require('../../assets/images/bag/zipper_head_front.png'), value: '' },
          { index: '10', label: 'Zipper head (back)', name: 'Zipperhead(back)', logoUrl: require('../../assets/images/bag/zipper_head_back.png'), value: '' },
          { index: '11', label: 'Button', name: 'Button', logoUrl: require('../../assets/images/bag/button.png'), value: '' },
          { index: '12', label: 'Shoulder strap clasp', name: 'Shoulderstrapclasp', logoUrl: require('../../assets/images/bag/shoulder_strap_clasp.png'), value: '' },
          { index: '13', label: 'Logo texture close up', name: 'Logotexturecloseup', logoUrl: require('../../assets/images/bag/logo_texture_close_up_macro_image.png'), value: '' },
          { index: '14', label: 'Authenticity card', name: 'Authenticitycard', logoUrl: require('../../assets/images/bag/authenticity_card.png'), value: '' },
          { index: '15', label: 'Dust bag', name: 'Dustbag', logoUrl: require('../../assets/images/bag/dust_bag.png'), value: '' },
          { index: '16', label: '1st optional photo', name: '1stoptionalphoto', logoUrl: require('../../assets/images/bag/1st_optional_photo.png'), value: '' },
          { index: '17', label: '2nd optional photo', name: '2ndoptionalphoto', logoUrl: require('../../assets/images/bag/2nd_optional_photo.png'), value: '' },
        ]);
        setInvoice("");
        setVideoUri("")
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
      } else {
        if (isChecked_2) {
          if (!invoice && !videoUri) {
            Alert.alert(
              "Thiếu thông tin",
              "Hãy cập nhật ảnh hóa đơn và video",
              [{ text: "OK" }]
            );
          } else if (!invoice) {
            Alert.alert(
              "Thiếu thông tin",
              "Hãy cập nhật ảnh hóa đơn để xác thực level 2",
              [{ text: "OK" }]
            );
          } else if (!videoUri) {
            Alert.alert(
              "Thiếu thông tin",
              "Hãy cập nhật video để xác thực level 2",
              [{ text: "OK" }]
            );
          }
        } else {
          Alert.alert(
            "Thiếu thông tin",
            "Hãy cập nhật 4 ảnh đầu tiên có dấu *",
            [{ text: "OK" }]
          );
        }
      }
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

  const renderImages = ({ item, index }) => {
    return (
      item.value === null || item.value === "" ?
        (
          <View key={index}>
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
                <View style={styles.imageUpload}>
                  <FlatList
                    data={images}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal
                    renderItem={renderImages}
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

              {/* Check box */}
              <View style={styles.checkboxContainer}>
                <View style={styles.checkboxView}>
                  <Checkbox
                    value={isChecked_2}
                    onValueChange={setChecked_2}
                  />
                  <View style={{ height: '70%' }}>
                    <Text style={styles.textVerified}>Verified Level 2</Text>
                  </View>
                </View>

                <View style={styles.checkboxView}>
                  <Checkbox
                    value={isChecked_3}
                    onValueChange={setChecked_3}
                  />
                  <View style={{ height: '70%' }}>
                    <Text style={styles.textVerified}>Ticket Box Check Authentic</Text>
                  </View>
                </View>
              </View>

              {isChecked_2 ?
                (
                  <View>
                    <View View style={styles.selectOption}>
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
                        )
                      }
                    </View>
                    <View style={styles.shadow}></View>
                  </View>
                )
                :
                (
                  <View></View>
                )
              }

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
                    <Text style={{ fontSize: 16 }}>Phí Sàn: <Text style={{ color: 'blue' }}>Miễn phí</Text></Text>
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
    </ScrollView >
  );
}

export default CreatePost;
