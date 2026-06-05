import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  KycApplication,
  KycStep,
  PersonalInfo,
  Address,
  KycDocument,
} from '../../types/types';

interface KycState {
  application: KycApplication;
}

const initialApplication: KycApplication = {
  id: '',
  status: 'not_started',
  currentStep: 'personal_info',
  personalInfo: undefined,
  address: undefined,
  document: undefined,
  updatedAt: new Date().toISOString(),
};

const initialState: KycState = {
  application: initialApplication,
};

const kycSlice = createSlice({
  name: 'kyc',
  initialState,
  reducers: {
    hydrateKyc: (state, action: PayloadAction<KycApplication>) => {
      state.application = action.payload;
    },
    setCurrentStep: (state, action: PayloadAction<KycStep>) => {
      state.application.currentStep = action.payload;
      state.application.updatedAt = new Date().toISOString();
    },
    updatePersonalInfo: (
      state,
      action: PayloadAction<Partial<PersonalInfo>>,
    ) => {
      state.application.personalInfo = {
        ...(state.application.personalInfo ?? {
          legalName: '',
          dateOfBirth: '',
          nationality: '',
        }),
        ...action.payload,
      };

      state.application.status = 'draft';
      state.application.updatedAt = new Date().toISOString();
      console.log('Application:', { ...state.application });
    },
    updateAddress: (state, action: PayloadAction<Partial<Address>>) => {
      state.application.address = {
        ...(state.application.address ?? {
          country: '',
          city: '',
          line1: '',
        }),
        ...action.payload,
      };

      state.application.status = 'draft';
      state.application.updatedAt = new Date().toISOString();
      console.log('Application:', { ...state.application });
    },
    updateDocument: (state, action: PayloadAction<Partial<KycDocument>>) => {
      state.application.document = {
        ...(state.application.document ?? {
          type: 'passport',
          documentNumber: '',
        }),
        ...action.payload,
      };

      state.application.status = 'draft';
      state.application.updatedAt = new Date().toISOString();

      console.log(
        'Application:',
        JSON.parse(JSON.stringify(state.application)),
      );
    },
    setApplication: (state, action: PayloadAction<KycApplication>) => {
      state.application = action.payload;
    },
    resetKyc: state => {
      state.application = {
        ...initialApplication,
        updatedAt: new Date().toISOString(),
      };
    },
  },
});

export const {
  hydrateKyc,
  setCurrentStep,
  updatePersonalInfo,
  updateAddress,
  updateDocument,
  setApplication,
  resetKyc,
} = kycSlice.actions;

export default kycSlice.reducer;
