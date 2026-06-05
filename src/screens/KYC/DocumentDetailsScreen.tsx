import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { RootState } from '../../store';
import { updateDocument } from '../../store/slices/kycSlice';
import { useDispatch, useSelector } from 'react-redux';
import { KycDocumentType } from '../../types/types';

const DOCUMENT_TYPES: KycDocumentType[] = [
  'passport',
  'national_id',
  'drivers_license',
];

const DocumentDetailsScreen = () => {
  const dispatch = useDispatch();
  const document = useSelector(
    (state: RootState) => state.kyc.application.document,
  );

  const values = {
    type: document?.type ?? ('passport' as KycDocumentType),
    documentNumber: document?.documentNumber ?? '',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Document</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Document Type</Text>
        <View style={styles.segmented}>
          {DOCUMENT_TYPES.map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.segment,
                values.type === type && styles.segmentActive,
              ]}
              onPress={() => dispatch(updateDocument({ type }))}
            >
              <Text
                style={[
                  styles.segmentText,
                  values.type === type && styles.segmentTextActive,
                ]}
              >
                {type.replace('_', ' ')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Document Number</Text>
        <TextInput
          style={styles.input}
          value={values.documentNumber}
          onChangeText={documentNumber =>
            dispatch(updateDocument({ documentNumber }))
          }
          placeholder="Enter document number"
          autoCapitalize="characters"
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
  segment: {
    alignItems: 'center',
    backgroundColor: '#E2E8F0',
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    minHeight: 44,
    paddingHorizontal: 8,
  },
  segmentActive: { backgroundColor: '#155E75' },
  segmented: { flexDirection: 'row', gap: 8 },
  segmentText: {
    color: '#334155',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  segmentTextActive: { color: '#FFFFFF' },
  title: { color: '#0F172A', fontSize: 22, fontWeight: '800' },
});

export default DocumentDetailsScreen;
