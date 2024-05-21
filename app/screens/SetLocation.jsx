import { Image, Text, TouchableOpacity, View, Platform, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from "../screens/css/setLocation.style.js";
import Button from '../components/Button.jsx';
import BackBtn from '../components/BackBtn.jsx';
import { COLORS, SIZES, SHADOWS } from '../constants/theme.js';
import * as Location from 'expo-location';


const SetLocation = ({ navigation }) => {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        getCurrentLocation();
    }, []);

    let text = 'Waiting..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    const getCurrentLocation = async () => {

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let location = await Location.getCurrentPositionAsync({});
        let address = await Location.reverseGeocodeAsync(location.coords);
        setLocation(address);

    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.view_1}>
                <View>
                    <BackBtn onPress={() => navigation.navigate('upload-photo-navigation')} />
                    <TouchableOpacity style={{
                        position: "absolute",
                        zIndex: 999,
                        top: SIZES.large - 45,
                        right: 25,
                    }}>
                        <Text 
                            style={{ fontSize: 24, color: "#2566AF", }}
                            onPress={() => navigation.navigate('payment-method-navigation')}
                        >Bỏ qua</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.textHeader}>
                        Thiết lập vị trí của bạn
                    </Text>
                    <Text style={styles.textHeader_1}>
                        Thiết lập vị trí của bạn để dễ dàng khám phá các sản phẩm ở gần
                    </Text>
                </View>

                <View style={styles.view_3}>
                    <View style={{ flex: 1, flexDirection: 'row', position: "absolute", left: 20, top: 15 }}>
                        <Image
                            source={require('../../assets/images/pin_logo.png')}
                        />
                        <Text style={{ marginTop: 5, marginLeft: 10 }}>Vị trí của bạn</Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            height: "50%",
                            width: "100%",
                            borderRadius: 20,
                            backgroundColor: "#F6F6F6",
                            alignItems: 'center',
                            justifyContent: 'center',
                            top: 25,
                        }}
                        onPress={() => getCurrentLocation()}
                    >
                        {!location && <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Thiết lập vị trí</Text>}
                        {location && <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{location[0].formattedAddress}</Text>}
                    </TouchableOpacity>
                </View>


                <View>
                    <Button
                        title={"TIẾP TỤC"}
                        onPress={() => navigation.navigate("payment-method-navigation")}
                        isValid={true}
                    />
                </View>

            </View>
        </View>
    )
}

export default SetLocation
