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
  Button,
} from "react-native";
import { FontAwesome, AntDesign, MaterialIcons, FontAwesome6, Ionicons } from '@expo/vector-icons';
import React, { useState, useRef, useContext, useEffect } from "react";
import { NavigationContaine, useNavigation } from '@react-navigation/native';
import { COLORS } from "../../constants/theme";
import styles from './createPostDetails.style';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Dropdown } from 'react-native-element-dropdown';
import { callFetchListBrands } from "../../api/brand";
import { createPost } from "../../api/post";
import { getAllCategories, getAllCategoriesByBrandLineName } from "../../api/category";
import { getAllBrandLines, getAllBrandLinesByBrandName } from "../../api/brandLine";
import * as ImagePicker from "expo-image-picker";

const CreatePostDetail = () => {

  const navigation = useNavigation();

  const [listBrandName, setListBrandName] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [listBrandLines, setListBrandLines] = useState([]);

  const [images, setImages] = useState([null, null, null, null, null]);

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedBrandLine, setSelectedBrandLine] = useState(null);

  const [loader, setLoader] = useState(false);

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
      const brand = res?.data?.result.map(item => {
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
    brandName: Yup.string().required('Hãy chọn thương hiệu'),
    brandLineName: Yup.string().required('Hãy chọn dòng thương hiệu'),
    condition: Yup.string().required('Hãy chọn trạng thái sản phẩm'),
    category: Yup.string().required('Hãy chọn thể loại'),
  });

  const dataProductCondition = [
    { label: 'BRAND_NEW', value: 'BRAND_NEW' },
    { label: 'EXCELLENT', value: 'EXCELLENT' },
    { label: 'VERY_GOOD', value: 'VERY_GOOD' },
    { label: 'GOOD', value: 'GOOD' },
    { label: 'FAIR', value: 'FAIR' },
  ];

  const dataSize = [
    { label: 'small', value: 'small' },
    { label: 'normal', value: 'normal' },
    { label: 'big', value: 'big' },
  ];

  const handleCreatePost = async (values, actions) => {
    try {
      let { title, brandName, productName, brandLineName, condition, category, exteriorMaterial,
        interiorMaterial, size, width, height, length, referenceCode, manufactureYear, color, accessories, dateCode,
        serialNumber, purchasedPlace, story, description, price,
        // dataShippingMethod, dataShippingTime, shippingAddress, fee, saleProfit,
      } = values;
      console.log(values);
      const formData = new FormData();

      const request = {
        title: title,
        description: description,
        brand: { name: brandName },
        brandLine: { lineName: brandLineName },
        category: { categoryName: category },
        product: {
          name: productName,
          price: price,
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
          story: story,
        },
        condition: condition,
      };

      formData.append('request', JSON.stringify(request));
      console.log('>>> check images: ', images);
      images.forEach((image, index) => {
        const fileName = image.split('/').pop();
        formData.append('productImage', {
          uri: image,
          type: 'image/jpeg',
          name: fileName,
        });
      });

      await createPost(formData);
      navigation.navigate('Home')
      setImages([]);
      // actions.resetForm({
      //   title: '',
      //   brandName: '',
      //   productName: '',
      //   brandLineName: '',
      //   condition: '',
      //   category: '',
      //   exteriorMaterial: '',
      //   interiorMaterial: '',
      //   size: '',
      //   width: '',
      //   height: '',
      //   length: '',
      //   referenceCode: '',
      //   manufactureYear: '',
      //   color: '',
      //   accessories: '',
      //   dateCode: '',
      //   serialNumber: '',
      //   purchasedPlace: '',
      //   story: '',
      //   description: '',
      //   price: '',
      // })

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

  const uploadImageCamera = async (index) => {
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

  return (
    <ScrollView style={{ backgroundColor: COLORS.white }}>
      <Formik
        initialValues={{
          title: '', productName: '', brandName: '', brandLineName: '', condition: '',
          category: '', exteriorMaterial: '', interiorMaterial: '', size: '', width: '',
          height: '', length: '', referenceCode: '', manufactureYear: '', color: '',
          accessories: '', dateCode: '', serialNumber: '', purchasedPlace: '', story: '', description: '', price: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleCreatePost}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, setFieldTouched }) => (
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
            <FontAwesome6 name="xmark" size={30} color={COLORS.primary} />
              <Text style={[styles.textName, { marginLeft: 50 }]}>Thông Tin Sản Phẩm</Text>
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
                          <TouchableOpacity onPress={() => uploadImageCamera(index)}>
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
                  <AntDesign name="questioncircle" size={20} color="black" />
                  <Text>Quy tắc</Text>
                </TouchableOpacity>

              </View>
            </View>
            <View style={styles.shadow}></View>

            {/* Product Information */}
            <View style={styles.productContainer}>
              {/* Title */}
              <View style={{ marginHorizontal: 5 }}>
                <View>
                  <Text style={{ fontSize: 16 }}>Tiêu đề sản phẩm</Text>
                </View>
                <View style={{ height: 40 }}>
                  <TextInput
                    value={values.title}
                    placeholder="Nhập tiêu đề sản phẩm"
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
              </View>
              <View style={styles.shadow}></View>

              {/* Tên sản phẩm */}
              <View style={{ marginHorizontal: 5 }}>
                <View>
                  <Text style={{ fontSize: 16 }}>Tên sản phẩm</Text>
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
              </View>
              <View style={styles.shadow}></View>

              {/* Brand Name */}
              <View style={styles.dropdownContainer}>
                <Text style={styles.label}>Nhãn Hàng</Text>
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
                {touched.brandLineName && errors.brandLineName && (
                  <Text style={styles.errorText}>{errors.brandLineName}</Text>
                )}
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
                {touched.category && errors.category && (
                  <Text style={styles.errorText}>{errors.category}</Text>
                )}
              </View>
              <View style={styles.shadow}></View>

              {/* Trạng Thái Sản Phẩm */}
              <View style={styles.dropdownContainer}>
                <Text style={styles.label}>Trạng Thái Sản Phẩm</Text>
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
                <View style={[styles.textCenter, { width: "65%" }]}>
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
                  <Text style={{ fontSize: 16 }}>Màu Sắc</Text>
                </View>
                <View style={[styles.textCenter, { width: "80%" }]}>
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
                  <Text style={{ fontSize: 16 }}>Phụ kiện sản phẩm</Text>
                </View>
                <View style={[styles.textCenter, { width: "65%" }]}>
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
                  <Text style={{ fontSize: 16 }}>Date Code</Text>
                </View>
                <View style={[styles.textCenter, { width: "70%" }]}>
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
                  <Text style={{ fontSize: 16 }}>Số sê-ri</Text>
                </View>
                <View style={[styles.textCenter, { width: "80%" }]}>
                  <TextInput
                    value={values.serialNumber}
                    placeholder="VD: #0175Susan"
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
                  <Text style={{ fontSize: 16 }}>Nơi Mua Sản Phẩm</Text>
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

              {/* Story */}
              <View style={{ marginHorizontal: 5 }}>
                <View>
                  <Text style={{ fontSize: 16 }}>Story</Text>
                </View>
                <View style={{ height: 40 }}>
                  <TextInput
                    value={values.story}
                    placeholder="Story sản phẩm"
                    style={styles.inputProduct}
                    onFocus={() => {
                      setFieldTouched("story");
                    }}
                    onBlur={() => {
                      setFieldTouched("story", "");
                    }}
                    onChangeText={handleChange("story")}
                    autoCorrect={false}
                  />
                </View>
              </View>
              <View style={styles.shadow}></View>

            </View>

            {/* Product Detail */}
            <View style={styles.productDetailContainer}>
              <View style={styles.productDetailView}>
                <View style={{ width: "40%", borderRightWidth: 1, borderRightColor: COLORS.gray2 }}>
                  <Text>Thiết lập sản phẩm sẽ được đăng trong thông tin sản phẩm, giúp người mua tìm thấy dễ dàng hơn</Text>
                </View>
                <View style={{ width: "60%", flexDirection: 'row' }}>
                  <View style={{ width: "50%", paddingHorizontal: 5, paddingTop: 20 }}>
                    <Image
                      style={{ width: "100%", height: "80%" }}
                      source={{ uri: 'https://gostyle.vn/wp-content/uploads/2020/10/tui-xach-nu-chinh-hang-louisvuitton-M45165-gostyle4.jpg' }}
                    // key={item.id}
                    />
                  </View>
                  <View style={{ width: "50%", paddingHorizontal: 5, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Túi xách Gucci hàng like new xinh xắn không còn gì để chê</Text>
                  </View>
                </View>
              </View>
              <View style={{ marginTop: 10, marginLeft: 10 }}>
                <Text style={{ fontSize: 16, fontFamily: 'bold' }}>Chi Tiết Sản Phẩm</Text>
              </View>
            </View>

            {/* Product Description */}
            <View style={styles.productDescriptionContainer}>
              <View style={{ marginVertical: 10 }}>
                <Text style={{ fontSize: 16, fontFamily: 'bold' }}>Mô Tả Sản Phẩm</Text>
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
                <Text style={{ fontSize: 16, fontFamily: 'bold' }}>Thông Tin Vận Chuyển</Text>
              </View>
              <TouchableOpacity
                onPress={() => console.warn('Quy tắc')}
                style={{ flexDirection: 'row', marginTop: 10 }}>
                <AntDesign
                  name="questioncircle"
                  size={20}
                  color="black"
                />
                <Text style={{ marginLeft: 10, fontSize: 16 }}>Quy tắc</Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginVertical: 20 }}>
              {/* price */}
              <View style={styles.viewContainer}>
                <View style={styles.textCenter}>
                  <Text style={{ fontSize: 16 }}>Giá Tiền:</Text>
                </View>
                <View style={[styles.textCenter, { width: "75%" }]}>
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
              {touched.price && errors.price && <Text style={styles.errorMessage}>{errors.price}</Text>}
              <View style={styles.shadow}></View>
            </View>

            <View style={{ marginTop: 50 }}>
              <Button
                onPress={handleSubmit}
                title="Submit"
              />
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}


export default CreatePostDetail;
