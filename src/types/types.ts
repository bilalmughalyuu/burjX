export type KycStatus =
  | 'not_started'
  | 'draft'
  | 'submitted'
  | 'requires_more_info'
  | 'approved'
  | 'rejected';

export type KycStep =
  | 'personal_info'
  | 'address'
  | 'document'
  | 'review'
  | 'status';

export type KycDocumentType = 'passport' | 'national_id' | 'drivers_license';

export interface PersonalInfo {
  legalName: string;
  dateOfBirth: string;
  nationality: string;
}

export interface Address {
  country: string;
  city: string;
  line1: string;
}

export interface KycDocument {
  type: KycDocumentType;
  documentNumber: string;
}

export interface KycApplication {
  id: string;
  status: KycStatus;
  currentStep: KycStep;
  personalInfo?: PersonalInfo;
  address?: Address;
  document?: KycDocument;
  rejectionReason?: string;
  requiredFields?: string[];
  updatedAt: string;
}