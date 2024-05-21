import React from "react"
import { COLORS, SIZES } from "../../constants/theme.js";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { OtpInput } from "react-native-otp-entry";
import Button from '../../components/Button.jsx';
import BackBtn from '../../components/BackBtn.jsx';
import styles from "../css/OTPVerification.style.js";

const OTPVerification = ({ navigation, route }) => {
    const type = route.params;
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center' }}>

            <View style={styles.wrapper}>
                <View style={styles.view_1}>
                    <View>
                        <BackBtn onPress={() => navigation.navigate('info-method-navigation', type)} />
                        <TouchableOpacity style={{
                            position: "absolute",
                            zIndex: 999,
                            top: SIZES.large - 45,
                            right: 25,
                        }}>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.textHeader}>
                            Nhập mã xác nhận
                        </Text>
                        <Text style={styles.textHeader_1}>
                            Mã xác nhận được gửi tới {type}
                        </Text>

                        <Text style={styles.textHeader_1}>
                            Mã sẽ hết hạn trong 01:30
                        </Text>
                    </View>

                    <View style={{ marginVertical: 22, width: SIZES.width - 72 }}>
                        <OtpInput
                            numberOfDigits={6}
                            onTextChange={(text) => console.log(text)}
                            focusColor={COLORS.primary}
                            focusStickBlinkingDuration={400}
                            theme={{
                                pinCodeContainerStyle: {
                                    backgroundColor: COLORS.white,
                                }
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Text>Bạn chưa nhận được mã ?</Text>
                        <TouchableOpacity
                            style={{}}
                            onPress={() => navigation.navigate("")}
                        >
                            <Text style={{ color: COLORS.primary }}>{" "}Gửi lại mã</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: "10%" }}>
                        <Button
                            title={"TIẾP TỤC"}
                            onPress={() => navigation.navigate("reset-password-navigation")}
                            isValid={true}
                        />
                    </View>

                </View>
            </View>


        </SafeAreaView>
    );
}

export default OTPVerification

