import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { updateProfile } from '../../api/user.js';
import { COLORS } from '../../constants/theme.js';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from "../css/updateProfile.style.js";
import Button from '../../components/Button.jsx';

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Vui lòng nhập tên'),
    lastName: Yup.string().required('Vui lòng nhập họ'),
    email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    username: Yup.string().required('Vui lòng nhập tên đăng nhập'),
    dateOfBirth: Yup.date()
        .required('Vui lòng chọn ngày sinh')
        .nullable()
        .test('is-valid-date', 'Ngày sinh không hợp lệ', (value) => {
            return !value || value <= new Date();
        }),
});

const UpdateProfile = ({ navigation, route }) => {
    const data = route.params;
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleUpdateProfile = async (values, { setSubmitting, setErrors }) => {
        // console.log(data.id);
        try {
            await updateProfile(data.result.id, values);
            navigation.navigate("congrats-navigation", {
                title: "HOÀN THÀNH!",
                content: "Cập nhật thông tin thành công!",
                routerName: "bottom-navigation",
                btnTxt: "ĐẾN HỒ SƠ",
                isReset: true,
            });
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Cập nhật thông tin không thành công. Vui lòng thử lại.';
            setErrors({ api: errorMessage });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.view_1}>
                <Formik
                    initialValues={{ firstName: '', lastName: '', email: '', username: '', dateOfBirth: null }}
                    validationSchema={validationSchema}
                    onSubmit={handleUpdateProfile}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        setFieldValue,
                        values,
                        errors,
                        touched,
                    }) => (
                        <>
                            <View>
                                <Text style={styles.textHeader}>
                                    Cập nhật thông tin hồ sơ của bạn
                                </Text>
                                <Text style={styles.textHeader_1}>
                                    Dữ liệu này sẽ được hiển thị trong hồ sơ tài khoản của bạn
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", width: "97%" }}>
                                <View style={[styles.view_3, { marginRight: 4 }]}>
                                    <View style={[styles.view_4]}>
                                        <FontAwesome5 name="user-edit" size={24} color={COLORS.primary} />
                                        <TextInput
                                            style={{ marginLeft: 10, flex: 1 }}
                                            placeholder={"Tên"}
                                            placeholderTextColor='gray'
                                            value={values.firstName}
                                            onChangeText={handleChange('firstName')}
                                            onBlur={handleBlur('firstName')}
                                        />
                                    </View>
                                </View>
                                <View style={styles.view_3}>
                                    <View style={styles.view_4}>
                                        <FontAwesome5 name="user-edit" size={24} color={COLORS.primary} />
                                        <TextInput
                                            style={{ marginLeft: 10, flex: 1 }}
                                            placeholder={"Họ"}
                                            placeholderTextColor='gray'
                                            value={values.lastName}
                                            onChangeText={handleChange('lastName')}
                                            onBlur={handleBlur('lastName')}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                {touched.firstName && errors.firstName && (
                                    <Text style={[styles.errorMessage, { flex: 1 }]}>{errors.firstName}</Text>
                                )}
                                {touched.lastName && errors.lastName && (
                                    <Text style={[styles.errorMessage, { flex: 1 }]}>{errors.lastName}</Text>
                                )}
                            </View>
                            <View style={[styles.view_4, { marginTop: 12 }]}>
                                <MaterialCommunityIcons name="account-outline" size={30} color={COLORS.primary} />
                                <TextInput
                                    style={{ marginLeft: 10, flex: 1 }}
                                    placeholder={"Username"}
                                    placeholderTextColor='gray'
                                    value={values.username}
                                    onChangeText={handleChange('username')}
                                    onBlur={handleBlur('username')}
                                />
                            </View>
                            {touched.username && errors.username && (
                                <Text style={styles.errorMessage}>{errors.username}</Text>
                            )}
                            <View style={[styles.view_4, { marginTop: 12 }]}>
                                <MaterialCommunityIcons name="calendar" size={30} color={COLORS.primary} />
                                <TextInput
                                    style={{ marginLeft: 10, flex: 1 }}
                                    placeholder={"MM/dd/yyyy"}
                                    placeholderTextColor='gray'
                                    value={values.dateOfBirth ? values.dateOfBirth.toLocaleDateString() : ''}
                                    onFocus={() => setDatePickerVisibility(true)}
                                    showSoftInputOnFocus={false}
                                />
                                {isDatePickerVisible && (
                                    <DateTimePicker
                                        value={values.dateOfBirth || selectedDate}
                                        mode="date"
                                        display="default"
                                        onChange={(event, date) => {
                                            setDatePickerVisibility(false);
                                            setFieldValue('dateOfBirth', date);
                                            setSelectedDate(date);
                                        }}
                                    />
                                )}
                            </View>
                            {touched.dateOfBirth && errors.dateOfBirth && (
                                <Text style={styles.errorMessage}>{errors.dateOfBirth}</Text>
                            )}
                            <View style={[styles.view_4, { marginTop: 12 }]}>
                                <MaterialCommunityIcons name="email-outline" size={30} color={COLORS.primary} />
                                <TextInput
                                    style={{ marginLeft: 10, flex: 1 }}
                                    placeholder={data?.result?.email}
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
                                    title={"CẬP NHẬT"}
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
};

export default UpdateProfile;
