import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import React, { useCallback, useState } from 'react';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from '../css/addFunds.style';
import { COLORS } from '../../constants/theme';
import { Icon } from 'react-native-elements';
import { charge, createPayment, getPaymentStatus } from '../../api/payment';
import { WebView } from 'react-native-webview';
import { useAuth } from "../../context/AuthContext";
import { useFocusEffect } from '@react-navigation/native';

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
    const { user, fetchUserData, isAuthenticated } = useAuth();
    const [amount, setAmount] = useState();
    const [activeButton, setActiveButton] = useState(null);
    const [paymentUrl, setPaymentUrl] = useState(null);
    const [showWebView, setShowWebView] = useState(false); // New state for controlling WebView visibility
    const [isProcessing, setIsProcessing] = useState(false); // Flag to prevent multiple processing

    useFocusEffect(
        useCallback(() => {
            if (isAuthenticated) {
                fetchUserData();
            }
        }, [isAuthenticated])
    );

    const handleSubmit = async (amount) => {
        try {
            const response = await createPayment(amount);
            setPaymentUrl(response.data.result);
            setShowWebView(true); // Show the WebView
        } catch (error) {
            console.log('Fetching VNpay', error);
        }
    };

    const handleStatusPayment = async (event) => {
        if (event.url.includes("payment-info") && !isProcessing) {
            setIsProcessing(true);  // Set flag to prevent multiple calls
            try {
                const status = await getPaymentStatus(event.url);
                setShowWebView(false); // Hide the WebView regardless of the outcome

                if (status.message === 'Transaction Failed') {
                    Alert.alert(status.message);
                    await fetchUserData();
                }
                if (status.message === 'Transaction Success') {
                    const rs = await charge(user?.wallet?.walletId, amount);
                    Alert.alert(rs.data.message);
                    await fetchUserData();
                }
            } catch (error) {
                console.log('Fetching VNpay status', error);
            } finally {
                setIsProcessing(false);  // Reset the flag if needed
            }
        }
    };

    return (
        <View style={styles.container}>
            {showWebView && paymentUrl ? ( // Conditionally render WebView
                <View style={styles.webViewContainer}>
                    <WebView
                        source={{ uri: paymentUrl }}
                        style={styles.webView}
                        onNavigationStateChange={(event) => handleStatusPayment(event)}
                    />
                </View>
            ) : (
                <View>
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Profile')}>
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

                                    <Text style={styles.balance}>Số dư ví hiện tại: ₫ {formatMoney(String(user?.wallet?.balance))}</Text>

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
                                        <Text style={styles.paymentMethodInfo}>Phương thức thanh toán ví VNPay</Text>
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
                                    của LuxBagPay
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
            )}
        </View>
    );
};

export default AddFunds;
