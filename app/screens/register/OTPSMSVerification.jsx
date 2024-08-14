import React, { useState } from "react";
import { COLORS, SIZES } from "../../constants/theme.js";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, TouchableOpacity, View, Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { OtpInput } from "react-native-otp-entry";
import Button from '../../components/Button.jsx';
import BackBtn from '../../components/BackBtn.jsx';
import styles from "../css/OTPVerification.style.js";
import { verifyOtpFromSMS } from "../../api/auth.js";

const OTPSMSVerification = ({ navigation, route }) => {
    const { formData } = route.params;
    const [otp, setOtp] = useState('');


    const handleVerifyOtp = async () => {
        try {
            await verifyOtpFromSMS(formatPhoneNumber(formData.phoneNumber), otp);
            Alert.alert('Success', 'OTP verified successfully');
            navigation.navigate("register-infor-navigation", { formData: formData });
        } catch (error) {
            Alert.alert('Error', 'Failed to verify OTP. Please try again.');
        }
    };

    const formatPhoneNumber = (phoneNumber) => {
        // Remove leading 0 and prepend +84
        if (phoneNumber.startsWith('0')) {
            phoneNumber = phoneNumber.substring(1); // Remove the leading 0
        }

        return `+84 ${phoneNumber}`;
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center' }}>
            <View style={styles.wrapper}>
                <View style={styles.view_1}>
                    <View>
                        <BackBtn onPress={() => navigation.goBack()} />
                    </View>
                    <View>
                        <Text style={styles.textHeader}>Nhập mã xác nhận</Text>
                        <Text style={styles.textHeader_1}>Mã xác nhận được gửi tới {''}
                            <Text style={{ color: 'red' }}>
                                {formatPhoneNumber(formData.phoneNumber)}
                            </Text>

                        </Text>
                        <Text style={styles.textHeader_1}>Mã sẽ hết hạn trong 01:30</Text>
                    </View>

                    <View style={{ marginVertical: 22, width: SIZES.width - 72 }}>
                        <OtpInput
                            value={otp}
                            numberOfDigits={6}
                            onTextChange={setOtp}
                            focusColor={COLORS.primary}
                            focusStickBlinkingDuration={400}
                            theme={{
                                pinCodeContainerStyle: {
                                    backgroundColor: COLORS.white,
                                }
                            }}
                        />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text>Bạn chưa nhận được mã ?</Text>
                        <TouchableOpacity>
                            <Text style={{ color: COLORS.primary }}>{" "}Gửi lại mã</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: "10%" }}>
                        <Button
                            title={"TIẾP TỤC"}
                            onPress={handleVerifyOtp}
                            isValid={true}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default OTPSMSVerification;
