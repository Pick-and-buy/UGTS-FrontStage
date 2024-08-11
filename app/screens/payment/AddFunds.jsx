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

const AddFunds = ({ navigation }) => {
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
                            <View style={styles.divider} />
                            <TouchableOpacity style={styles.paymentMethod}>
                                <Icon name="wallet" type="entypo" color={COLORS.primary} />
                                <Text style={styles.paymentText}>Phương thức thanh toán</Text>
                                <Text style={styles.paymentMethodInfo}>Vui lòng chọn phương thức thanh toán</Text>
                                <Entypo name="chevron-right" size={32} color="#aaa"
                                    style={{ position: "absolute", right: 10 }}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.totalContainer}>
                            <View style={styles.total}>
                                <Text style={[styles.totalLabel, { fontSize: 16, color: "#aaa" }]}>Nạp tiền</Text>
                                <Text style={[styles.totalAmount, { fontSize: 16, color: "#aaa" }]}>₫0</Text>
                            </View>
                            <View style={styles.total}>
                                <Text style={styles.totalLabel}>Tổng thanh toán</Text>
                                <Text style={[styles.totalAmount, { color: COLORS.primary }]}>₫0</Text>
                            </View>
                        </View>

                        <Text style={styles.footerNote}>
                            Nhấn “Nạp tiền ngay”, bạn đã đồng ý tuân theo {" "}
                            <Text style={styles.highlightText}>Điều khoản sử dụng</Text> và {" "}
                            <Text style={styles.highlightText}>Chính sách bảo mật </Text>
                            của GiatotPay
                        </Text>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                                <Text style={styles.submitText}>Nạp tiền ngay</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
        </View>
    );
};

export default AddFunds;
