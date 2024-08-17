import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Switch } from 'react-native';
import { Formik } from 'formik';
import { Ionicons, Feather,MaterialCommunityIcons } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import { COLORS } from '../../constants/theme';
import styles from '../css/createAddress.style';
import dvhcvn from '../../constants/uidata';
import { createAddress, setDefaultAddress } from '../../api/user';

const CreateAddress = ({ navigation, route }) => {
    const user = route.params;
    // console.log(user?.result?.id);
    const [selectedCountry, setSelectedCountry] = useState('Việt Nam');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedProvince, setSelectedProvince] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    // console.log(addressId);
    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        // console.log(values.country);

        try {
            const response = await createAddress(user?.result?.id, values);
            const addressId = response?.result?.id;
            if (isEnabled && addressId) {
                await setDefaultAddress(user?.result?.id, addressId);
            }
            navigation.goBack();
        } catch (err) {
            const errorMessage = err.response?.data?.message || err.message || 'Tạo thông tin địa chỉ không thành công. Vui lòng thử lại.';
            setErrors({ api: errorMessage });
        } finally {
            setSubmitting(false);
        }
    };

    const handleCountryChange = (item) => {
        setSelectedCountry(item.value);
        setSelectedCity('');
        setSelectedProvince('');
        setSelectedDistrict('');
        // console.log("Selected Country:", item.value);
    };

    const handleCityChange = (item) => {
        setSelectedCity(item.value);
        setSelectedProvince('');
        setSelectedDistrict('');
        // console.log("Selected City:", item.value);
    };

    const handleProvinceChange = (item) => {
        setSelectedProvince(item.value);
        setSelectedDistrict('');
        // console.log("Selected Province:", item.value);
    };

    const handleDistrictChange = (item) => {
        setSelectedDistrict(item.value);
        // console.log("Selected District:", item.value);
    };

    const getProvinces = (cityName) => {
        const city = dvhcvn.data.find(city => city.name === cityName);
        const provinces = city ? city.level2s.map(level2 => ({ label: level2.name, value: level2.name })) : [];
        // console.log("Provinces:", provinces);
        return provinces;
    };

    const getDistricts = (cityName, provinceName) => {
        const city = dvhcvn.data.find(city => city.name === cityName);
        if (city) {
            const province = city.level2s.find(province => province.name === provinceName);
            const districts = province ? province.level3s.map(level3 => ({ label: level3.name, value: level3.name })) : [];
            // console.log("Districts:", districts);
            return districts;
        }
        return [];
    };

    const countries = [{ label: 'Việt Nam', value: 'Việt Nam' }];

    const cities = dvhcvn.data.map(city => ({ label: city.name, value: city.name }));

    const provinces = getProvinces(selectedCity);

    const districts = getDistricts(selectedCity, selectedProvince);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="keyboard-backspace" size={28} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                    Tạo mới địa chỉ
                </Text>
            </View>
            <View style={styles.label}>
                <Text style={styles.labelText}>Thông tin địa chỉ</Text>
            </View>
            <Formik
                initialValues={{
                    country: selectedCountry,
                    city: '',
                    province: '',
                    district: '',
                    street: '',
                    address: ''
                }}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleBlur, setFieldValue, handleSubmit, errors, values, touched }) => (
                    <><View style={styles.formContainer}>
                        {/* Country Dropdown */}
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
                                onChange={handleCountryChange} />
                        </View>

                        {/* City Dropdown */}
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
                                }} />
                        </View>

                        {/* Province Dropdown */}
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
                                }} />
                        </View>

                        {/* District Dropdown */}
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
                                }} />
                        </View>

                        {/* Address Input */}
                        <TextInput
                            style={styles.input}
                            placeholderTextColor={'#ccc'}
                            placeholder="Nhập các chi tiết khác (Không bắt buộc)"
                            onChangeText={handleChange('address')}
                            onBlur={handleBlur('address')}
                            value={values.address} />

                        {/* Submit Button */}
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
        </View>
    );
};

export default CreateAddress;
