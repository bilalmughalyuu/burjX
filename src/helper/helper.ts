import { KycApplication, KycStep } from '../types/types';

export const isPersonalInfoComplete = (app: KycApplication) => {
  return !!(
    app.personalInfo?.legalName &&
    app.personalInfo?.dateOfBirth &&
    app.personalInfo?.nationality
  );
};

export const isAddressComplete = (app: any) => {
  return !!(app.address?.country && app.address?.city && app.address?.line1);
};

export const isDocumentComplete = (app: any) => {
  return !!(app.document?.type && app.document?.documentNumber);
};

export const getStepFromData = (application: KycApplication): KycStep => {
  if (!isPersonalInfoComplete(application)) return 'personal_info';
  if (!isAddressComplete(application)) return 'address';
  if (!isDocumentComplete(application)) return 'document';
  return 'review';
};
