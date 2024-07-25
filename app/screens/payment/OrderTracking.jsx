import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../constants/theme';

const OrderTracking = ({ status }) => {
  status = 'DELIVERED'
  const steps = [
    { key: 'PENDING', label: 'Đã đặt hàng' },
    { key: 'PROCESSING', label: 'Đang chờ đơn vị vận chuyển' },
    { key: 'DELIVERED', label: 'Đang vận chuyển' },
    { key: 'RECEIVED', label: 'Đơn hàng đã được giao' },
    { key: 'COMPLETED', label: 'Hoàn thành' }
  ];

  const getStatusIndex = (status) => steps.findIndex(step => step.key === status);

  const currentIndex = getStatusIndex(status);

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
        {steps.map((step, index) => (
          <React.Fragment key={step.key}>
            <View style={styles.step}>
              {index < currentIndex ? (
                <Icon name="check-circle" size={24} color="#2490A9" />
              ) : index === currentIndex ? (
                <View style={{ backgroundColor: '#2490A9', borderRadius: 30, padding: 2.5, justifyContent: 'center', alignItems: 'center' }}>
                  <Icon name="package-variant-closed" size={16} color="#fff" />
                </View>
              ) : (
                <Icon name="checkbox-blank-circle-outline" size={24} color="#aaa" />
              )}
              <Text style={styles.stepText}>{step.label}</Text>
            </View>
            {index < steps.length - 1 && (
              <View style={index < currentIndex ? styles.line : styles.dottedLine} />
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 20
  },
  tracking: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  step: {
    alignItems: 'center',
    marginTop: -8.5,
    marginVertical: 2
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
