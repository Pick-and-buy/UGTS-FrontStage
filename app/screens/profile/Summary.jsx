import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import UserTab from './UserTab';
import styles from '../css/summary.style';
import { COLORS } from '../../constants/theme';

const Summary = ({ navigation, route }) => {
    const { user, initialTab } = route.params;

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="keyboard-backspace" size={28} color="black" />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.black }}>
                    {user?.lastName} {user?.firstName}
                </Text>
                <Feather
                    onPress={() => console.warn('More Function')}
                    name="user-plus"
                    size={26}
                    color="black"
                />
            </View>
            <UserTab user={user} initialTab={initialTab} />
        </View>
    );
};

export default Summary;
