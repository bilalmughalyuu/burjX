import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

function ReviewRow({ label, value }: { label: string; value?: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={[styles.rowValue, !value && styles.missing]}>
        {value || 'Missing'}
      </Text>
    </View>
  );
}

const ReviewScreen = () => {
  const application = useSelector((state: RootState) => state.kyc.application);
  const { personalInfo, address, document } = application;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review</Text>

      <Text style={styles.sectionLabel}>Personal Information</Text>
      <ReviewRow label="Legal Name" value={personalInfo?.legalName} />
      <ReviewRow label="Date of Birth" value={personalInfo?.dateOfBirth} />
      <ReviewRow label="Nationality" value={personalInfo?.nationality} />

      <Text style={styles.sectionLabel}>Address</Text>
      <ReviewRow label="Country" value={address?.country} />
      <ReviewRow label="City" value={address?.city} />
      <ReviewRow label="Address Line" value={address?.line1} />

      <Text style={styles.sectionLabel}>Document</Text>
      <ReviewRow
        label="Document Type"
        value={document?.type?.replace('_', ' ')}
      />
      <ReviewRow label="Document Number" value={document?.documentNumber} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 4 },
  missing: { color: '#EF4444' },
  row: {
    borderBottomColor: '#E2E8F0',
    borderBottomWidth: 1,
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 12,
  },
  rowLabel: { color: '#64748B', flex: 1, fontSize: 14 },
  rowValue: {
    color: '#0F172A',
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'right',
  },
  sectionLabel: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '700',
    marginTop: 12,
    textTransform: 'uppercase',
  },
  title: { color: '#0F172A', fontSize: 22, fontWeight: '800', marginBottom: 8 },
});

export default ReviewScreen;
