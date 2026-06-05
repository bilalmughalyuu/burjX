import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { RootState } from '../../store';
import { updatePersonalInfo } from '../../store/slices/kycSlice';
import { useDispatch, useSelector } from 'react-redux';

const PersonalInfoScreen = () => {
  const dispatch = useDispatch();
  const personalInfo = useSelector(
    (state: RootState) => state.kyc.application.personalInfo,
  );

  const values = {
    legalName: personalInfo?.legalName ?? '',
    dateOfBirth: personalInfo?.dateOfBirth ?? '',
    nationality: personalInfo?.nationality ?? '',
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Information</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Legal Name</Text>
        <TextInput
          style={styles.input}
          value={values.legalName}
          onChangeText={legalName =>
            dispatch(updatePersonalInfo({ legalName }))
          }
          placeholder="Full legal name"
          autoCapitalize="words"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Date of Birth</Text>
        <TextInput
          style={styles.input}
          value={values.dateOfBirth}
          onChangeText={dateOfBirth =>
            dispatch(updatePersonalInfo({ dateOfBirth }))
          }
          placeholder="YYYY-MM-DD"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Nationality</Text>
        <TextInput
          style={styles.input}
          value={values.nationality}
          onChangeText={nationality =>
            dispatch(updatePersonalInfo({ nationality }))
          }
          placeholder="e.g. Emirati"
          autoCapitalize="words"
        />
      </View>
    </View>
  );
}

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

export default PersonalInfoScreen;
