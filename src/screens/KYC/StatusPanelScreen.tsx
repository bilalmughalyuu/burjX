import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

const STATUS_COLOR: Record<string, string> = {
  not_started: '#94A3B8',
  draft: '#F59E0B',
  submitted: '#3B82F6',
  requires_more_info: '#F97316',
  approved: '#22C55E',
  rejected: '#EF4444',
};

const StatusPanelScreen = () => {
  const application = useSelector((state: RootState) => state.kyc.application);
  const { status, rejectionReason, requiredFields } = application;

  const color = STATUS_COLOR[status] ?? '#94A3B8';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verification Status</Text>

      <View style={[styles.badge, { backgroundColor: color + '22' }]}>
        <Text style={[styles.statusText, { color }]}>
          {status.replaceAll('_', ' ')}
        </Text>
      </View>

      {rejectionReason ? (
        <Text style={styles.muted}>{rejectionReason}</Text>
      ) : null}

      {requiredFields?.length ? (
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>More information needed:</Text>
          {requiredFields.map(field => (
            <Text key={field} style={styles.infoField}>
              • {field.replace(/\./g, ' › ').replace(/_/g, ' ')}
            </Text>
          ))}
        </View>
      ) : null}

      {status === 'approved' ? (
        <Text style={styles.approved}>
          Your identity has been verified. Welcome to BurjX!
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  approved: {
    color: '#15803D',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 8,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  container: { gap: 14 },
  infoBox: {
    backgroundColor: '#FFF7ED',
    borderRadius: 8,
    gap: 4,
    padding: 12,
  },
  infoField: { color: '#9A3412', fontSize: 14 },
  infoTitle: { color: '#9A3412', fontSize: 14, fontWeight: '700' },
  muted: { color: '#64748B', fontSize: 14, lineHeight: 20 },
  statusText: {
    fontSize: 20,
    fontWeight: '800',
    textTransform: 'capitalize',
  },
  title: { color: '#0F172A', fontSize: 22, fontWeight: '800' },
});

export default StatusPanelScreen;