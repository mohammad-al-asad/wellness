import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import Colors from "../../src/constants/colors";
import {
  FontFamily,
  FontSize,
  LetterSpacing,
} from "../../src/constants/typography";
import Svg, { Path } from "react-native-svg";
import {
  useGetOrganizationsQuery,
  useGetRolesQuery,
  useLazyGetDepartmentsQuery,
  useLazyGetTeamsQuery,
  useLazyGetRolesQuery,
} from "../../src/redux/rtk/authApi";
import { useAppDispatch } from "../../src/redux/reduxHooks";
import { setOnboardingData } from "../../src/redux/slices/authSlice";

const { width } = Dimensions.get("window");

const ChevronDown = ({ color = "#9CA3AF" }) => (
  <Svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M6 9l6 6 6-6" />
  </Svg>
);



export default function OnboardingScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [selectedOrg, setSelectedOrg] = useState("");
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);

  const [selectedDept, setSelectedDept] = useState("");
  const [deptDropdownOpen, setDeptDropdownOpen] = useState(false);

  const [selectedTeam, setSelectedTeam] = useState("");
  const [teamDropdownOpen, setTeamDropdownOpen] = useState(false);

  const [selectedRole, setSelectedRole] = useState("");
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const { data: orgData, isLoading: isLoadingOrgs } = useGetOrganizationsQuery();
  
  const [triggerDepts, { data: deptsData, isLoading: isLoadingDepts }] = useLazyGetDepartmentsQuery();
  const [triggerTeams, { data: teamsData, isLoading: isLoadingTeams }] = useLazyGetTeamsQuery();
  const [triggerRoles, { data: rolesData, isLoading: isLoadingRoles }] = useLazyGetRolesQuery();

  const organizations = orgData?.data?.organizations || [];
  const departments = deptsData?.data?.departments || [];
  const teams = teamsData?.data?.teams || [];
  const roles = rolesData?.data?.roles || [];

  const closeDropdowns = () => {
    setOrgDropdownOpen(false);
    setDeptDropdownOpen(false);
    setTeamDropdownOpen(false);
    setRoleDropdownOpen(false);
  };

  const getLabel = (value: string, options: any[]) => {
    const item = options.find(opt => opt.value === value);
    return item ? item.label : "";
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.inner}>
          {/* Invisible overlay for capturing outside touches to close menus */}
          {(orgDropdownOpen || deptDropdownOpen || teamDropdownOpen || roleDropdownOpen) && (
            <TouchableOpacity
              style={[StyleSheet.absoluteFill, { zIndex: 10, elevation: 10 }]}
              activeOpacity={1}
              onPress={closeDropdowns}
            />
          )}

          {/* Background Watermark Logo */}
          <Image
            source={require("../../assets/singleLogo.png")}
            style={styles.watermark}
          />

          <View style={styles.header}>
            <Text style={styles.title}>Access your</Text>
            <Text style={[styles.title, styles.titleAccent]}>Organization</Text>
            <Text style={styles.title}>Account</Text>

            <Text style={styles.subtitle}>
              If you are not part of any organization{"\n"}then skip this screen
            </Text>
          </View>

          <View style={styles.formContainer}>
            {/* Organization Dropdown */}
            <View style={[styles.inputGroup, { zIndex: orgDropdownOpen ? 100 : 4 }]}>
              <Text style={styles.label}>ORGANIZATION</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => { setOrgDropdownOpen(!orgDropdownOpen); setDeptDropdownOpen(false); setTeamDropdownOpen(false); setRoleDropdownOpen(false); }}
              >
                <Text style={[styles.placeholder, selectedOrg ? styles.selectedValue : null]}>
                  {getLabel(selectedOrg, organizations) || "Select Organization"}
                </Text>
                <ChevronDown />
              </TouchableOpacity>
              {orgDropdownOpen && (
                <View style={styles.dropdownList}>
                  <ScrollView nestedScrollEnabled>
                    {organizations.map((org) => (
                      <TouchableOpacity
                        key={org.value}
                        style={styles.dropdownItem}
                        onPress={() => {
                          setSelectedOrg(org.value);
                          setSelectedDept("");
                          setSelectedTeam("");
                          setSelectedRole("");
                          triggerDepts(org.value);
                          triggerRoles(org.value);
                          setOrgDropdownOpen(false);
                        }}
                      >
                        <Text style={styles.dropdownItemText}>{org.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            {/* Department Dropdown */}
            <View style={[styles.inputGroup, { zIndex: deptDropdownOpen ? 100 : 3 }]}>
              <Text style={styles.label}>DEPARTMENT</Text>
              <TouchableOpacity
                style={[styles.dropdown, !selectedOrg && styles.dropdownDisabled]}
                disabled={!selectedOrg}
                onPress={() => { setDeptDropdownOpen(!deptDropdownOpen); setOrgDropdownOpen(false); setTeamDropdownOpen(false); setRoleDropdownOpen(false); }}
              >
                <Text style={[styles.placeholder, selectedDept ? styles.selectedValue : null]}>
                  {getLabel(selectedDept, departments) || "Select Department"}
                </Text>
                <ChevronDown />
              </TouchableOpacity>
              {deptDropdownOpen && (
                <View style={styles.dropdownList}>
                  <ScrollView nestedScrollEnabled>
                    {departments.map((dept) => (
                      <TouchableOpacity
                        key={dept.value}
                        style={styles.dropdownItem}
                        onPress={() => {
                          setSelectedDept(dept.value);
                          setSelectedTeam("");
                          triggerTeams({ organization_name: selectedOrg, department: dept.value });
                          setDeptDropdownOpen(false);
                        }}
                      >
                        <Text style={styles.dropdownItemText}>{dept.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            {/* Team Dropdown */}
            <View style={[styles.inputGroup, { zIndex: teamDropdownOpen ? 100 : 2 }]}>
              <Text style={styles.label}>TEAM</Text>
              <TouchableOpacity
                style={[styles.dropdown, !selectedDept && styles.dropdownDisabled]}
                disabled={!selectedDept}
                onPress={() => { setTeamDropdownOpen(!teamDropdownOpen); setOrgDropdownOpen(false); setDeptDropdownOpen(false); setRoleDropdownOpen(false); }}
              >
                <Text style={[styles.placeholder, selectedTeam ? styles.selectedValue : null]}>
                  {getLabel(selectedTeam, teams) || "Select Team"}
                </Text>
                <ChevronDown />
              </TouchableOpacity>
              {teamDropdownOpen && (
                <View style={styles.dropdownList}>
                  <ScrollView nestedScrollEnabled>
                    {teams.map((team) => (
                      <TouchableOpacity
                        key={team.value}
                        style={styles.dropdownItem}
                        onPress={() => {
                          setSelectedTeam(team.value);
                          setTeamDropdownOpen(false);
                        }}
                      >
                        <Text style={styles.dropdownItemText}>{team.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>

            {/* Role Dropdown */}
            <View style={[styles.inputGroup, { zIndex: roleDropdownOpen ? 100 : 1 }]}>
              <Text style={styles.label}>ROLE</Text>
              <TouchableOpacity
                style={[styles.dropdown, !selectedOrg && styles.dropdownDisabled]}
                disabled={!selectedOrg}
                onPress={() => { setRoleDropdownOpen(!roleDropdownOpen); setOrgDropdownOpen(false); setDeptDropdownOpen(false); setTeamDropdownOpen(false); }}
              >
                <Text style={[styles.placeholder, selectedRole ? styles.selectedValue : null]}>
                   {getLabel(selectedRole, roles) || "Select Role"}
                </Text>
                <ChevronDown />
              </TouchableOpacity>
              {roleDropdownOpen && (
                <View style={styles.dropdownList}>
                  <ScrollView nestedScrollEnabled>
                    {roles.map((role) => (
                      <TouchableOpacity
                        key={role.value}
                        style={styles.dropdownItem}
                        onPress={() => {
                          setSelectedRole(role.value);
                          setRoleDropdownOpen(false);
                        }}
                      >
                        <Text style={styles.dropdownItemText}>{role.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.btnSkip}
              onPress={() => router.replace("/(tabs)")}
            >
              <Text style={styles.btnSkipText}>Skip</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btnNext, (!selectedOrg || !selectedRole) && styles.btnDisabled]}
              disabled={!selectedOrg || !selectedRole}
              onPress={() => {
                dispatch(
                  setOnboardingData({
                    organization: getLabel(selectedOrg, organizations),
                    department: getLabel(selectedDept, departments),
                    team: getLabel(selectedTeam, teams),
                    role: getLabel(selectedRole, roles),
                  })
                );
                router.push({
                  pathname: "/register",
                  params: {
                    organization: selectedOrg,
                    department: selectedDept,
                    team: selectedTeam,
                    role: selectedRole,
                  },
                });
              }}
            >
              <Text style={styles.btnNextText}>Next</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6FCFB",
  },
  scroll: {
    flexGrow: 1,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
  },
  watermark: {
    position: "absolute",
    top: -50,
    right: -200,
    width: width * 1.1,
    height: 300,
    opacity: 0.1,
    resizeMode: "contain",
    tintColor: Colors.accent,
  },
  header: {
    marginTop: 60,
    zIndex: 1,
  },
  title: {
    fontFamily: FontFamily.bold,
    fontSize: 32,
    color: "#2C3E50",
    lineHeight: 40,
  },
  titleAccent: {
    color: Colors.accent,
  },
  subtitle: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
    color: "#6B7280",
    marginTop: 20,
    lineHeight: 24,
  },
  formContainer: {
    marginTop: 40,
    zIndex: 10,
    elevation: 10,
  },
  inputGroup: {
    marginBottom: 24,
    position: "relative",
  },
  label: {
    fontFamily: FontFamily.bold,
    fontSize: 12,
    color: Colors.accent,
    letterSpacing: 1.5,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  dropdownDisabled: {
    backgroundColor: "#F3F4F6",
    opacity: 0.7,
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
  },
  dropdownItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  dropdownItemText: {
    fontFamily: FontFamily.medium,
    fontSize: 16,
    color: "#2C3E50",
  },
  placeholder: {
    fontFamily: FontFamily.regular,
    fontSize: 16,
    color: "#9CA3AF",
  },
  selectedValue: {
    color: "#2C3E50",
    fontFamily: FontFamily.medium,
  },
  footer: {
    flexDirection: "row",
    gap: 16,
    marginTop: "auto",
    marginBottom: 40,
    zIndex: 1,
  },
  btnSkip: {
    flex: 1,
    backgroundColor: "#9CA3AF",
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
  },
  btnSkipText: {
    fontFamily: FontFamily.medium,
    color: "#FFFFFF",
    fontSize: 16,
  },
  btnNext: {
    flex: 1,
    backgroundColor: "#003049",
    borderRadius: 12,
    paddingVertical: 18,
    alignItems: "center",
  },
  btnNextText: {
    fontFamily: FontFamily.medium,
    color: "#FFFFFF",
    fontSize: 16,
  },
  btnDisabled: {
    opacity: 0.5,
  },
});
