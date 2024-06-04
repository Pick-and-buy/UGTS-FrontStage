import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from "../css/ViaMethodForgotPassword.style.js";
import Button from '../../components/Button.jsx';
import BackBtn from '../../components/BackBtn.jsx';
import { COLORS, SIZES } from '../../constants/theme.js';
import { sendOtp } from '../../api/auth.js';

// Validation Schema
const getValidationSchema = (type) => {
    return Yup.object().shape({
        value: Yup.string()
            .required('Vui lòng điền thông tin')
            .test('is-valid', 'Email không hợp lệ', function (value) {
                if (type === 'email') {
                    return Yup.string().email().isValidSync(value);
                } else {
                    return Yup.string().matches(/^\d{10}$/, 'Số điện thoại phải có ít nhất 10 số').required('Vui lòng nhập số điện thoại').typeError("Có vẻ như đó không phải là số điện thoại")
                }
            })
    });
};

const ForgotPasswordInformation = ({ navigation, route }) => {
    const type = route.params;

    const handleSendOTP = async (values, { setSubmitting, setErrors }) => {
        try {
            await sendOtp(values.value);
            Alert.alert('Success', 'OTP sent to your email');
            navigation.navigate('otp-navigation',{type, value:values.value});
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Failed to send OTP. Please try again.';
            setErrors({ api: errorMessage });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.view_1}>
                <View>
                    <BackBtn onPress={() => navigation.navigate('forgot-password-navigation')} />
                </View>
                <View>
                    <Text style={styles.textHeader}>Quên mật khẩu</Text>
                    <Text style={styles.textHeader_1}>Nhập thông tin dùng nhận mã xác minh để đặt lại mật khẩu của bạn</Text>
                </View>

                <Formik
                    initialValues={{ value: '' }}
                    validationSchema={getValidationSchema(type)}
                    onSubmit={handleSendOTP}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                        <View>
                            {type === "phone" && (
                                <View style={[styles.view_3, { marginTop: 25, marginBottom: 25 }]}>
                                    <MaterialCommunityIcons name="phone-message" size={30} color={COLORS.primary} />
                                    <TextInput
                                        style={{ marginLeft: 10, flex: 1 }}
                                        placeholder='Số điện thoại'
                                        placeholderTextColor='gray'
                                        keyboardType='numeric'
                                        onChangeText={handleChange('value')}
                                        onBlur={handleBlur('value')}
                                        value={values.value}
                                    />
                                </View>
                            )}

                            {type === "email" && (
                                <View style={[styles.view_3, { marginTop: 25, marginBottom: 25 }]}>
                                    <MaterialCommunityIcons name="email-outline" size={30} color={COLORS.primary} />
                                    <TextInput
                                        style={{ marginLeft: 10, flex: 1 }}
                                        placeholder='Email'
                                        placeholderTextColor='gray'
                                        onChangeText={handleChange('value')}
                                        onBlur={handleBlur('value')}
                                        value={values.value}
                                    />
                                </View>
                            )}

                            {errors.value && touched.value && (
                                <Text style={{ color: 'red'}}>{errors.value}</Text>
                            )}
                            {errors.api && (
                                <Text style={{ color: 'red'}}>{errors.api}</Text>
                            )}

                            <View style={{ marginTop: "10%" }}>
                                <Button
                                    title={"GỬI MÃ OTP"}
                                    onPress={handleSubmit}
                                    isValid={!isSubmitting}
                                />
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        </View>
    );
};

export default ForgotPasswordInformation;
