import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { format, addDays } from 'date-fns';
const OrderTracking = ({ status, orderDate, deliveryDateFrom, deliveryDateTo }) => {
  const steps = [
    { key: 'PENDING', label: 'Đã đặt hàng' },
    { key: 'PROCESSING', label: 'Người bán đang chuẩn bị hàng' },
    { key: 'DELIVERED', label: 'Đang vận chuyển' },
    { key: 'RECEIVED', label: 'Đơn hàng đã được giao' },
    { key: 'COMPLETED', label: 'Hoàn thành' }
  ];

  const getStatusIndex = (status) => steps.findIndex(step => step.key === status);
  const getStatusLabel = (status) => steps.find(step => step.key === status)?.label;

  const currentIndex = getStatusIndex(status);
  const currentLabel = getStatusLabel(status);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            padding: 5,
            borderWidth: 1,
            borderRadius: 99,
            borderColor: '#ccc',
            marginLeft: 8,
            marginRight: 8,
          }}>
          <MaterialCommunityIcons name="package-variant-closed" size={40} color="#2490A9" />
        </View>
        <View>
          <Text style={styles.title}>{currentLabel}</Text>
          {status === "PENDING" ? (
            <Text style={styles.subtitle}>Thời gian đặt hàng • {orderDate ? format(orderDate, 'dd/MM/yy HH:mm:ss') : ''}</Text>
          ) : (
            <Text style={styles.subtitle}>Ngày giao hàng dự kiến • {deliveryDateFrom ? format(deliveryDateFrom, 'MMM d') : ''} - {deliveryDateTo ? format(deliveryDateTo, 'MMM d') : ''}</Text>
          )
          }

        </View>
      </View>
      <View style={styles.trackingContainer}>
        {steps.map((step, index) => (
          <React.Fragment key={step.key}>
            <View style={styles.step}>
              {index < currentIndex ? (
                <Icon name="check-circle" size={24} color="#2490A9" />
              ) : index === currentIndex ? (
                <View style={{ backgroundColor: '#2490A9', borderRadius: 30, padding: 4, justifyContent: 'center', alignItems: 'center' }}>
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
    marginTop: 20,
  },
  tracking: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  step: {
    alignItems: 'center',
    marginTop: -10,
    marginVertical: 2,
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
    marginLeft: -30,
    marginRight: -32,
  },
  dottedLine: {
    width: 60,
    borderTopWidth: 4,
    borderTopColor: '#2490A9',
    borderStyle: 'dotted',
    marginBottom: 35,
    marginLeft: -28,
    marginRight: -32,
  },
});

export default OrderTracking;
