import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { hydrateKyc, setCurrentStep } from '../store/slices/kycSlice';
import { loadKycDraft, saveKycDraft } from '../storage/kycStorage';
import { RootState } from '../store';
import PersonalInfoScreen from './KYC/PersonalInfoScreen';
import AddressScreen from './KYC/Addressscreen';
import DocumentDetailsScreen from './KYC/DocumentDetailsScreen';
import ReviewScreen from './KYC/ReviewScreen';
import StatusPanelScreen from './KYC/StatusPanelScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { KycStep } from '../types/types';
import { getStepFromData } from '../helper/helper';

const STEPS: KycStep[] = [
  'personal_info',
  'address',
  'document',
  'review',
  'status',
];

const STEP_LABELS: Record<KycStep, string> = {
  personal_info: 'Personal Info',
  address: 'Address',
  document: 'Document',
  review: 'Review',
  status: 'Status',
};

const KycFlowScreen = () => {
  const padding = useSafeAreaInsets();
  const dispatch = useDispatch();

  const { application } = useSelector((s: RootState) => s.kyc);

  const [isLoading, setIsLoading] = useState(true);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    async function hydrate() {
      const draft = await loadKycDraft();

      if (draft) {
        dispatch(hydrateKyc(draft));

        const step = getStepFromData(draft);
        dispatch(setCurrentStep(step));
      }

      setHydrated(true);
      setIsLoading(false);
    }

    hydrate();
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveKycDraft(application);
  }, [application, hydrated]);

  const currentStep = application.currentStep;
  const currentIndex = STEPS.indexOf(currentStep);

  const goNext = () => {
    const next = STEPS[Math.min(currentIndex + 1, STEPS.length - 1)];
    dispatch(setCurrentStep(next));
  };

  const goBack = () => {
    const prev = STEPS[Math.max(currentIndex - 1, 0)];
    dispatch(setCurrentStep(prev));
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator />
        <Text style={styles.muted}>Resuming your application...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.screen, { paddingTop: padding.top }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.stepRow}>
            {STEPS.slice(0, 4).map(step => (
              <View
                key={step}
                style={[
                  styles.stepDot,
                  currentStep === step && styles.stepDotActive,
                  STEPS.indexOf(step) < currentIndex && styles.stepDotDone,
                ]}
              />
            ))}
          </View>

          <Text style={styles.stepLabel}>{STEP_LABELS[currentStep]}</Text>

          {currentStep === 'personal_info' && <PersonalInfoScreen />}
          {currentStep === 'address' && <AddressScreen />}
          {currentStep === 'document' && <DocumentDetailsScreen />}
          {currentStep === 'review' && <ReviewScreen />}
          {currentStep === 'status' && <StatusPanelScreen />}

          <View style={styles.actions}>
            {currentStep !== 'personal_info' && currentStep !== 'status' && (
              <TouchableOpacity style={styles.secondaryBtn} onPress={goBack}>
                <Text style={styles.secondaryBtnText}>Back</Text>
              </TouchableOpacity>
            )}

            {currentStep !== 'status' && (
              <TouchableOpacity style={styles.primaryBtn} onPress={goNext}>
                <Text style={styles.primaryBtnText}>
                  {currentStep === 'review' ? 'Submit' : 'Next'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  actions: { flexDirection: 'row', gap: 10, marginTop: 24 },
  centered: {
    alignItems: 'center',
    flex: 1,
    gap: 12,
    justifyContent: 'center',
  },
  content: { gap: 20, padding: 20 },
  flex: { flex: 1 },
  muted: { color: '#64748B', fontSize: 14 },
  primaryBtn: {
    alignItems: 'center',
    backgroundColor: '#111827',
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    minHeight: 48,
  },
  primaryBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  screen: { backgroundColor: '#F8FAFC', flex: 1 },
  secondaryBtn: {
    alignItems: 'center',
    backgroundColor: '#E5E7EB',
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
    minHeight: 48,
  },
  secondaryBtnText: { color: '#111827', fontSize: 16, fontWeight: '600' },
  stepDot: {
    backgroundColor: '#CBD5E1',
    borderRadius: 4,
    flex: 1,
    height: 8,
  },
  stepDotActive: { backgroundColor: '#155E75' },
  stepDotDone: { backgroundColor: '#0E7490' },
  stepLabel: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  stepRow: { flexDirection: 'row', gap: 8 },
});

export default KycFlowScreen;
