import {
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Alert,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS, SIZES } from "../../constants/theme.js";
import styles from "../css/register.style.js";
import Button from "../../components/Button.jsx";
import { sendOtpToSMS } from "../../api/auth.js";

const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
        .matches(/^\d{10}$/, 'Số điện thoại phải có ít nhất 10 số')
        .required('Vui lòng nhập số điện thoại')
        .typeError("Có vẻ như đó không phải là số điện thoại"),
    password: Yup.string()
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
        .required("Vui lòng nhập mật khẩu"),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Mật khẩu không trùng khớp')
        .required("Vui lòng xác nhận mật khẩu")
});

const Register = ({ navigation }) => {
    const [loader, setLoader] = useState(false);
    const [obsecureText, setObsecureText] = useState(true);
    const [obsecureText2, setObsecureText2] = useState(true);


    const formatPhoneNumber = (phoneNumber) => {
        // Remove leading 0 and prepend +84
        if (phoneNumber.startsWith('0')) {
            phoneNumber = phoneNumber.substring(1); // Remove the leading 0
        }

        return `+84 ${phoneNumber}`;
    };
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}
            style={{ flex: 1 }}
        >
            <ScrollView style={{ backgroundColor: COLORS.white }}>
                <View style={{ marginHorizontal: 20, marginTop: 50 }}>
                    <View style={{ width: SIZES.width, height: SIZES.height / 3 }}>
                        <Image
                            style={{ position: "absolute", top: -30, right: -30, transform: [{ scale: 0.75 }] }}
                            source={require('../../../assets/images/sky.png')}
                        />
                        <Image
                            style={{ width: 380, height: 380 }}
                            source={require('../../../assets/images/GiaTot_Logo.png')}
                        />
                    </View>

                    <Text style={styles.titleLogin}>ĐĂNG KÝ</Text>

                    <Formik
                        initialValues={{ phoneNumber: "", password: "", passwordConfirmation: "" }}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { resetForm }) => {
                            setLoader(true);
                            try {
                                const rs = await sendOtpToSMS(formatPhoneNumber(values.phoneNumber));
                                console.log(rs);
                                // Navigate to the next screen with the form data
                                navigation.navigate('otp-sms-verification', { formData: values });
                                resetForm();
                            } catch (error) {
                                console.log(error);
                                Alert.alert("Registration Error", "Something went wrong, please try again.");
                            } finally {
                                setLoader(false);
                            }
                        }}
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
                                            touched.phoneNumber ? COLORS.secondary : COLORS.offwhite
                                        )}
                                    >
                                        <MaterialCommunityIcons
                                            name="phone"
                                            size={24}
                                            color={COLORS.primary}
                                            style={styles.iconStyle}
                                        />

                                        <TextInput
                                            keyboardType='phone-pad'
                                            placeholder="Số điện thoại"
                                            onFocus={() => setFieldTouched("phoneNumber")}
                                            onBlur={handleBlur("phoneNumber")}
                                            value={values.phoneNumber}
                                            onChangeText={handleChange("phoneNumber")}
                                            autoCorrect={false}
                                            style={{ flex: 1, fontSize: 18 }}
                                        />
                                    </View>
                                    {touched.phoneNumber && errors.phoneNumber && (
                                        <Text style={styles.errorMessage}>{errors.phoneNumber}</Text>
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
                                            size={24}
                                            color={COLORS.primary}
                                            style={styles.iconStyle}
                                        />

                                        <TextInput
                                            secureTextEntry={obsecureText}
                                            placeholder="Mật khẩu"
                                            onFocus={() => setFieldTouched("password")}
                                            onBlur={handleBlur("password")}
                                            value={values.password}
                                            onChangeText={handleChange("password")}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{ flex: 1, fontSize: 18 }}
                                        />

                                        <TouchableOpacity
                                            onPress={() => setObsecureText(!obsecureText)}
                                        >
                                            <MaterialCommunityIcons
                                                name={obsecureText ? "eye-outline" : "eye-off-outline"}
                                                size={20}
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
                                            size={24}
                                            color={COLORS.primary}
                                            style={styles.iconStyle}
                                        />

                                        <TextInput
                                            secureTextEntry={obsecureText2}
                                            placeholder="Nhập lại mật khẩu"
                                            onFocus={() => setFieldTouched("passwordConfirmation")}
                                            onBlur={handleBlur("passwordConfirmation")}
                                            value={values.passwordConfirmation}
                                            onChangeText={handleChange("passwordConfirmation")}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            style={{ flex: 1,fontSize:18 }}
                                        />

                                        <TouchableOpacity
                                            onPress={() => setObsecureText2(!obsecureText2)}
                                        >
                                            <MaterialCommunityIcons
                                                name={obsecureText2 ? "eye-outline" : "eye-off-outline"}
                                                size={20}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    {touched.passwordConfirmation && errors.passwordConfirmation && (
                                        <Text style={styles.errorMessage}>{errors.passwordConfirmation}</Text>
                                    )}
                                </View>

                                <Button
                                    loader={loader}
                                    title={"TIẾP TỤC"}
                                    isValid={true}
                                    onPress={handleSubmit}
                                />

                                <Text style={{ textAlign: "center",marginTop:50 }}>
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
            </ScrollView></KeyboardAvoidingView>
    );
}

export default Register;
