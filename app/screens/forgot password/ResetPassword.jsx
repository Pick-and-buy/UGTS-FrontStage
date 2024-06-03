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
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from "../css/resetPassword.style.js";
import Button from '../../components/Button.jsx';
import BackBtn from '../../components/BackBtn.jsx';
import { Formik } from "formik";
import * as Yup from "yup";
import { COLORS, SIZES } from "../../constants/theme.js";
import { resetPassword } from "../../api/auth.js";


const validationSchema = Yup.object().shape({
    password: Yup.string()
        .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
        .required("Vui lòng nhập mật khẩu"),
    passwordConfirmation: Yup.string()
        .test('Mật khẩu trùng khớp', 'Mật khẩu không trùng khớp', function (value) {
            return this.parent.password === value
        })
});


const ResetPassword = ({ navigation, route }) => {
    const { email } = route.params;
    const [loader, setLoader] = useState(false);
    const [obsecureText, setObsecureText] = useState(false);
    const [obsecureText2, setObsecureText2] = useState(false);

    const handleResetPassword = async (values) => {
        try {

            await resetPassword(email, values.password, values.passwordConfirmation);
            // After successful password reset, navigate to the appropriate screen
            navigation.navigate("congrats-navigation", {
                title: "HOÀN THÀNH!",
                content: "Cập nhật mật khẩu thành công!",
                routerName: "login-navigation",
                btnTxt: "ĐĂNG NHẬP NGAY",
            });
        } catch (error) {
            // Handle password reset error
            console.error("Password reset error:", error);
            Alert.alert("Error", "Failed to reset password. Please try again.");
        }
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.view_1}>
                <View style={{ marginBottom: "10%" }}>
                    <Text style={styles.textHeader}>Thiết lập lại mật khẩu của bạn</Text>
                    <Text style={styles.textHeader_1}>
                        Dữ liệu này sẽ được cập nhật cho tài khoản của bạn
                    </Text>
                </View>

                <Formik
                    initialValues={{ password: "", passwordConfirmation: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleResetPassword}
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
                        <View style={styles.wrapper2}>
                            <View style={styles.wrapper2}>
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

                            <View style={styles.wrapper2}>
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

                            <View>
                                <Button
                                    title={"CẬP NHẬT"}
                                    onPress={handleSubmit}
                                    isValid={isValid}
                                />
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        </View>
    );
};

export default ResetPassword;
