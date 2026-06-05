import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { updateAddress } from '../../store/slices/kycSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

const AddressScreen = () => {
  const dispatch = useDispatch();
  const address = useSelector(
    (state: RootState) => state.kyc.application.address,
  );

  const values = {
    country: address?.country ?? '',
    city: address?.city ?? '',
    line1: address?.line1 ?? '',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Address</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Country</Text>
        <TextInput
          style={styles.input}
          value={values.country}
          onChangeText={country => dispatch(updateAddress({ country }))}
          placeholder="e.g. United Arab Emirates"
          autoCapitalize="words"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          value={values.city}
          onChangeText={city => dispatch(updateAddress({ city }))}
          placeholder="e.g. Dubai"
          autoCapitalize="words"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Address Line</Text>
        <TextInput
          style={styles.input}
          value={values.line1}
          onChangeText={line1 => dispatch(updateAddress({ line1 }))}
          placeholder="Street, building, apartment"
          autoCapitalize="sentences"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 16 },
  field: { gap: 6 },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#CBD5E1',
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    minHeight: 48,
    paddingHorizontal: 12,
  },
  label: { color: '#334155', fontSize: 14, fontWeight: '600' },
  title: { color: '#0F172A', fontSize: 22, fontWeight: '800' },
});

export default AddressScreen;
