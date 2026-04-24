import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { User, ChevronDown } from "lucide-react-native";
import Colors from "../src/constants/colors";
import { FontFamily } from "../src/constants/typography";
import { useAppSelector } from "../src/redux/reduxHooks";
import { useGetOrganizationsQuery } from "../src/redux/rtk/authApi";

const GENDERS = ["Male", "Female", "Other"];
const DEPARTMENTS = ["Senior Executive", "Engineering", "Marketing", "HR"];
const TEAMS = ["Senior Executive", "Frontend", "Backend", "Design"];
const ROLES = ["Sales", "Developer", "Manager", "Analyst"];

export default function PersonalInfoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { data: orgData } = useGetOrganizationsQuery();
  const organizations =
    orgData?.data?.organizations?.map((org) => org.label) || [];

  const { user, onboarding } = useAppSelector((state) => state.auth);

  const [name, setName] = useState(user?.name || "");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [company, setCompany] = useState(
    onboarding?.organization || (params.organization as string) || "",
  );
  const [department, setDepartment] = useState(
    onboarding?.department || (params.department as string) || "",
  );
  const [team, setTeam] = useState(
    onboarding?.team || (params.team as string) || "",
  );
  const [workRole, setWorkRole] = useState(
    onboarding?.role || (params.role as string) || "",
  );
  const [heightVal, setHeightVal] = useState("");
  const [weightVal, setWeightVal] = useState("");

  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (key: string) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const closeDropdowns = () => {
    setOpenDropdown(null);
  };

  const renderInput = (
    label: string,
    placeholder: string,
    value: string,
    onChange: (t: string) => void,
    icon?: React.ReactNode,
    extraStyle?: any,
    keyboardType: any = "default",
    readOnly: boolean = false,
  ) => (
    <View style={[styles.inputGroup, extraStyle]}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputContainer, readOnly && styles.inputDisabled]}>
        {icon && <View style={styles.iconContainer}>{icon}</View>}
        <TextInput
          style={[
            styles.input,
            Platform.OS === "web" && ({ outlineStyle: "none" } as any),
            readOnly && { color: "#6B7280" },
          ]}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChange}
          keyboardType={keyboardType}
          underlineColorAndroid="transparent"
          editable={!readOnly}
        />
      </View>
    </View>
  );

  const renderDropdown = (
    label: string,
    placeholder: string,
    value: string,
    options: string[],
    onSelect: (v: string) => void,
    dropdownKey: string,
    extraStyle?: any,
  ) => {
    const isOpen = openDropdown === dropdownKey;
    return (
      <View
        style={[
          styles.inputGroup,
          extraStyle,
          { zIndex: isOpen ? 10 : 1, elevation: isOpen ? 10 : 1 },
        ]}
      >
        <Text style={styles.label}>{label}</Text>
        <TouchableOpacity
          style={styles.dropdownContainer}
          activeOpacity={0.7}
          onPress={() => toggleDropdown(dropdownKey)}
        >
          <Text style={[styles.input, !value && { color: "#9CA3AF" }]}>
            {value || placeholder}
          </Text>
          <ChevronDown color="#9CA3AF" size={20} />
        </TouchableOpacity>

        {isOpen && (
          <View style={styles.dropdownList}>
            {options.map((opt, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => {
                  onSelect(opt);
                  closeDropdowns();
                }}
              >
                <Text style={styles.dropdownItemText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Personal Information</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Overlay for closing dropdowns when clicking outside */}
        {openDropdown && (
          <TouchableOpacity
            style={[StyleSheet.absoluteFill, { zIndex: 5, elevation: 5 }]}
            activeOpacity={1}
            onPress={closeDropdowns}
          />
        )}

        <View style={styles.progressRow}>
          <Text style={styles.progressText}>1/6</Text>
          <Text style={styles.progressText}>Step 1</Text>
        </View>

        <View style={styles.formContainer}>
          {renderInput(
            "NAME",
            "John Doe",
            name,
            setName,
            <User color="#9CA3AF" size={20} />,
            null,
            "default",
            true,
          )}

          <View
            style={[styles.row, { zIndex: openDropdown === "gender" ? 10 : 1 }]}
          >
            {renderInput(
              "AGE",
              "Enter age",
              age,
              setAge,
              null,
              { flex: 1, marginRight: 8 },
              "number-pad",
            )}
            {renderDropdown(
              "GENDER",
              "Male",
              gender,
              GENDERS,
              setGender,
              "gender",
              { flex: 1, marginLeft: 8 },
            )}
          </View>

          {renderDropdown(
            "COMPANY",
            "Select Company",
            company,
            organizations,
            setCompany,
            "company",
          )}
          {renderDropdown(
            "DEPARTMENT",
            "Senior Executive",
            department,
            DEPARTMENTS,
            setDepartment,
            "department",
          )}
          {renderDropdown(
            "TEAM",
            "Senior Executive",
            team,
            TEAMS,
            setTeam,
            "team",
          )}
          {renderDropdown(
            "WORK ROLE",
            "Sales",
            workRole,
            ROLES,
            setWorkRole,
            "workRole",
          )}

          <View style={styles.row}>
            {renderInput(
              "HEIGHT",
              "180",
              heightVal,
              setHeightVal,
              null,
              { flex: 1, marginRight: 8 },
              "number-pad",
            )}
            {renderInput(
              "WEIGHT",
              "75",
              weightVal,
              setWeightVal,
              null,
              { flex: 1, marginLeft: 8 },
              "number-pad",
            )}
          </View>
        </View>

        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() =>
            router.push({
              pathname: "/personal-info-2",
              params: {
                ...params,
                name,
                age,
                gender,
                organization: company,
                department,
                team,
                role: workRole,
                height: heightVal,
                weight: weightVal,
              },
            })
          }
        >
          <Text style={styles.btnPrimaryText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FCFB",
  },
  header: {
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 20,
    alignItems: "center",
    backgroundColor: "#F6FCFB",
    zIndex: 10,
  },
  headerTitle: {
    fontFamily: FontFamily.medium,
    fontSize: 20,
    color: "#2C3E50",
  },
  scroll: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
    marginTop: 8,
  },
  progressText: {
    fontFamily: FontFamily.regular,
    fontSize: 13,
    color: "#6B7280",
  },
  formContainer: {
    marginBottom: 24,
    zIndex: 10,
    elevation: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  inputGroup: {
    marginBottom: 20,
    position: "relative",
  },
  label: {
    fontFamily: FontFamily.medium,
    fontSize: 12,
    color: "#4B5563",
    letterSpacing: 1.0,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  inputDisabled: {
    backgroundColor: "#F3F4F6",
    opacity: 0.8,
  },
  dropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
  },
  iconContainer: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontFamily: FontFamily.regular,
    fontSize: 16,
    color: "#2C3E50",
    height: "100%",
  },
  dropdownList: {
    position: "absolute",
    top: 80,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  dropdownItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  dropdownItemText: {
    fontFamily: FontFamily.medium,
    fontSize: 14,
    color: "#2C3E50",
  },
  btnPrimary: {
    backgroundColor: "#003049",
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 12,
  },
  btnPrimaryText: {
    fontFamily: FontFamily.medium,
    color: "#FFFFFF",
    fontSize: 16,
  },
});
