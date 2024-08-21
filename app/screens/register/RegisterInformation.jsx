import React from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from "../css/registerInformation.style.js";
import Button from '../../components/Button.jsx';
import { COLORS } from '../../constants/theme.js';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { register } from '../../api/auth.js';

const RegisterInformation = ({ navigation, route }) => {
    const formData = route.params?.formData;
    // Remove passwordConfirmation from the original object and create a new object without it
    const { passwordConfirmation, ...data } = formData;

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required('Vui lòng nhập tên'),
        lastName: Yup.string().required('Vui lòng nhập họ'),
        email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
        username: Yup.string().required('Vui lòng nhập tên đăng nhập'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const userData = { ...values, ...data };
            await register(userData);
            resetForm(); // Reset the form after successful submission
            alert('Registration successful')
            navigation.reset({
                index: 0,
                routes: [{ name: 'login-navigation' }],
            });
        } catch (error) {
            console.log('Registration failed:', error.response ? error.response.data : error.message);
            Alert.alert('Registration Error', error.response ? error.response.data.message : 'Something went wrong, please try again.');
        }
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.view_1}>
                <Formik
                    initialValues={{ firstName: '', lastName: '', email: '', username: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                    }) => (
                        <>
                            <View>
                                <Text style={styles.textHeader}>
                                    Điền thông tin của bạn để bắt đầu
                                </Text>
                                <Text style={styles.textHeader_1}>
                                    Dữ liệu này sẽ được hiển thị trong hồ sơ tài khoản của bạn
                                </Text>
                            </View>
                            <View style={styles.view_3}>
                                <FontAwesome5 name="user-edit" size={24} color={COLORS.primary} />
                                <TextInput
                                    style={{ marginLeft: 10, flex: 1 }}
                                    placeholder='Tên'
                                    placeholderTextColor='gray'
                                    value={values.firstName}
                                    onChangeText={handleChange('firstName')}
                                    onBlur={handleBlur('firstName')}
                                />
                            </View>
                            {touched.firstName && errors.firstName && (
                                <Text style={styles.errorMessage}>{errors.firstName}</Text>
                            )}
                            <View style={[styles.view_3, { marginTop: 12 }]}>
                                <FontAwesome5 name="user-edit" size={24} color={COLORS.primary} />
                                <TextInput
                                    style={{ marginLeft: 10, flex: 1 }}
                                    placeholder='Họ'
                                    placeholderTextColor='gray'
                                    value={values.lastName}
                                    onChangeText={handleChange('lastName')}
                                    onBlur={handleBlur('lastName')}
                                />
                            </View>
                            {touched.lastName && errors.lastName && (
                                <Text style={styles.errorMessage}>{errors.lastName}</Text>
                            )}
                            <View style={[styles.view_3, { marginTop: 12 }]}>
                                <MaterialCommunityIcons name="account-outline" size={30} color={COLORS.primary} />
                                <TextInput
                                    style={{ marginLeft: 10, flex: 1 }}
                                    placeholder='Username'
                                    placeholderTextColor='gray'
                                    value={values.username}
                                    onChangeText={handleChange('username')}
                                    onBlur={handleBlur('username')}
                                />
                            </View>
                            {touched.username && errors.username && (
                                <Text style={styles.errorMessage}>{errors.username}</Text>
                            )}
                            <View style={[styles.view_3, { marginTop: 12 }]}>
                                <MaterialCommunityIcons name="email-outline" size={30} color={COLORS.primary} />
                                <TextInput
                                    style={{ marginLeft: 10, flex: 1 }}
                                    placeholder='Email'
                                    placeholderTextColor='gray'
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                />
                            </View>
                            {touched.email && errors.email && (
                                <Text style={styles.errorMessage}>{errors.email}</Text>
                            )}
                            <View>
                                <Button
                                    title={"ĐĂNG KÝ"}
                                    onPress={handleSubmit}
                                    isValid={true}
                                />
                            </View>
                        </>
                    )}
                </Formik>
            </View>
        </View>
    );
}

export default RegisterInformation;
