import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '../../components/Button';
import BackBtn from '../../components/BackBtn';

import { COLORS } from "../../constants/theme";
import styles from '../css/changePassword.style';
import { changePassword } from '../../api/auth';

const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Vui lòng nhập mật khẩu hiện tại').min(8, 'Mật khẩu mới phải có ít nhất 8 ký tự'),
    newPassword: Yup.string()
        .min(8, 'Mật khẩu mới phải có ít nhất 8 ký tự')
        .required('Vui lòng nhập mật khẩu mới'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Mật khẩu không trùng khớp')
        .required('Vui lòng xác nhận mật khẩu mới').min(8, 'Mật khẩu mới phải có ít nhất 8 ký tự'),
});

const ChangePassword = ({ route, navigation }) => {
    const user = route.params.result;
    const [obscureText, setObscureText] = useState(true);
    const [obscureText2, setObscureText2] = useState(true);
    const [obscureText3, setObscureText3] = useState(true);

    const handleChangePassword = async (values, { setSubmitting }) => {
        try {
            const response = await changePassword(user.id, values.currentPassword, values.newPassword);

            if (response) {
                navigation.navigate('congrats-navigation', {
                    title: 'HOÀN THÀNH!',
                    content: 'Cập nhật mật khẩu thành công!',
                    routerName: 'login-navigation',
                    btnTxt: 'ĐĂNG NHẬP NGAY',
                });
            } else {
                Alert.alert('Error', response.data.message || 'Failed to change password. Please try again.');
            }
        } catch (error) {
            console.log('Password change error:', error);
            Alert.alert('Error', 'Failed to change password. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.view_1}>
                <View style={{ marginBottom: '10%' }}>
                    <Text style={styles.textHeader}>Thiết lập mật khẩu mới</Text>
                    <Text style={styles.textHeader_1}>
                        Dữ liệu này sẽ được cập nhật cho tài khoản của bạn
                    </Text>
                </View>

                <Formik
                    initialValues={{ currentPassword: '', newPassword: '', confirmPassword: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleChangePassword}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                        isSubmitting,
                        isValid,
                    }) => (
                        <View style={styles.wrapper2}>
                            <View style={{ marginBottom: 20 }}>
                                <View style={styles.inputWrapper(touched.currentPassword ? COLORS.secondary : COLORS.offwhite)}>
                                    <MaterialCommunityIcons name="lock" size={20} color={COLORS.primary} style={styles.iconStyle} />
                                    <TextInput
                                        secureTextEntry={obscureText}
                                        placeholder="Mật khẩu hiện tại"
                                        onFocus={() => handleBlur('currentPassword')}
                                        onBlur={() => handleBlur('currentPassword')}
                                        value={values.currentPassword}
                                        onChangeText={handleChange('currentPassword')}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        style={{ flex: 1 }}
                                    />
                                    <TouchableOpacity onPress={() => setObscureText(!obscureText)}>
                                        <MaterialCommunityIcons name={obscureText ? "eye-outline" : "eye-off-outline"} size={18} />
                                    </TouchableOpacity>
                                </View>
                                {touched.currentPassword && errors.currentPassword && (
                                    <Text style={styles.errorMessage}>{errors.currentPassword}</Text>
                                )}
                            </View>

                            <View style={{ marginBottom: 20 }}>
                                <View style={styles.inputWrapper(touched.newPassword ? COLORS.secondary : COLORS.offwhite)}>
                                    <MaterialCommunityIcons name="lock" size={20} color={COLORS.primary} style={styles.iconStyle} />
                                    <TextInput
                                        secureTextEntry={obscureText2}
                                        placeholder="Mật khẩu mới"
                                        onFocus={() => handleBlur('newPassword')}
                                        onBlur={() => handleBlur('newPassword')}
                                        value={values.newPassword}
                                        onChangeText={handleChange('newPassword')}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        style={{ flex: 1 }}
                                    />
                                    <TouchableOpacity onPress={() => setObscureText2(!obscureText2)}>
                                        <MaterialCommunityIcons name={obscureText2 ? "eye-outline" : "eye-off-outline"} size={18} />
                                    </TouchableOpacity>
                                </View>
                                {touched.newPassword && errors.newPassword && (
                                    <Text style={styles.errorMessage}>{errors.newPassword}</Text>
                                )}
                            </View>

                            <View style={{ marginBottom: 20 }}>
                                <View style={styles.inputWrapper(touched.confirmPassword ? COLORS.secondary : COLORS.offwhite)}>
                                    <MaterialCommunityIcons name="lock" size={20} color={COLORS.primary} style={styles.iconStyle} />
                                    <TextInput
                                        secureTextEntry={obscureText3}
                                        placeholder="Xác nhận mật khẩu mới"
                                        onFocus={() => handleBlur('confirmPassword')}
                                        onBlur={() => handleBlur('confirmPassword')}
                                        value={values.confirmPassword}
                                        onChangeText={handleChange('confirmPassword')}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        style={{ flex: 1 }}
                                    />
                                    <TouchableOpacity onPress={() => setObscureText3(!obscureText3)}>
                                        <MaterialCommunityIcons name={obscureText3 ? "eye-outline" : "eye-off-outline"} size={18} />
                                    </TouchableOpacity>
                                </View>
                                {touched.confirmPassword && errors.confirmPassword && (
                                    <Text style={styles.errorMessage}>{errors.confirmPassword}</Text>
                                )}
                            </View>

                            <View>
                                <Button title="CẬP NHẬT" onPress={handleSubmit} isValid={isValid} disabled={isSubmitting} />
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        </View>
    );
};

export default ChangePassword;
