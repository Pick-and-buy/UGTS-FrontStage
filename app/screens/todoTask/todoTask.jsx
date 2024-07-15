import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
    SafeAreaView,
} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState, useEffect } from "react";
import { NavigationContaine, useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, SIZES } from "../../constants/theme";
import styles from "../css/todoTask.style";
import TodoTaskTab from "../../navigation/TodoTaskTab";


const TodoTask = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <MaterialCommunityIcons name="keyboard-backspace" size={28} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>Danh sách việc cần làm</Text>
            </View>
            <TodoTaskTab />
        </SafeAreaView>
    );
}

export default TodoTask;

