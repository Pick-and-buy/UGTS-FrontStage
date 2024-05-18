import React from 'react';
import { StyleSheet, View, Text, Button, TextInput, Input, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from "../../constants/theme";
import Register from './register';

const RegisterInformation = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.view_1}>
            <View style={styles.view_2}>
                <AntDesign
                    onPress={() => navigation.navigate(Register)}
                    name="left" size={30} color="red" />
            </View>
            <View>
                <Text style={styles.textHeader}>
                    Điền thông tin của bạn để bắt đầu
                </Text>
                <Text style={styles.textHeader_1}>
                    Dữ liệu này sẽ được hiển thị trong hồ sơ tài khoản của bạn
                </Text>
            </View>
            <View style={styles.view_3}>
                <FontAwesome5 name="user-edit" size={24} color="#FA7494" />
                <TextInput
                    style={{marginLeft: 10}}
                    placeholder='Tên'
                    placeholderTextColor='gray'
                />
            </View>
            <View style={[styles.view_3, {marginTop: 25}]}>
                <FontAwesome5 name="user-edit" size={24} color="#FA7494" />
                <TextInput
                    style={{marginLeft: 10}}
                    placeholder='Họ'
                    placeholderTextColor='gray'
                />
            </View>
            <View style={[styles.view_3, {marginTop: 25}]}>
            <MaterialCommunityIcons name="email-outline" size={30} color="#FA7494" />
                <TextInput
                    style={{marginLeft: 10}}
                    placeholder='Email'
                    placeholderTextColor='gray'
                />
            </View>
            <View style={styles.button}>
                    <Text
                        style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}
                    >
                        Tiếp Tục
                    </Text>
                </View>
        </View>
    );
}

export default RegisterInformation;

const styles = StyleSheet.create({
    view_1: {
        flex: 1,
        marginTop: 100,
        marginLeft: 20,
    },
    view_2: {
        borderWidth: 2,
        borderRadius: 20,
        width: '20%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#F8D4DC',
        borderColor: '#F8D4DC'
    },
    textHeader: {
        marginTop: 20,
        width: '80%',
        height: 100,
        fontSize: 35,
        fontWeight: '800'
    },
    textHeader_1: {
        marginTop: 20,
        width: '80%',
        height: 100,
        fontSize: 20,
    },
    view_3: {
        flexDirection: 'row',
        borderWidth: 2,
        borderRadius: 20,
        width: '95%',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: 'white',
        borderColor: COLORS.lightWhite
    },
    button: {
        backgroundColor: COLORS.primary,
        borderRadius: 20,
        width: 200,
        height: 50,
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,

    },

})
