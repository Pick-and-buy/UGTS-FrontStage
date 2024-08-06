import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { FontAwesome6, Entypo, Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme'
import styles from '../css/createPostGuide.style'
import Slider from '../home/Slider'
const CreatePostGuide = ({ navigation }) => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.heading}>Đăng bài</Text>
                <Image
                    source={require('../../../assets/images/beginner.png')}
                    style={styles.icon}
                />
            </View>

            <View style={styles.divider} />

            <View style={styles.news}>
                <Image
                    source={require('../../../assets/images/Advertising.png')}
                    style={styles.newsImage}
                />
            </View>

            <View style={styles.optionsWrapper}>
                <Text style={styles.title}>Tùy chọn</Text>
                <View style={styles.options}>
                    <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("quick-create-post")}>
                        <FontAwesome6 name="bolt-lightning" size={28} color="black" />
                        <Text style={styles.text}>Đăng bài nhanh</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("create-post")}>
                        <Entypo name="news" size={28} color="black" />
                        <Text style={styles.text}>Đăng bài chi tiết</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.guide}>
                <View style={styles.outline}>
                    <View style={styles.outlineHeader}>
                        <Image
                            source={require('../../../assets/images/beginner.png')}
                            style={styles.outlineImage}
                        />
                        <Text style={styles.title}>Hướng dẫn cho người mới</Text>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.text}>Giao dịch</Text>
                            <Feather style={{ right: -10 }} name="chevron-right" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.text}>Đóng gói</Text>
                            <Feather style={{ right: -10 }} name="chevron-right" size={24} color="black" />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.text}>Vận chuyển</Text>
                            <Feather style={{ right: -10 }} name="chevron-right" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CreatePostGuide
