import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { Text, Button, Card, Chip, Divider } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';

import { theme } from '../theme/theme';
import { User } from '../types/auth';
import authService from '../services/authService';

interface ProfileScreenProps {
  route: {
    params: {
      user: User;
      tokens: {
        accessToken: string;
        refreshToken: string;
      };
    };
  };
}

const ProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<ProfileScreenProps['route']>();
  const [user, setUser] = useState<User>(route.params.user);
  const [tokens, setTokens] = useState(route.params.tokens);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await authService.getProfile(tokens.accessToken);
      if (response.success) {
        setUser(response.data.user);
        Toast.show({
          type: 'success',
          text1: 'Profile Updated!',
          text2: 'Your profile information has been refreshed.',
        });
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
      });
    } finally {
      setRefreshing(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout(tokens.refreshToken);
      Toast.show({
        type: 'success',
        text1: 'Logged Out',
        text2: 'You have been successfully logged out.',
      });
      navigation.goBack();
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to logout. Please try again.',
      });
    }
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? theme.colors.success : theme.colors.error;
  };

  const getVerificationColor = (isVerified: boolean) => {
    return isVerified ? theme.colors.success : theme.colors.warning;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <LinearGradient
            colors={[theme.colors.surface, theme.colors.surfaceVariant]}
            style={styles.avatarContainer}
          >
            <Text style={styles.avatarText}>
              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
            </Text>
          </LinearGradient>
          <Text style={styles.welcomeText}>
            Welcome back, {user.firstName}!
          </Text>
          <Text style={styles.subtitleText}>
            Here's your account information
          </Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Personal Information Card */}
        <Card style={styles.card}>
          <Card.Title
            title="Personal Information"
            titleStyle={styles.cardTitle}
            left={(props) => <Text {...props} style={styles.cardIcon}>👤</Text>}
          />
          <Card.Content>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Name:</Text>
              <Text style={styles.infoValue}>
                {user.firstName} {user.lastName}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Role:</Text>
              <Text style={styles.infoValue}>{user.role}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Status:</Text>
              <Chip
                mode="outlined"
                textStyle={{ color: getStatusColor(user.isActive) }}
                style={[
                  styles.statusChip,
                  { borderColor: getStatusColor(user.isActive) }
                ]}
              >
                {user.isActive ? '✅ Active' : '❌ Inactive'}
              </Chip>
            </View>
            {user.phone && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Phone:</Text>
                <Text style={styles.infoValue}>{user.phone}</Text>
              </View>
            )}
            {user.dateOfBirth && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Date of Birth:</Text>
                <Text style={styles.infoValue}>{user.dateOfBirth}</Text>
              </View>
            )}
            {user.gender && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Gender:</Text>
                <Text style={styles.infoValue}>{user.gender}</Text>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Verification Status Card */}
        <Card style={styles.card}>
          <Card.Title
            title="Verification Status"
            titleStyle={styles.cardTitle}
            left={(props) => <Text {...props} style={styles.cardIcon}>🔐</Text>}
          />
          <Card.Content>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email Verified:</Text>
              <Chip
                mode="outlined"
                textStyle={{ color: getVerificationColor(user.isEmailVerified) }}
                style={[
                  styles.statusChip,
                  { borderColor: getVerificationColor(user.isEmailVerified) }
                ]}
              >
                {user.isEmailVerified ? '✅ Verified' : '⏳ Pending'}
              </Chip>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone Verified:</Text>
              <Chip
                mode="outlined"
                textStyle={{ color: getVerificationColor(user.isPhoneVerified) }}
                style={[
                  styles.statusChip,
                  { borderColor: getVerificationColor(user.isPhoneVerified) }
                ]}
              >
                {user.isPhoneVerified ? '✅ Verified' : '⏳ Pending'}
              </Chip>
            </View>
          </Card.Content>
        </Card>

        {/* Address Information Card */}
        {user.address && (
          <Card style={styles.card}>
            <Card.Title
              title="Address Information"
              titleStyle={styles.cardTitle}
              left={(props) => <Text {...props} style={styles.cardIcon}>📍</Text>}
            />
            <Card.Content>
              {user.address.street && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Street:</Text>
                  <Text style={styles.infoValue}>{user.address.street}</Text>
                </View>
              )}
              {user.address.city && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>City:</Text>
                  <Text style={styles.infoValue}>{user.address.city}</Text>
                </View>
              )}
              {user.address.state && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>State:</Text>
                  <Text style={styles.infoValue}>{user.address.state}</Text>
                </View>
              )}
              {user.address.country && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Country:</Text>
                  <Text style={styles.infoValue}>{user.address.country}</Text>
                </View>
              )}
              {user.address.zipCode && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>ZIP Code:</Text>
                  <Text style={styles.infoValue}>{user.address.zipCode}</Text>
                </View>
              )}
            </Card.Content>
          </Card>
        )}

        {/* Authentication Tokens Card */}
        <Card style={styles.card}>
          <Card.Title
            title="Authentication Tokens"
            titleStyle={styles.cardTitle}
            left={(props) => <Text {...props} style={styles.cardIcon}>🔑</Text>}
          />
          <Card.Content>
            <View style={styles.tokenSection}>
              <Text style={styles.tokenLabel}>Access Token (JWT):</Text>
              <Text style={styles.tokenValue} numberOfLines={2}>
                {tokens.accessToken.substring(0, 50)}...
              </Text>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.tokenSection}>
              <Text style={styles.tokenLabel}>Refresh Token (UUID):</Text>
              <Text style={styles.tokenValue} numberOfLines={2}>
                {tokens.refreshToken.substring(0, 50)}...
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <Button
            mode="contained"
            onPress={onRefresh}
            style={[styles.actionButton, styles.refreshButton]}
            icon="refresh"
          >
            Refresh Profile
          </Button>
          <Button
            mode="outlined"
            onPress={handleLogout}
            style={[styles.actionButton, styles.logoutButton]}
            icon="logout"
            textColor={theme.colors.error}
          >
            Logout
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },
  headerContent: {
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.round,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    ...theme.shadows.large,
  },
  avatarText: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    color: theme.colors.onSurface,
  },
  welcomeText: {
    fontSize: theme.typography.h3.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    color: theme.colors.surface,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: theme.typography.body1.fontSize,
    color: theme.colors.surface,
    textAlign: 'center',
    opacity: 0.9,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.lg,
  },
  card: {
    marginBottom: theme.spacing.lg,
    ...theme.shadows.medium,
  },
  cardTitle: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    color: theme.colors.onSurface,
  },
  cardIcon: {
    fontSize: 24,
    marginRight: theme.spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outline,
  },
  infoLabel: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: '600',
    color: theme.colors.onSurfaceVariant,
    flex: 1,
  },
  infoValue: {
    fontSize: theme.typography.body1.fontSize,
    color: theme.colors.onSurface,
    flex: 2,
    textAlign: 'right',
  },
  statusChip: {
    backgroundColor: 'transparent',
  },
  tokenSection: {
    paddingVertical: theme.spacing.sm,
  },
  tokenLabel: {
    fontSize: theme.typography.body2.fontSize,
    fontWeight: '600',
    color: theme.colors.onSurfaceVariant,
    marginBottom: theme.spacing.xs,
  },
  tokenValue: {
    fontSize: theme.typography.caption.fontSize,
    fontFamily: 'monospace',
    color: theme.colors.onSurface,
    backgroundColor: theme.colors.surfaceVariant,
    padding: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  divider: {
    marginVertical: theme.spacing.sm,
  },
  actionButtons: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  actionButton: {
    borderRadius: theme.borderRadius.lg,
  },
  refreshButton: {
    backgroundColor: theme.colors.primary,
  },
  logoutButton: {
    borderColor: theme.colors.error,
  },
});

export default ProfileScreen;
