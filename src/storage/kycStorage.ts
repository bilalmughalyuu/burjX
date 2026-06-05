import AsyncStorage from '@react-native-async-storage/async-storage';
import { KycApplication } from '../types/types';

const KYC_STORAGE_KEY = 'kyc_application_draft';

export async function saveKycDraft(application: KycApplication): Promise<void> {
  try {
    await AsyncStorage.setItem(KYC_STORAGE_KEY, JSON.stringify(application));
  } catch (e) {
    console.error('Error saving KYC draft:', e);
  }
}

export async function loadKycDraft(): Promise<KycApplication | null> {
  try {
    const raw = await AsyncStorage.getItem(KYC_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as KycApplication;
  } catch {
    return null;
  }
}

export async function clearKycDraft(): Promise<void> {
  try {
    await AsyncStorage.removeItem(KYC_STORAGE_KEY);
  } catch (e) {
    console.error('Error clearing KYC draft:', e);
  }
}
