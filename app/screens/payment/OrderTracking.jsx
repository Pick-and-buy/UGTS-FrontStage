import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';

const OrderTracking = ({status}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Feather name="package" size={40} color="#2490A9" />
        <View>
          <Text style={styles.title}>Đã đặt hàng</Text>
          <Text style={styles.subtitle}>Ngày giao hàng dự kiến • 4 July - 6 July</Text>
        </View>
      </View>
      <View style={styles.trackingContainer}>
        <View style={styles.tracking}>
          <View style={[styles.step, { marginBottom: 15 }]}>
            <Icon name="check-circle" size={24} color="#2490A9" />
            <Text style={styles.stepText}>Đã đặt hàng</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.step}>
            <Icon name="check-circle" size={24} color="#2490A9" />
            <Text style={styles.stepText}>Đang chờ đơn vị vận chuyển</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.step}>
            <Icon name="check-circle" size={24} color="#2490A9" />
            <Text style={styles.stepText}>Đang vận chuyển</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.step}>
            <View style={{ backgroundColor: '#2490A9',borderRadius:30,padding:2.5 }}>
              <Icon name="package-variant-closed" size={16} color="#fff" />
            </View>
            <Text style={styles.stepText}>Đơn hàng đã được giao</Text>
          </View>
          <View style={styles.dottedLine} />
          <View style={[styles.step, { marginBottom: 15 }]}>
            <Icon name="checkbox-blank-circle-outline" size={24} color="#aaa" />
            <Text style={styles.stepText}>Hoàn thành</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
  },
  trackingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tracking: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  step: {
    alignItems: 'center',
  },
  stepText: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    marginTop: 4,
    width: 80,
  },
  line: {
    width: 60,
    height: 6,
    backgroundColor: '#2490A9',
    marginBottom: 35,
    marginHorizontal: -32
  },
  dottedLine: {
    width: 60,
    borderTopWidth: 6,
    borderTopColor: '#2490A9',
    borderStyle: 'dotted',
    marginBottom: 35,
    marginHorizontal: -32,
  },
});

export default OrderTracking;
