// Dominion Wellness Solutions – Brand Colors
const Colors = {
  // Primary palette
  primary: '#0D2B6E',       // Deep navy blue (background)
  primaryDark: '#091E52',   // Darker navy
  primaryLight: '#1A3A8F',  // Lighter navy

  // Accent / teal
  accent: '#1CC8B0',        // Teal/cyan (logo & tagline)
  accentDark: '#14A090',
  accentLight: '#40D8C4',

  // Neutrals
  white: '#FFFFFF',
  offWhite: '#F0F4FF',
  lightGray: '#C8D4EA',
  gray: '#7B8DB8',
  darkGray: '#3A4F7A',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#C8D4EA',
  textAccent: '#1CC8B0',

  // Status
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Misc
  transparent: 'transparent',
  overlay: 'rgba(9, 30, 82, 0.7)',
} as const;

export type ColorKey = keyof typeof Colors;
export default Colors;
