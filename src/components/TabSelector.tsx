import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

import { theme } from '../theme/theme';
import { AuthTab } from '../types/auth';

interface TabSelectorProps {
  activeTab: AuthTab;
  onTabChange: (tab: AuthTab) => void;
}

const TabSelector = ({ activeTab, onTabChange }: TabSelectorProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {/* Register Tab */}
        <TouchableOpacity
          style={styles.tab}
          onPress={() => onTabChange('register')}
          activeOpacity={0.8}
        >
          {activeTab === 'register' ? (
            <LinearGradient
              colors={[theme.colors.gradientSuccessStart, theme.colors.gradientSuccessEnd]}
              style={styles.activeTab}
            >
              <Text style={styles.tabIcon}>📝</Text>
              <Text style={styles.activeTabText}>Register</Text>
            </LinearGradient>
          ) : (
            <View style={styles.inactiveTab}>
              <Text style={styles.tabIcon}>📝</Text>
              <Text style={styles.inactiveTabText}>Register</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Login Tab */}
        <TouchableOpacity
          style={styles.tab}
          onPress={() => onTabChange('login')}
          activeOpacity={0.8}
        >
          {activeTab === 'login' ? (
            <LinearGradient
              colors={[theme.colors.gradientWarningStart, theme.colors.gradientWarningEnd]}
              style={styles.activeTab}
            >
              <Text style={styles.tabIcon}>🔑</Text>
              <Text style={styles.activeTabText}>Login</Text>
            </LinearGradient>
          ) : (
            <View style={styles.inactiveTab}>
              <Text style={styles.tabIcon}>🔑</Text>
              <Text style={styles.inactiveTabText}>Login</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xs,
    ...theme.shadows.medium,
  },
  tab: {
    flex: 1,
    marginHorizontal: theme.spacing.xs,
  },
  activeTab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.small,
  },
  inactiveTab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
  },
  tabIcon: {
    fontSize: 20,
    marginRight: theme.spacing.sm,
  },
  activeTabText: {
    color: theme.colors.surface,
    fontSize: theme.typography.button.fontSize,
    fontWeight: theme.typography.button.fontWeight,
  },
  inactiveTabText: {
    color: theme.colors.surface,
    fontSize: theme.typography.button.fontSize,
    fontWeight: '500',
    opacity: 0.8,
  },
});

export default TabSelector;
