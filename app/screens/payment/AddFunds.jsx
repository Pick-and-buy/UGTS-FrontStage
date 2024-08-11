import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { Ionicons, Feather, AntDesign, MaterialIcons, MaterialCommunityIcons, Entypo, FontAwesome6, SimpleLineIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../css/addFunds.style'
import { COLORS } from '../../constants/theme';
import { Button, Icon } from 'react-native-elements';
const TopUpSchema = Yup.object().shape({
    amount: Yup.number().required('Vui lòng nhập số tiền bạn muốn nạp.'),
});

const AddFunds = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="keyboard-backspace" size={28} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                    Nạp tiền
                </Text>
            </View>

            <Formik
                initialValues={{ amount: '' }}
                validationSchema={TopUpSchema}
                onSubmit={values => {
                    console.log(values);
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                    <View style={styles.wrapper}>
                        <View style={styles.money}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Nhập số tiền (₫)</Text>
                                <View style={styles.amount}>
                                    <Text style={styles.unit}>₫</Text>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={handleChange('amount')}
                                        onBlur={handleBlur('amount')}
                                        value={values.amount}
                                        placeholder="0"
                                        keyboardType="numeric"
                                    />
                                </View>
                                {errors.amount && <Text style={styles.error}>{errors.amount}</Text>}
                            </View>

                            <Text style={styles.balance}>Số dư Ví hiện tại: ₫7.700</Text>

                            <View style={styles.quickAmounts}>
                                <TouchableOpacity style={styles.quickAmountButton}>
                                    <Text style={styles.quickAmountButtonText}>100.000</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.quickAmountButton}>
                                    <Text style={styles.quickAmountButtonText}>200.000</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.quickAmountButton}>
                                    <Text style={styles.quickAmountButtonText}>500.000</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.quickAmountButton}>
                                    <Text style={styles.quickAmountButtonText}>1.000.000</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.quickAmountButton}>
                                    <Text style={styles.quickAmountButtonText}>2.000.000</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.quickAmountButton}>
                                    <Text style={styles.quickAmountButtonText}>5.000.000</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.paymentMethod}>
                                <Icon name="wallet" type="entypo" />
                                <Text style={styles.paymentText}>Phương thức thanh toán</Text>
                                <Text style={styles.paymentMethodInfo}>Please enter top up amount.</Text>
                            </View>
                        </View>

                        <View style={styles.totalContainer}>
                            <Text style={styles.totalLabel}>Tổng thanh toán</Text>
                            <Text style={styles.totalAmount}>₫0</Text>
                        </View>

                        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                            <Text style={styles.submitText}>Nạp tiền ngay</Text>
                        </TouchableOpacity>

                        <Text style={styles.footerNote}>
                            Nhấn “Nạp tiền ngay”, bạn đã đồng ý tuân theo Điều khoản sử dụng và Chính sách bảo mật của ShopeePay
                        </Text>
                    </View>
                )}
            </Formik>
        </View>
    );
};

export default AddFunds;
