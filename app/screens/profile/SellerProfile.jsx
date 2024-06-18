import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    SafeAreaView,
} from "react-native";
import { Ionicons, Feather } from '@expo/vector-icons';
import { COLORS } from "../../constants/theme";
import { Rating } from 'react-native-stock-star-rating'
import { MaterialIcons } from '@expo/vector-icons';
import styles from "../css/sellerProfile.style";
const SellerProfile = ({ navigation, route }) => {
    const user = route.params;
    // console.log(user);

    const profile =
        "https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg";

    return (
        <SafeAreaView>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Ionicons
                        onPress={() => navigation.goBack()}
                        name="chevron-back-outline"
                        size={30}
                        color={COLORS.gray} />
                    <Text style={{ fontSize: 24, fontWeight: "bold", color: COLORS.black }}>THÔNG TIN NGƯỜI BÁN</Text>
                    <Feather
                        onPress={() => console.warn('More Function')}
                        name="more-horizontal"
                        size={35}
                        color="gray" />

                </View>

                <View style={styles.shadow}>
                    {/* Tạo Khoảng Trống */}
                </View>

                {/* Personal Information */}
                <View style={styles.personalContainer}>
                    <View style={[styles.detailContainer, { alignItems: 'flex-start' }]}>
                        <Image
                            style={styles.avatar}
                            source={{ uri: user?.avatar }}
                        />
                        <View style={{ gap: 5 }}>
                            <Text style={{ fontSize: 18 }}>
                                {user?.username}
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Rating
                                    stars={4.7}
                                    maxStars={5}
                                    size={16}

                                />
                                <Text style={{ fontSize: 12, marginLeft: 4, marginTop: 4 }}>(100)</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <MaterialIcons name="verified-user" size={16} color="#699BF7" style={{ marginTop: 0, marginLeft: 0 }} />
                                <Text style={{ fontSize: 12 }}>Tài khoản đã xác minh</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("")}
                            style={styles.followBtn}
                        >
                            <Text style={{ margin: 5, color: COLORS.primary }}>Theo dõi</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Follower */}
                <View style={styles.followerView}>
                    <Text>
                        100 <Text>người theo dõi</Text>
                    </Text>
                    <Text>
                        60 <Text>người đang theo dõi</Text>
                    </Text>
                </View>

                {/* User product */}

            </View>
        </SafeAreaView>
    )
}

export default SellerProfile;

