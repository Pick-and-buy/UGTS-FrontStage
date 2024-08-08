import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, Switch } from 'react-native';
import { Formik } from 'formik';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import { COLORS } from '../../constants/theme';
import styles from '../css/updateAddress.style';
import dvhcvn from '../../constants/uidata';
import { deleteAddress, setDefaultAddress, updateAddress } from '../../api/user';

const UpdateAddress = ({ navigation, route }) => {
    const { user, address } = route.params;
    const [selectedCountry, setSelectedCountry] = useState('Việt Nam');
    const [selectedCity, setSelectedCity] = useState(address?.province);
    const [selectedProvince, setSelectedProvince] = useState(address?.district);
    const [selectedDistrict, setSelectedDistrict] = useState(address?.street);
    const [isEnabled, setIsEnabled] = useState(address?.default);

    useEffect(() => {
        if (address) {
            setSelectedCountry('Việt Nam');
            setSelectedCity(address.province);
            setSelectedProvince(address.district);
            setSelectedDistrict(address.street);
            setIsEnabled(address.default);

            // console.log(address.province);
            // console.log(address.district);
            // console.log(address.street);

        }
    }, [address]);

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            await updateAddress(user?.result?.id, values, address?.id);
            if (isEnabled && address?.id) {
                await setDefaultAddress(user?.result?.id, address?.id);
            }
            navigation.goBack();
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Cập nhật thông tin không thành công. Vui lòng thử lại.';
            setErrors({ api: errorMessage });
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteAddress = async () => {
        try {
            await deleteAddress(address?.id);
            navigation.goBack();
        } catch (error) {
            console.log("Delete address failed!");
        }
    }

    const handleCountryChange = (item) => {
        setSelectedCountry(item.value);
        setSelectedCity('');
        setSelectedProvince('');
        setSelectedDistrict('');
    };

    const handleCityChange = (item) => {
        setSelectedCity(item.value);
        setSelectedProvince('');
        setSelectedDistrict('');
    };

    const handleProvinceChange = (item) => {
        setSelectedProvince(item.value);
        setSelectedDistrict('');
    };

    const handleDistrictChange = (item) => {
        setSelectedDistrict(item.value);
    };

    const getProvinces = (cityName) => {
        const city = dvhcvn.data.find(city => city.name === cityName);
        return city ? city.level2s.map(level2 => ({ label: level2.name, value: level2.name })) : [];
    };

    const getDistricts = (cityName, provinceName) => {
        const city = dvhcvn.data.find(city => city.name === cityName);
        if (city) {
            const province = city.level2s.find(province => province.name === provinceName);
            return province ? province.level3s.map(level3 => ({ label: level3.name, value: level3.name })) : [];
        }
        return [];
    };

    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
    };

    const countries = [{ label: 'Việt Nam', value: 'Việt Nam' }];
    const cities = dvhcvn.data.map(city => ({ label: city.name, value: city.name }));
    const provinces = getProvinces(selectedCity);
    const districts = getDistricts(selectedCity, selectedProvince);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="keyboard-backspace" size={28} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Chỉnh sửa địa chỉ</Text>
                <TouchableOpacity
                    style={{ alignSelf: 'flex-end', marginBottom: 2, marginRight: "3%" }}
                    onPress={handleDeleteAddress}
                >
                    <Ionicons name="trash-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <View style={styles.label}>
                <Text style={styles.labelText}>Thông tin địa chỉ</Text>
            </View>
            <Formik
                initialValues={{
                    country: selectedCountry,
                    city: selectedCity,
                    province: selectedProvince,
                    district: selectedDistrict,
                    address: address?.addressLine
                }}
                onSubmit={handleSubmit}
                enableReinitialize // This ensures Formik re-initializes when initialValues change
            >
                {({ handleChange, handleBlur, setFieldValue, handleSubmit, errors, values, touched }) => (
                    <>
                        <View style={styles.formContainer}>
                            <View style={styles.dropdownContainer}>
                                <Dropdown
                                    style={styles.dropdown}
                                    data={countries}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Quốc gia"
                                    placeholderStyle={{ color: "#ccc" }}
                                    iconColor={COLORS.primary}
                                    value={selectedCountry}
                                    onChange={handleCountryChange}
                                />
                            </View>

                            <View style={styles.dropdownContainer}>
                                <Dropdown
                                    style={styles.dropdown}
                                    data={cities}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Thành phố"
                                    placeholderStyle={{ color: "#ccc" }}
                                    iconColor={COLORS.primary}
                                    value={selectedCity}
                                    onChange={(item) => {
                                        setFieldValue('city', item.value);
                                        handleCityChange(item);
                                    }}
                                />
                            </View>

                            <View style={styles.dropdownContainer}>
                                <Dropdown
                                    style={styles.dropdown}
                                    data={provinces}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Quận/Huyện"
                                    placeholderStyle={{ color: "#ccc" }}
                                    iconColor={COLORS.primary}
                                    value={selectedProvince}
                                    onChange={(item) => {
                                        setFieldValue('province', item.value);
                                        handleProvinceChange(item);
                                    }}
                                />
                            </View>

                            <View style={styles.dropdownContainer}>
                                <Dropdown
                                    style={styles.dropdown}
                                    data={districts}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Xã/Phường"
                                    placeholderStyle={{ color: "#ccc" }}
                                    iconColor={COLORS.primary}
                                    value={selectedDistrict}
                                    onChange={(item) => {
                                        setFieldValue('district', item.value);
                                        handleDistrictChange(item);
                                    }}
                                />
                            </View>

                            <TextInput
                                style={styles.input}
                                placeholderTextColor={'#ccc'}
                                placeholder="Nhập các chi tiết khác (Không bắt buộc)"
                                onChangeText={handleChange('address')}
                                onBlur={handleBlur('address')}
                                value={values.address}
                            />
                        </View>
                        <View style={styles.setting}>
                            <Text style={[styles.labelText, { marginTop: 20 }]}>Cài đặt</Text>
                            <View style={styles.toggle}>
                                <Text style={{ fontSize: 16, marginLeft: 10 }}>Đặt làm mặc định</Text>
                                <Switch
                                    trackColor={{ false: 'gray', true: '#green' }}
                                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                    style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
                                />
                            </View>
                        </View>

                        <View style={styles.bottomBtn}>
                            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                <Text style={styles.buttonText}>Lưu</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
        </SafeAreaView>
    );
};

export default UpdateAddress;
