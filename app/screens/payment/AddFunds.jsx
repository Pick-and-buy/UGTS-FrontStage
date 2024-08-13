import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../css/addFunds.style';
import { COLORS } from '../../constants/theme';
import { Icon } from 'react-native-elements';
import { charge, createPayment, getPaymentStatus } from '../../api/payment';
import { WebView } from 'react-native-webview';
import { useAuth } from "../../context/AuthContext";
// Validation Schema
const TopUpSchema = Yup.object().shape({
    amount: Yup.string().required('Vui lòng nhập số tiền bạn muốn nạp.'),
});

// Function to format money for display
const formatMoney = (amount) => {
    return amount
        .replace(/\D/g, '') // Remove non-numeric characters
        .replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Add thousand separators
};

// Function to remove dots for internal calculations
const removeDots = (amount) => {
    return amount.replace(/\./g, ''); // Remove dots
};

const AddFunds = ({ navigation }) => {
    const { user } = useAuth();
    const [amount, setAmount] = useState();
    const [activeButton, setActiveButton] = useState(null);
    const [paymentUrl, setPaymentUrl] = useState(null);
    // console.log(user.wallet.walletId);

    const handleSubmit = async (amount) => {
        try {
            const response = await createPayment(amount);
            console.log(response.result);
            setPaymentUrl(response.data.result);

        } catch (error) {
            console.error('Fetching VNpay', error);
        }
    };

    const handleStatusPayment = async (event) => {
        console.log(event.url);
        if (event.url.includes("payment-info")) {
            try {
                const status = await getPaymentStatus(event.url);
                // console.log(status);
                if (status.message === 'Transaction Failed') {
                    Alert.alert(status.message);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'add-funds' }],
                    });
                }
                if (status.message === 'Transaction Success') {
                    const rs = await charge(user?.wallet?.walletId, amount);
                    console.log(rs);
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'add-funds' }],
                    });
                    Alert.alert(rs.data.message);
                }

            } catch (error) {
                console.error('Fetching get VNpay status', error);
            }
        }

    }

    if (paymentUrl) {
        return (
            <View style={styles.webViewContainer}>
                <WebView
                    source={{ uri: paymentUrl }}
                    style={styles.webView}
                    onNavigationStateChange={(event) => handleStatusPayment(event)}
                />
            </View>

        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="keyboard-backspace" size={28} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Nạp tiền</Text>
            </View>

            <Formik
                initialValues={{ amount: '' }}
                validationSchema={TopUpSchema}
                onSubmit={values => {
                    console.log('Raw amount:', removeDots(values.amount));
                    const amount = removeDots(values.amount);
                    handleSubmit(amount);
                    setAmount(amount);
                }}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue }) => (
                    <View style={styles.wrapper}>
                        <View style={styles.money}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Nhập số tiền (₫)</Text>
                                <View style={styles.amount}>
                                    <Text style={styles.unit}>₫</Text>
                                    <TextInput
                                        style={styles.input}
                                        onChangeText={(text) => {
                                            const rawAmount = text.replace(/\D/g, '');
                                            setFieldValue('amount', formatMoney(rawAmount));
                                            setActiveButton(null);
                                        }}
                                        onBlur={() => {
                                            const rawAmount = removeDots(values.amount);
                                            setFieldValue('amount', formatMoney(rawAmount));
                                        }}
                                        value={values.amount}
                                        placeholder="0"
                                        keyboardType="numeric"
                                    />
                                </View>
                                {errors.amount && <Text style={styles.error}>{errors.amount}</Text>}
                            </View>

                            <Text style={styles.balance}>Số dư Ví hiện tại: ₫7.700</Text>

                            <View style={styles.quickAmounts}>
                                {['100000', '200000', '500000', '1000000', '2000000', '5000000'].map((amount, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={[
                                            styles.quickAmountButton,
                                            activeButton === index && styles.activeButton
                                        ]}
                                        onPress={() => {
                                            setFieldValue('amount', formatMoney(amount));
                                            setActiveButton(index);
                                        }}
                                    >
                                        <Text
                                            style={[
                                                styles.quickAmountButtonText,
                                                activeButton === index && styles.activeButtonText
                                            ]}
                                        >
                                            {formatMoney(amount)}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
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
                                <Text style={[styles.totalAmount, { fontSize: 16, color: "#aaa" }]}>₫{values.amount || '0'}</Text>
                            </View>
                            <View style={styles.total}>
                                <Text style={styles.totalLabel}>Tổng thanh toán</Text>
                                <Text style={[styles.totalAmount, { color: COLORS.primary }]}>₫{values.amount || '0'}</Text>
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
