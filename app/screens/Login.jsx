import {
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Alert,
} from "react-native";
import React, { useState, useRef, useContext } from "react";
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import Button from "../components/Button";
import BackBtn from "../components/BackBtn";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";
import styles from "./css/login.style";
import LottieView from "lottie-react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LoginContext } from "../context/LoginContext";

const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
        .required("Vui lòng nhập mật khẩu"),
    phone: Yup.number()
        .typeError("Có vẻ như đó không phải là số điện thoại")
        .positive("Số điện thoại không thể bắt đầu bằng dấu trừ")
        .integer("Số điện thoại không được bao gồm dấu thập phân")
        .min(8, "Điện thoại phải có ít nhất 8 ký tự")
        .required('Vui lòng nhập số điện thoại')
});

const Login = ({ navigation }) => {
    const animation = useRef(null);
    const [loader, setLoader] = useState(false);
    const [obsecureText, setObsecureText] = useState(false);
    const [isSelected, setSelection] = useState(false);
    // const { login, setLogin } = useContext(LoginContext)

    const inValidForm = () => {
        Alert.alert("Invalid Form", "Please provide all required fields", [
            {
                text: "Cancel",
                onPress: () => { },
            },
            {
                text: "Continue",
                onPress: () => { },
            },
            { defaultIndex: 1 },
        ]);
    };

    // //   setLoader(true);
    // //   try {
    // //     await firebase
    // //       .auth()
    // //       .signInWithphoneAndPassword(values.phone, values.password).then(() => navigation.navigate('home')).catch((error) => {
    // //         Alert.alert("Error Login", error.message, [
    // //           {
    // //             text: "Back",
    // //             onPress: () => {
    // //               setLoader(false);
    // //             },
    // //           },
    // //           {
    // //             text: "Continue",
    // //             onPress: () => {},
    // //           },
    // //           { defaultIndex: 1 },
    // //         ]);
    // //       });
    // //   } catch (error) {
    // //     Alert.alert("Error Login", error.message, [
    // //       {
    // //         text: "Back",
    // //         onPress: () => {
    // //           setLoader(false);
    // //         },
    // //       },
    // //       {
    // //         text: "Continue",
    // //         onPress: () => {},
    // //       },
    // //       { defaultIndex: 1 },
    // //     ]);
    // //   }
    // // };

    // const loginFunc = async (values) => {
    //     setLoader(true);

    //     try {
    //         const endpoint = "http://localhost:6002/login";
    //         const data = values;

    //         console.log(data);

    //         const response = await axios.post(endpoint, data);
    //         if (response.status === 200) {
    //             setLoader(false);
    //             setLogin(true);

    //             console.log(response.data);

    //             await AsyncStorage.setItem("id", JSON.stringify(response.data._id));
    //             await AsyncStorage.setItem("token", JSON.stringify(response.data.userToken));

    //         } else {
    //             setLogin(false);

    //             Alert.alert("Error Logging in ", "Please provide valid credentials ", [
    //                 {
    //                     text: "Cancel",
    //                     onPress: () => { },
    //                 },
    //                 {
    //                     text: "Continue",
    //                     onPress: () => { },
    //                 },
    //                 { defaultIndex: 1 },
    //             ]);
    //         }
    //     } catch (error) {
    //         setLogin(false);
    //         Alert.alert(
    //             "Error ",
    //             "Oops, Error logging in try again with correct credentials",
    //             [
    //                 {
    //                     text: "Cancel",
    //                     onPress: () => { },
    //                 },
    //                 {
    //                     text: "Continue",
    //                     onPress: () => { },
    //                 },
    //                 { defaultIndex: 1 },
    //             ]
    //         );
    //     } finally {
    //         setLoader(false);
    //     }
    // };
    return (
        <ScrollView style={{ backgroundColor: COLORS.white }}>
            <View style={{ marginHorizontal: 20, marginTop: 50 }}>
                {/* <BackBtn onPress={() => navigation.goBack()} /> */}
                <View style={{ width: SIZES.width, height: SIZES.height / 3}}>
                    <Image
                        style={{ position: "absolute", top: -30, right: -30, transform: [{ scale: 0.75 }] }}
                        source={require('../../assets/images/sky.png')}
                    />
                    <Image
                        style={{ width: 380, height: 380 }}
                        source={require('../../assets/images/GiaTot_Logo.png')}
                    />
                </View>


                <Text style={styles.titleLogin}>ĐĂNG NHẬP</Text>

                <Formik
                    initialValues={{ phone: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => loginFunc(values)}
                >
                    {({
                        handleChange,
                        handleBlur,
                        touched,
                        handleSubmit,
                        values,
                        errors,
                        isValid,
                        setFieldTouched,
                    }) => (
                        <View>
                            <View style={styles.wrapper}>
                                <View
                                    style={styles.inputWrapper(
                                        touched.phone ? COLORS.secondary : COLORS.offwhite
                                    )}
                                >
                                    <MaterialCommunityIcons
                                        name="phone"
                                        size={20}
                                        color={COLORS.primary}
                                        style={styles.iconStyle}
                                    />

                                    <TextInput
                                        keyboardType='numeric'
                                        placeholder="Số điện thoại"
                                        onFocus={() => {
                                            setFieldTouched("phone");
                                        }}
                                        onBlur={() => {
                                            setFieldTouched("phone", "");
                                        }}
                                        value={values.phone}
                                        onChangeText={handleChange("phone")}
                                        autoCorrect={false}
                                        style={{ flex: 1 }}
                                    />
                                </View>
                                {touched.phone && errors.phone && (
                                    <Text style={styles.errorMessage}>{errors.phone}</Text>
                                )}
                            </View>

                            <View style={styles.wrapper}>
                                <View
                                    style={styles.inputWrapper(
                                        touched.password ? COLORS.secondary : COLORS.offwhite
                                    )}
                                >
                                    <MaterialCommunityIcons
                                        name="lock"
                                        size={20}
                                        color={COLORS.primary}
                                        style={styles.iconStyle}
                                    />

                                    <TextInput
                                        secureTextEntry={obsecureText}
                                        placeholder="Mật khẩu"
                                        onFocus={() => {
                                            setFieldTouched("password");
                                        }}
                                        onBlur={() => {
                                            setFieldTouched("password", "");
                                        }}
                                        value={values.password}
                                        onChangeText={handleChange("password")}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        style={{ flex: 1 }}
                                    />

                                    <TouchableOpacity
                                        onPress={() => {
                                            setObsecureText(!obsecureText);
                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            name={obsecureText ? "eye-outline" : "eye-off-outline"}
                                            size={18}
                                        />
                                    </TouchableOpacity>
                                </View>
                                {touched.password && errors.password && (
                                    <Text style={styles.errorMessage}>{errors.password}</Text>
                                )}
                            </View>

                            <View style={{ flex: 1, marginLeft: 8, marginBottom: 20 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <BouncyCheckbox
                                        onPress={isChecked => {
                                            Alert.alert(`Checked:: ${isChecked}`);
                                        }}
                                        size={20}
                                        fillColor={COLORS.primary}
                                        unFillColor={COLORS.white}
                                        style={{ alignSelf: 'center' }}
                                        text="Lưu đăng nhập"
                                        textStyle={{
                                            textDecorationLine: "none",
                                            color: COLORS.black,
                                            fontSize: 16,
                                        }}
                                    />
                                    <Text
                                        style={{ fontSize: 16, textDecorationLine: "underline", color: COLORS.primary }}
                                        onPress={() => {
                                            navigation.navigate("forgot-password-navigation");
                                        }}
                                    >Quên mật khẩu ?</Text>
                                </View>


                            </View>


                            <Button
                                loader={loader}
                                title={"ĐĂNG NHẬP"}
                                onPress={isValid ? handleSubmit : inValidForm}
                                isValid={isValid}
                            />

                            <Text style={{ textAlign: "center" }}>
                                {" "}Hoặc tiếp tục với{" "}
                            </Text>


                            <View
                                style={{
                                    height: 50,
                                    width: "50%",
                                    marginVertical: 20,
                                    backgroundColor: COLORS.white,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    borderRadius: 12,
                                    marginLeft: "26%",
                                    borderWidth: 1,
                                    borderColor: COLORS.primary,
                                    flexDirection: "row",
                                    justifyContent: "center",
                                }}
                                onPress={() => { }}
                            >
                                <Image
                                    style={{ width: 30, height: 30 }}
                                    source={require('../../assets/images/google-logo.png')}
                                />

                                <Text style={{ fontSize: 18, marginLeft: 8 }}>Google</Text>
                            </View>

                            <Text style={{ textAlign: "center" }}>
                                {" "}Bạn chưa có tài khoản ? {" "}
                                <Text
                                    style={{ color: COLORS.primary, fontWeight: "bold" }}
                                    onPress={() => navigation.navigate("register-navigation")}
                                >
                                    Đăng ký
                                </Text>
                            </Text>
                        </View>


                    )}
                </Formik>
            </View>
        </ScrollView>
    );
};

export default Login;
