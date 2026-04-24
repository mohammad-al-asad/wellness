import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, User, ChevronDown, Pencil } from 'lucide-react-native';
import { FontFamily, FontSize } from '../src/constants/typography';
import Colors from '../src/constants/colors';

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
}

const FormField = ({ label, children }: FormFieldProps) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.fieldLabel}>{label}</Text>
    {children}
  </View>
);

interface InputProps {
  icon?: any;
  placeholder: string;
  value?: string;
  [key: string]: any;
}

const Input = ({ icon: Icon, placeholder, value, ...props }: InputProps) => (
  <View style={styles.inputContainer}>
    {Icon && <Icon size={20} color="#94A3B8" style={styles.inputIcon} />}
    <TextInput 
      style={styles.textInput} 
      placeholder={placeholder} 
      placeholderTextColor="#94A3B8"
      value={value}
      {...props}
    />
  </View>
);

interface SelectProps {
  placeholder: string;
  value?: string;
}

const Select = ({ placeholder, value }: SelectProps) => (
  <TouchableOpacity style={styles.selectContainer}>
    <Text style={[styles.selectText, !value && styles.placeholderText]}>
      {value || placeholder}
    </Text>
    <ChevronDown size={20} color="#94A3B8" />
  </TouchableOpacity>
);

const EditProfileScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: 40 }} /> 
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          {/* Avatar Section */}
          <View style={styles.avatarWrap}>
            <View style={styles.avatarCircle}>
              <User size={40} color="#FFFFFF" />
              <Text style={styles.avatarSubLabel}>USER PROFILE</Text>
            </View>
            <TouchableOpacity style={styles.editBadge}>
              <Pencil size={12} color="#FFFFFF" fill="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Form Section */}
          <FormField label="NAME">
            <Input icon={User} placeholder="John Doe" />
          </FormField>

          <View style={styles.row}>
            <View style={styles.column}>
              <FormField label="AGE">
                <Input placeholder="Enter age" keyboardType="numeric" />
              </FormField>
            </View>
            <View style={styles.column}>
              <FormField label="GENDER">
                <Select placeholder="Select gender" value="Male" />
              </FormField>
            </View>
          </View>

          <FormField label="COMPANY">
            <Input placeholder="Company name" />
          </FormField>

          <FormField label="DEPARTMENT">
            <Select placeholder="Select department" value="Senior Executive" />
          </FormField>

          <FormField label="TEAM">
            <Select placeholder="Select team" value="Senior Executive" />
          </FormField>

          <FormField label="WORK ROLE">
            <Select placeholder="Select role" value="Sales" />
          </FormField>

          <View style={styles.row}>
            <View style={styles.column}>
              <FormField label="HEIGHT">
                <Input placeholder="180" keyboardType="numeric" />
              </FormField>
            </View>
            <View style={styles.column}>
              <FormField label="WEIGHT">
                <Input placeholder="75" keyboardType="numeric" />
              </FormField>
            </View>
          </View>

          {/* Buttons Section */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.saveButton} onPress={() => router.back()}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6FCFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.lg,
    color: '#1E293B',
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  avatarWrap: {
    alignSelf: 'center',
    position: 'relative',
    marginBottom: 40,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E5C4A7',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#F1F5F9',
  },
  avatarSubLabel: {
    fontSize: 6,
    color: '#FFFFFF',
    fontFamily: FontFamily.bold,
    marginTop: 2,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0D2B6E',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontFamily: FontFamily.bold,
    fontSize: 10,
    color: '#64748B',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  inputContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontFamily: FontFamily.medium,
    fontSize: FontSize.base,
    color: '#1E293B',
    height: '100%',
  },
  selectContainer: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  selectText: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.base,
    color: '#1E293B',
  },
  placeholderText: {
    color: '#94A3B8',
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  column: {
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#94A3B8', // Grey/Blue from image
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.base,
    color: Colors.white,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#0D2B6E',
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.base,
    color: Colors.white,
  },
});

export default EditProfileScreen;
