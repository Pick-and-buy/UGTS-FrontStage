import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../css/transactionHistory.style';

import { useAuth } from '../../context/AuthContext';

const TransactionHistory = ({ navigation }) => {
    const { user } = useAuth();


    const formatMoney = (amount) => {
        return amount
            .replace(/\D/g, '') // Remove non-numeric characters
            .replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Add thousand separators
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                style={styles.wrapper}
                colors={['rgba(61,174,240,1)', 'rgba(38,118,181,1)']}
                start={{ x: 0.15, y: 1 }}
                end={{ x: 1, y: 0 }}
            >
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <MaterialCommunityIcons name="keyboard-backspace" size={28} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>
                        {user?.lastName} {user?.firstName}
                    </Text>
                    <TouchableOpacity style={styles.homeButton}>
                        <Ionicons
                            name='home'
                            color='white'
                            size={24}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.wallet}>
                    <Text style={styles.walletTitle}>Số dư khả dụng</Text>
                    <Text style={styles.walletMoney}>{formatMoney(String(user?.wallet?.balance))} VND</Text>
                </View>
            </LinearGradient>

            <View style={styles.content}>
                <View style={styles.filter}>
                    <TouchableOpacity style={styles.filterButtonActive}>
                        <Text style={styles.filterButtonTextActive}>Tất cả</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterButton}>
                        <Text style={styles.filterButtonText}>Tiền ra</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.filterButton}>
                        <Text style={styles.filterButtonText}>Tiền vào</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.lists}>
                    <View style={styles.item}>
                        <View style={styles.half}>
                            <Text style={styles.itemTitle}>Nap tien VNpay</Text>
                            <Text style={styles.moneyIn}>+{formatMoney(String(13000))} VND</Text>
                        </View>
                        <View style={styles.half}>
                            <Text style={styles.itemDetailsText}>21/08/2024 21:34:19</Text>
                            <Text style={styles.itemDetailsText}>Mã GD: 012345678910</Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.half}>
                            <Text style={styles.itemTitle}>Nap tien VNpay</Text>
                            <Text style={styles.moneyIn}>+{formatMoney(String(13000))} VND</Text>
                        </View>
                        <View style={styles.half}>
                            <Text style={styles.itemDetailsText}>21/08/2024 21:34:19</Text>
                            <Text style={styles.itemDetailsText}>Mã GD: 012345678910</Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.half}>
                            <Text style={styles.itemTitle}>Nap tien VNpay</Text>
                            <Text style={styles.moneyIn}>+{formatMoney(String(13000))} VND</Text>
                        </View>
                        <View style={styles.half}>
                            <Text style={styles.itemDetailsText}>21/08/2024 21:34:19</Text>
                            <Text style={styles.itemDetailsText}>Mã GD: 012345678910</Text>
                        </View>
                    </View>
                    <View style={styles.item}>
                        <View style={styles.half}>
                            <Text style={styles.itemTitle}>Nap tien VNpay</Text>
                            <Text style={styles.moneyIn}>+{formatMoney(String(13000))} VND</Text>
                        </View>
                        <View style={styles.half}>
                            <Text style={styles.itemDetailsText}>21/08/2024 21:34:19</Text>
                            <Text style={styles.itemDetailsText}>Mã GD: 012345678910</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}

export default TransactionHistory;
