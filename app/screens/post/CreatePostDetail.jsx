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
  Button,
} from "react-native";
import { FontAwesome, Ionicons, AntDesign, Feather } from '@expo/vector-icons';
import React, { useState, useRef, useContext, useEffect } from "react";
import { NavigationContaine, useNavigation } from '@react-navigation/native';
import { COLORS } from "../../constants/theme";
import styles from './createPostDetails.style';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Dropdown } from 'react-native-element-dropdown';
import { callFetchListBrands } from "../../api/brand";


const CreatePostDetail = () => {

  const navigation = useNavigation();
  const [listBrandName, setListBrandName] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    fetchAllBrand();
  }, [])

  const fetchAllBrand = async () => {
    setLoader(true);
    const res = await callFetchListBrands();
    console.log(res.data.result);
    if (res && res.data && res.data.result) {
      const brand = res.data.result.map(item => {
        return {
          label: item,
          value: item
        }
      })
      setListBrandName(brand)
    }
    setLoader(false);
  }


  const validationSchema = Yup.object().shape({
    brandName: Yup.string().required('Please select an option'),
    price: Yup.string().matches(/^\d{5}$/, 'Price có ít nhất 5 số').required('Vui lòng nhập Giá Tiền').typeError("Có vẻ như đó không phải là Giá Tiền"),
    fee: Yup.string().matches(/^\d{5}$/, 'Price có ít nhất 5 số').required('Vui lòng nhập Tiền Hoa Hồng').typeError("Có vẻ như đó không phải là Tiền Hoa Hồng"),
    saleProfit: Yup.string().matches(/^\d{5}$/, 'Price có ít nhất 5 số').required('Vui lòng nhập Lợi Nhuận').typeError("Có vẻ như đó không phải là Giá Tiền"),
  });

  const dataBrandName = [
    { label: 'Marmont 1', value: 'Marmont 1' },
    { label: 'Marmont 2', value: 'Marmont 2' },
    { label: 'Marmont 3', value: 'Marmont 3' },
  ];

  const dataProductCondition = [
    { label: 'used 1', value: 'used 1' },
    { label: 'used 2', value: 'used 2' },
    { label: 'used 3', value: 'used 3' },
  ];

  const dataCategory = [
    { label: 'HandBags 1', value: 'HandBags 1' },
    { label: 'HandBags 2', value: 'HandBags 2' },
    { label: 'HandBags 3', value: 'HandBags 3' },
  ];

  const dataSize = [
    { label: 'small', value: 'small' },
    { label: 'normal', value: 'normal' },
    { label: 'big', value: 'big' },
  ];

  const dataShippingMethod = [
    { label: 'J&T Express', value: 'J&T Express' },
    { label: 'Giao Hàng Nhanh', value: 'Giao Hàng Nhanh' },
    { label: 'Viettel Post', value: 'Viettel Post' },
    { label: 'Giao Hàng Tiết Kiệm', value: 'Giao Hàng Tiết Kiệm' },
  ];

  const dataShippingTime = [
    { label: '1 ngày', value: '1' },
    { label: '2 ngày', value: '2' },
    { label: '3 ngày', value: '3' },
    { label: '4 ngày', value: '4' },
  ];

  const handleCreatePost = async (values, actions) => {
    const { title, brandName, productName, brandLineName, condition, category, exteriorColor,
      interiorColor, size, width, height, length, referenceCode, manufactureYear, material, accessories, dateCode,
      serialNumber, purchasedPlace, story, description, price,
      // dataShippingMethod, dataShippingTime, shippingAddress, fee, saleProfit,
    } = values;


    console.log(values);
  }

  return (
    <ScrollView style={{ backgroundColor: COLORS.white }}>
      <Formik
        initialValues={{
          title: '', productName: '', brandName: '', brandLineName: '', condition: '',
          category: '', exteriorColor: '', interiorColor: '', size: '', width: '',
          height: '', length: '', referenceCode: '', manufactureYear: '', material: '',
          accessories: '', dateCode: '', serialNumber: '', purchasedPlace: '', story: '', description: '', price: '',
          // dataShippingMethod: '', dataShippingTime: '', shippingAddress: '', fee: '', saleProfit: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleCreatePost}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue, setFieldTouched }) => (
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerContainer}>
              <Feather onPress={() => navigation.goBack()} name="x" size={35} color={COLORS.primary} />
              <Text style={styles.textName}>Thông Tin Sản Phẩm</Text>
            </View>
            <View style={styles.shadow}>{/* Tạo Khoảng Trống */}</View>

            {/* Image Upload */}
            <View style={styles.imageUploadContaniner}>
              <View style={styles.imageUpload}>
                <View style={styles.image}>
                  <FontAwesome name="camera" size={20} color={COLORS.gray} />
                  <Text style={{ marginTop: 5, color: COLORS.gray }}>Ảnh</Text>
                </View>
                <View style={styles.image}></View>
                <View style={styles.image}></View>
                <View style={styles.image}></View>
                <View style={styles.image}></View>
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
                  placeholder="Chọn Nhãn Hàng"
                  value={values.brandName}
                  onChange={(item) => {
                    setFieldValue('brandName', item.value);
                  }}
                />
                {touched.brandName && errors.brandName && (
                  <Text style={styles.errorText}>{errors.brandName}</Text>
                )}
              </View>
              <View style={styles.shadow}></View>

              {/* Brand Line */}
              <View style={{ marginHorizontal: 5 }}>
                <View>
                  <Text style={{ fontSize: 16 }}>Dòng Thương Hiệu</Text>
                </View>
                <View style={{ height: 40 }}>
                  <TextInput
                    value={values.brandLineName}
                    placeholder="Nhập dòng thương hiệu"
                    style={styles.inputProduct}
                    onFocus={() => {
                      setFieldTouched("brandLineName");
                    }}
                    onBlur={() => {
                      setFieldTouched("brandLineName", "");
                    }}
                    onChangeText={handleChange("brandLineName")}
                    autoCorrect={false}
                  />
                </View>
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
                  placeholder="Trạng Thái Sản Phẩm"
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

              {/* Category Name */}
              <View style={styles.dropdownContainer}>
                <Text style={styles.label}>Thể Loại</Text>
                <Dropdown
                  style={styles.dropdown}
                  data={dataCategory}
                  labelField="label"
                  valueField="value"
                  placeholder="Thể Loại"
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

              {/* Exterior Color */}
              <View style={styles.viewContainer}>
                <View style={styles.textCenter}>
                  <Text style={{ fontSize: 16 }}>Màu Sắc Bên Ngoài: </Text>
                </View>
                <View style={[styles.textCenter, { width: "60%" }]}>
                  <TextInput
                    value={values.exteriorColor}
                    placeholder="Nhập màu sắc bên ngoài"
                    style={styles.inputProduct}
                    onFocus={() => {
                      setFieldTouched("exteriorColor");
                    }}
                    onBlur={() => {
                      setFieldTouched("exteriorColor", "");
                    }}
                    onChangeText={handleChange("exteriorColor")}
                    autoCorrect={false}
                  />
                </View>
              </View>
              <View style={styles.shadow}></View>

              {/* Interior Color */}
              <View style={styles.viewContainer}>
                <View style={styles.textCenter}>
                  <Text style={{ fontSize: 16 }}>Màu Sắc Bên Trong: </Text>
                </View>
                <View style={[styles.textCenter, { width: "60%" }]}>
                  <TextInput
                    value={values.interiorColor}
                    placeholder="Nhập màu sắc bên trong"
                    style={styles.inputProduct}
                    onFocus={() => {
                      setFieldTouched("interiorColor");
                    }}
                    onBlur={() => {
                      setFieldTouched("interiorColor", "");
                    }}
                    onChangeText={handleChange("interiorColor")}
                    autoCorrect={false}
                  />
                </View>
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
                  placeholder="Kích Thước"
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

              {/* material */}
              <View style={styles.viewContainer}>
                <View style={styles.textCenter}>
                  <Text style={{ fontSize: 16 }}>Chất Liệu</Text>
                </View>
                <View style={[styles.textCenter, { width: "80%" }]}>
                  <TextInput
                    value={values.material}
                    placeholder="Nhập chất liệu của sản phẩm"
                    style={styles.inputProduct}
                    onFocus={() => {
                      setFieldTouched("material");
                    }}
                    onBlur={() => {
                      setFieldTouched("material", "");
                    }}
                    onChangeText={handleChange("material")}
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
                  <Text style={{ fontSize: 16 }}>Hạn sử dụng</Text>
                </View>
                <View style={[styles.textCenter, { width: "70%" }]}>
                  <TextInput
                    value={values.dateCode}
                    placeholder="Nhập hạn sử dụng (nếu có)"
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
              {/* Phương thức vận chuyển */}
              {/* <View style={styles.dropdownContainer}>
                <Dropdown
                  style={styles.dropdown}
                  data={dataShippingMethod}
                  labelField="label"
                  valueField="value"
                  placeholder="Phương Thức Vận Chuyển"
                  value={values.shippingMethod}
                  onChange={(item) => {
                    setFieldValue('shippingMethod', item.value);
                  }}
                />
                {touched.shippingMethod && errors.shippingMethod && (
                  <Text style={styles.errorText}>{errors.shippingMethod}</Text>
                )}
              </View> */}

              {/* Thời gian vận chuyển */}
              {/* <View style={styles.dropdownContainer}>
                <Dropdown
                  style={styles.dropdown}
                  data={dataShippingTime}
                  labelField="label"
                  valueField="value"
                  placeholder="Thời Gian Vận Chuyển"
                  value={values.shippingTime}
                  onChange={(item) => {
                    setFieldValue('shippingTime', item.value);
                  }}
                />
                {touched.shippingTime && errors.shippingTime && (
                  <Text style={styles.errorText}>{errors.shippingTime}</Text>
                )}
              </View>
              <View style={styles.shadow}></View> */}

              {/* Khu Vực Xuất Hàng */}
              {/* <View style={styles.viewContainer}>
                <View style={styles.textCenter}>
                  <Text style={{ fontSize: 16 }}>Khu Vực Xuất Hàng:</Text>
                </View>
                <View style={[styles.textCenter, { width: "60%" }]}>
                  <TextInput
                    value={values.shippingAddress}
                    placeholder="Nhập địa chỉ"
                    style={styles.inputProduct}
                    onFocus={() => {
                      setFieldTouched("shippingAddress");
                    }}
                    onBlur={() => {
                      setFieldTouched("shippingAddress", "");
                    }}
                    onChangeText={handleChange("shippingAddress")}
                    autoCorrect={false}
                  />
                </View>
              </View>
              <View style={styles.shadow}></View> */}

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

              {/* fee */}
              {/* <View style={styles.viewContainer}>
                <View style={styles.textCenter}>
                  <Text style={{ fontSize: 16 }}>Tiền Hoa Hồng:</Text>
                </View>
                <View style={[styles.textCenter, { width: "70%" }]}>
                  <TextInput
                    keyboardType='number-pad'
                    value={values.fee}
                    placeholder="Nhập tiền hoa hồng"
                    style={styles.inputProduct}
                    onFocus={() => {
                      setFieldTouched("fee");
                    }}
                    onBlur={() => {
                      setFieldTouched("fee", "");
                    }}
                    onChangeText={handleChange("fee")}
                    autoCorrect={false}
                  />
                </View>
              </View>
              {touched.fee && errors.fee && <Text style={styles.errorMessage}>{errors.fee}</Text>}
              <View style={styles.shadow}></View> */}

              {/* sales profit */}
              {/* <View style={styles.viewContainer}>
                <View style={styles.textCenter}>
                  <Text style={{ fontSize: 16 }}>Lợi Nhuận Bán Hàng:</Text>
                </View>
                <View style={[styles.textCenter, { width: "60%" }]}>
                  <TextInput
                    keyboardType='number-pad'
                    value={values.saleProfit}
                    placeholder="Lợi Nhuận"
                    style={styles.inputProduct}
                    onFocus={() => {
                      setFieldTouched("saleProfit");
                    }}
                    onBlur={() => {
                      setFieldTouched("saleProfit", "");
                    }}
                    onChangeText={handleChange("saleProfit")}
                    autoCorrect={false}
                  />
                </View>
              </View>
              {touched.saleProfit && errors.saleProfit && <Text style={styles.errorMessage}>{errors.saleProfit}</Text>}
              <View style={styles.shadow}></View> */}

            </View>

            <View style={{ marginTop: 50 }}>
              <Button onPress={handleSubmit} title="Submit" />
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};


export default CreatePostDetail;
