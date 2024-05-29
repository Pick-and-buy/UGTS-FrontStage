import {
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Alert,
    StyleSheet,
} from "react-native";
import React, { useState, useRef, useContext } from "react";
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import Button from "../components/Button";
import BackBtn from "../components/BackBtn";
import { Formik } from "formik";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../constants/theme";
import styles from "./css/login.style";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
    const [loader, setLoader] = useState(false);
    const [obsecureText, setObsecureText] = useState(true);

    const handleLogin = async (values) => {
        try {
            const response = await axios.post('http://10.0.2.2:8080/api/v1/auth/login', {
                phoneNumber: values.phoneNumber,
                password: values.password,
            });

            if (response.status === 200) {
                alert('Login successful');
                // handle successful login
                navigation.navigate("bottom-navigation")
            } else {
                alert('Login failed');
            }
        } catch (error) {
            alert('An error occurred');
        }
    };

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

    const validationSchema = Yup.object().shape({
        phoneNumber: Yup.string().matches(/^\d{10}$/, 'Số điện thoại phải có ít nhất 10 số').required('Vui lòng nhập số điện thoại').typeError("Có vẻ như đó không phải là số điện thoại"),
        password: Yup.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự').required('Vui lòng nhập mật khẩu'),
    });

    return (
        <ScrollView style={{ backgroundColor: COLORS.white }}>
            <View style={{ marginHorizontal: 20, marginTop: 50 }}>
                <View style={{ width: SIZES.width, height: SIZES.height / 3 }}>
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
                    initialValues={{ phoneNumber: '', password: '' }}
                    onSubmit={handleLogin}
                    validationSchema={validationSchema}
                >
                    {({ handleChange,
                        handleBlur,
                        touched,
                        handleSubmit,
                        values,
                        errors,
                        isValid,
                        setFieldTouched, }) => (
                        <View style={styles.container}>
                            <View style={styles.wrapper}>
                                <View
                                    style={styles.inputWrapper(
                                        touched.phoneNumber ? COLORS.secondary : COLORS.offwhite
                                    )}
                                >
                                    <MaterialCommunityIcons
                                        name="phone"
                                        size={20}
                                        color={COLORS.primary}
                                        style={styles.iconStyle}
                                    />
                                    <TextInput
                                        style={{ flex: 1 }}
                                        keyboardType='phone-pad'
                                        placeholder="Số điện thoại"
                                        value={values.phoneNumber}
                                        onFocus={() => {
                                            setFieldTouched("phoneNumber");
                                        }}
                                        onBlur={() => {
                                            setFieldTouched("phoneNumber", "");
                                        }}
                                        onChangeText={handleChange("phoneNumber")}
                                        autoCorrect={false}
                                    />
                                </View>
                                {touched.phoneNumber && errors.phoneNumber && <Text style={styles.errorMessage}>{errors.phoneNumber}</Text>}
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
                                        style={{ flex: 1 }}
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

                            {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

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
