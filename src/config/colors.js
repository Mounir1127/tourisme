// Tourisia Color Configuration
// All authentication pages use these colors

export const COLORS = {
  PRIMARY_DARK: '#10202d',    // Dark Navy - Primary background
  ACCENT_GOLD: '#c7a667',     // Gold - Buttons, accents, borders
  LIGHT_BG: '#f7f7f7',        // Off-white - Form backgrounds
};

// Convenience object for inline styles
export const colorStyles = {
  darkBg: { backgroundColor: COLORS.PRIMARY_DARK },
  darkText: { color: COLORS.PRIMARY_DARK },
  lightBg: { backgroundColor: COLORS.LIGHT_BG },
  lightText: { color: COLORS.LIGHT_BG },
  accentBg: { backgroundColor: COLORS.ACCENT_GOLD },
  accentText: { color: COLORS.ACCENT_GOLD },
  accentBorder: { borderColor: COLORS.ACCENT_GOLD },
};

// Component-specific color configurations
export const componentColors = {
  button: {
    primary: {
      backgroundColor: COLORS.ACCENT_GOLD,
      color: 'white',
      hover: '#b8935a',
    },
    secondary: {
      backgroundColor: COLORS.PRIMARY_DARK,
      color: COLORS.LIGHT_BG,
      hover: '#0d1419',
    },
  },
  input: {
    borderColor: COLORS.ACCENT_GOLD,
    focusRing: COLORS.ACCENT_GOLD,
  },
  card: {
    backgroundColor: COLORS.LIGHT_BG,
    borderColor: COLORS.ACCENT_GOLD,
  },
  background: {
    primary: COLORS.PRIMARY_DARK,
    secondary: COLORS.LIGHT_BG,
  },
  text: {
    primary: COLORS.PRIMARY_DARK,
    secondary: '#666',
  },
};
