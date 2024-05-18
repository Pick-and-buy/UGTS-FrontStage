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
import Button from "../../components/Button.jsx";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants/theme";
import styles from "../css/register.style";
import RegisterInformation from "./RegisterInformation";

const validationSchema = Yup.object().shape({
    phone: Yup.number()
        .typeError("Có vẻ như đó không phải là số điện thoại")
        .positive("Số điện thoại không thể bắt đầu bằng dấu trừ")
        .integer("Số điện thoại không được bao gồm dấu thập phân")
        .min(8, "Điện thoại phải có ít nhất 8 ký tự")
        .required('Vui lòng nhập số điện thoại'),
    password: Yup.string()
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
        .required("Vui lòng nhập mật khẩu"),
    passwordConfirmation: Yup.string()
        .test('Mật khẩu trùng khớp', 'Mật khẩu không trùng khớp', function (value) {
            return this.parent.password === value
        })
});

const Register = ({ navigation }) => {
    const [loader, setLoader] = useState(false);
    const [obsecureText, setObsecureText] = useState(false);
    const [obsecureText2, setObsecureText2] = useState(false);

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

    return (

        <ScrollView style={{ backgroundColor: COLORS.white }}>
            <View style={{ marginHorizontal: 20, marginTop: 50 }}>
                {/* <BackBtn onPress={() => navigation.goBack()} /> */}
                <View style={{ width: SIZES.width, height: SIZES.height / 3 }}>
                    <Image
                        style={{ position: "absolute", top: -25, right: -25, transform: [{ scale: 0.8 }] }}
                        source={require('../../../assets/images/sky.png')}
                    />
                    <Image
                        style={{ width: 380, height: 380 }}
                        source={require('../../../assets/images/GiaTot_Logo.png')}
                    />
                </View>


                <Text style={styles.titleLogin}>ĐĂNG KÝ</Text>

                <Formik
                    initialValues={{ phone: "", password: "", passwordConfirmation: "" }}
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

                            <View style={styles.wrapper}>
                                <View
                                    style={styles.inputWrapper(
                                        touched.passwordConfirmation ? COLORS.secondary : COLORS.offwhite
                                    )}
                                >
                                    <MaterialCommunityIcons
                                        name="lock"
                                        size={20}
                                        color={COLORS.primary}
                                        style={styles.iconStyle}
                                    />

                                    <TextInput
                                        secureTextEntry={obsecureText2}
                                        placeholder="Nhập lại mật khẩu"
                                        onFocus={() => {
                                            setFieldTouched("passwordConfirmation");
                                        }}
                                        onBlur={() => {
                                            setFieldTouched("passwordConfirmation", "");
                                        }}
                                        value={values.passwordConfirmation}
                                        onChangeText={handleChange("passwordConfirmation")}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        style={{ flex: 1 }}
                                    />

                                    <TouchableOpacity
                                        onPress={() => {
                                            setObsecureText2(!obsecureText2);
                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            name={obsecureText2 ? "eye-outline" : "eye-off-outline"}
                                            size={18}
                                        />
                                    </TouchableOpacity>
                                </View>
                                {touched.passwordConfirmation && errors.passwordConfirmation && (
                                    <Text style={styles.errorMessage}>{errors.passwordConfirmation}</Text>
                                )}
                            </View>

                            <Button
                                loader={loader}
                                title={"ĐĂNG KÝ"}
                                onPress={() => navigation.navigate("register-infor-navigation")}
                            />


                            <Text style={{ textAlign: "center" }}>
                                {" "}Bạn đã có tài khoản ? {" "}
                                <Text
                                    style={{ color: COLORS.primary, fontWeight: "bold" }}
                                    onPress={() => navigation.navigate("login-navigation")}
                                >
                                    Đăng nhập
                                </Text>
                            </Text>
                        </View>


                    )}
                </Formik>
            </View>
        </ScrollView>
    );
}

export default Register;

