import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

import { theme } from '../theme/theme';

const Header = () => {
  return (
    <View style={styles.container}>
      {/* Icon Container */}
      <LinearGradient
        colors={[theme.colors.surface, theme.colors.surfaceVariant]}
        style={styles.iconContainer}
      >
        <Text style={styles.icon}>🔐</Text>
      </LinearGradient>

      {/* Title */}
      <Text style={styles.title}>
        Auth Service Testing
      </Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Test your authentication microservice with our beautiful mobile interface
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    ...theme.shadows.large,
  },
  icon: {
    fontSize: 40,
  },
  title: {
    fontSize: theme.typography.h1.fontSize,
    fontWeight: theme.typography.h1.fontWeight,
    color: theme.colors.surface,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: theme.typography.body1.fontSize,
    color: theme.colors.surface,
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: theme.typography.body1.lineHeight,
    paddingHorizontal: theme.spacing.md,
  },
});

export default Header;
