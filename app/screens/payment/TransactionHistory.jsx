import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../css/transactionHistory.style';

import { useAuth } from '../../context/AuthContext';
import { getTransactionHistory } from '../../api/payment';

const TransactionHistory = ({ navigation }) => {
    const { user } = useAuth();
    const [transactions, setTransactions] = useState([]);
    const [activeFilter, setActiveFilter] = useState('ALL');

    useEffect(() => {
        if (user) {
            fetchTransactionHistory();
        }
    }, [user]);

    const fetchTransactionHistory = async () => {
        try {
            const response = await getTransactionHistory();
            setTransactions(response.result);
        } catch (error) {
            console.log('Error fetching transaction history', error);
        }
    };

    const formatMoney = (amount) => {
        return amount
            .replace(/\D/g, '') // Remove non-numeric characters
            .replace(/\B(?=(\d{3})+(?!\d))/g, "."); // Add thousand separators
    };

    const isMoneyIn = (transactionType) => {
        return (
            transactionType === 'DEPOSIT_TO_WALLET' ||
            transactionType === 'REFUND' ||
            transactionType === 'RECEIVE_ORDER_MONEY'
        );
    };

    const filteredTransactions = transactions.filter(transaction => {
        if (activeFilter === 'ALL') return true;
        if (activeFilter === 'MONEY_IN') return isMoneyIn(transaction.transactionType);
        if (activeFilter === 'MONEY_OUT') return !isMoneyIn(transaction.transactionType);
    }).reverse(); // Reverse the transactions to show the latest first

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
                    <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('Home')}>
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
                    <TouchableOpacity 
                        style={activeFilter === 'ALL' ? styles.filterButtonActive : styles.filterButton}
                        onPress={() => setActiveFilter('ALL')}
                    >
                        <Text style={activeFilter === 'ALL' ? styles.filterButtonTextActive : styles.filterButtonText}>
                            Tất cả
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={activeFilter === 'MONEY_OUT' ? styles.filterButtonActive : styles.filterButton}
                        onPress={() => setActiveFilter('MONEY_OUT')}
                    >
                        <Text style={activeFilter === 'MONEY_OUT' ? styles.filterButtonTextActive : styles.filterButtonText}>
                            Tiền ra
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={activeFilter === 'MONEY_IN' ? styles.filterButtonActive : styles.filterButton}
                        onPress={() => setActiveFilter('MONEY_IN')}
                    >
                        <Text style={activeFilter === 'MONEY_IN' ? styles.filterButtonTextActive : styles.filterButtonText}>
                            Tiền vào
                        </Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.lists}>
                    {filteredTransactions.map((transaction, index) => (
                        <View key={index} style={styles.item}>
                            <View style={styles.half}>
                                <Text numberOfLines={1} style={styles.itemTitle}>{transaction?.reason}</Text>
                                <Text
                                    style={isMoneyIn(transaction?.transactionType) ? styles.moneyIn : styles.moneyOut}
                                >
                                    {isMoneyIn(transaction?.transactionType)
                                        ? `+${formatMoney(String(transaction?.amount))} VND`
                                        : `-${formatMoney(String(transaction.amount))} VND`}
                                </Text>
                            </View>
                            <View style={styles.half}>
                                <Text numberOfLines={1} style={styles.itemDetailsText}>{transaction?.createDate}</Text>
                                <Text numberOfLines={1} style={styles.itemDetailsText}>Mã GD: {transaction?.id}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

export default TransactionHistory;
