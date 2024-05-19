import React from 'react';
import { View, Text, TextInput, Input, TouchableOpacity, Image } from 'react-native';
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from "../screens/css/paymentMethod.style.js";
import Button from '../components/Button.jsx';
import BackBtn from '../components/BackBtn.jsx';
import { COLORS, SIZES } from '../constants/theme.js';

const PaymentMethod = ({ navigation }) => {

    return (
        <View style={styles.wrapper}>
            <View style={styles.view_1}>
                <View>
                    <BackBtn onPress={() => navigation.navigate('register-infor-navigation')}/>
                    <TouchableOpacity style={{
                            position: "absolute",
                            zIndex: 999,
                            top: SIZES.large - 45,
                            right: 25,
                        }}>
                        <Text style={{fontSize: 24,color:"#2566AF",}}>Bỏ qua</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.textHeader}>
                        Cập nhật phương thức thanh toán
                    </Text>
                    <Text style={styles.textHeader_1}>
                        Thêm phương thức thanh toán để việc mua hàng của bạn trở nên dễ dàng
                    </Text>
                </View>
                <TouchableOpacity style={styles.view_3}>
                    <Image
                        source={require('../../assets/images/paypal_logo.png')}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.view_3}>
                    <Image
                        source={require('../../assets/images/visa_logo.png')}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.view_3}>
                    <Image
                        source={require('../../assets/images/Payoneer_logo.png')}
                    />
                </TouchableOpacity>
                <View>
                    <Button
                        title={"TIẾP TỤC"}
                        onPress={() => navigation.navigate("payment-method-navigation")}
                        isValid={true}
                    />
                </View>

            </View>
        </View>
    );
}

export default PaymentMethod; 
