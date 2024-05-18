import React from 'react';
import { View, Text, TextInput, Input } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import Register from './Register.jsx';
import styles from "../css/registerInformation.style.js";
import Button from '../../components/Button.jsx';
import BackBtn from '../../components/BackBtn.jsx';
import { COLORS } from '../../constants/theme.js';

const RegisterInformation = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.wrapper}>
            <View style={styles.view_1}>
                <BackBtn />
                <View>
                    <Text style={styles.textHeader}>
                        Điền thông tin của bạn để bắt đầu
                    </Text>
                    <Text style={styles.textHeader_1}>
                        Dữ liệu này sẽ được hiển thị trong hồ sơ tài khoản của bạn
                    </Text>
                </View>
                <View style={styles.view_3}>
                    <FontAwesome5 name="user-edit" size={24} color={COLORS.primary} />
                    <TextInput
                        style={{ marginLeft: 10, flex: 1 }}
                        placeholder='Tên'
                        placeholderTextColor='gray'
                    />
                </View>
                <View style={[styles.view_3, { marginTop: 25 }]}>
                    <FontAwesome5 name="user-edit" size={24} color={COLORS.primary} />
                    <TextInput
                        style={{ marginLeft: 10, flex: 1 }}
                        placeholder='Họ'
                        placeholderTextColor='gray'
                    />
                </View>
                <View style={[styles.view_3, { marginTop: 25,marginBottom: 25 }]}>
                    <MaterialCommunityIcons name="email-outline" size={30} color={COLORS.primary} />
                    <TextInput
                        style={{ marginLeft: 10, flex: 1 }}
                        placeholder='Email'
                        placeholderTextColor='gray'
                    />
                </View>
                <View>
                    <Button
                        title={"TIẾP TỤC"}
                        onPress={navigation.navigate("payment-method-navigation")}
                        isValid={true}
                    />
                </View>

            </View>
        </View>
    );
}

export default RegisterInformation; 
