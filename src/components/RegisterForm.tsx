import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { useForm, Controller } from 'react-hook-form';
import LinearGradient from 'react-native-linear-gradient';

import { theme } from '../theme/theme';
import { AuthFormData } from '../types/auth';
import authService from '../services/authService';

interface RegisterFormProps {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  onSuccess: (userData: any, tokens: any) => void;
  onError: (error: string) => void;
}

const RegisterForm = ({ isLoading, setIsLoading, onSuccess, onError }: RegisterFormProps) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<AuthFormData>();

  const onSubmit = async (data: AuthFormData) => {
    setIsLoading(true);
    try {
      const response = await authService.register(data);
      if (response.success) {
        reset();
        onSuccess(response.data.user, {
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        });
      }
    } catch (error: any) {
      onError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Form Header */}
        <View style={styles.formHeader}>
          <LinearGradient
            colors={[theme.colors.gradientSuccessStart, theme.colors.gradientSuccessEnd]}
            style={styles.iconContainer}
          >
            <Text style={styles.icon}>📝</Text>
          </LinearGradient>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join our platform and start your journey</Text>
        </View>

        {/* Form Fields */}
        <View style={styles.form}>
          {/* Name Fields */}
          <View style={styles.row}>
            <View style={styles.halfField}>
              <Controller
                control={control}
                name="firstName"
                rules={{ required: 'First name is required' }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    label="First Name"
                    value={value}
                    onChangeText={onChange}
                    mode="outlined"
                    style={styles.input}
                    left={<TextInput.Icon icon="account" />}
                    error={!!errors.firstName}
                  />
                )}
              />
              {errors.firstName && (
                <HelperText type="error" visible={!!errors.firstName}>
                  {errors.firstName.message}
                </HelperText>
              )}
            </View>

            <View style={styles.halfField}>
              <Controller
                control={control}
                name="lastName"
                rules={{ required: 'Last name is required' }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    label="Last Name"
                    value={value}
                    onChangeText={onChange}
                    mode="outlined"
                    style={styles.input}
                    left={<TextInput.Icon icon="account" />}
                    error={!!errors.lastName}
                  />
                )}
              />
              {errors.lastName && (
                <HelperText type="error" visible={!!errors.lastName}>
                  {errors.lastName.message}
                </HelperText>
              )}
            </View>
          </View>

          {/* Email Field */}
          <Controller
            control={control}
            name="email"
            rules={{ 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Email"
                value={value}
                onChangeText={onChange}
                mode="outlined"
                style={styles.input}
                left={<TextInput.Icon icon="email" />}
                keyboardType="email-address"
                autoCapitalize="none"
                error={!!errors.email}
              />
            )}
          />
          {errors.email && (
            <HelperText type="error" visible={!!errors.email}>
              {errors.email.message}
            </HelperText>
          )}

          {/* Password Field */}
          <Controller
            control={control}
            name="password"
            rules={{ 
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
              }
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Password"
                value={value}
                onChangeText={onChange}
                mode="outlined"
                style={styles.input}
                left={<TextInput.Icon icon="lock" />}
                secureTextEntry
                error={!!errors.password}
              />
            )}
          />
          {errors.password && (
            <HelperText type="error" visible={!!errors.password}>
              {errors.password.message}
            </HelperText>
          )}

          {/* Phone Field */}
          <Controller
            control={control}
            name="phone"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Phone (Optional)"
                value={value}
                onChangeText={onChange}
                mode="outlined"
                style={styles.input}
                left={<TextInput.Icon icon="phone" />}
                keyboardType="phone-pad"
                placeholder="+1234567890"
              />
            )}
          />

          {/* Date of Birth Field */}
          <Controller
            control={control}
            name="dateOfBirth"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Date of Birth (Optional)"
                value={value}
                onChangeText={onChange}
                mode="outlined"
                style={styles.input}
                left={<TextInput.Icon icon="calendar" />}
                placeholder="YYYY-MM-DD"
              />
            )}
          />

          {/* Gender Field */}
          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Gender (Optional)"
                value={value}
                onChangeText={onChange}
                mode="outlined"
                style={styles.input}
                left={<TextInput.Icon icon="human" />}
                placeholder="male, female, or other"
              />
            )}
          />

          {/* Address Fields */}
          <Text style={styles.sectionTitle}>Address (Optional)</Text>
          
          <Controller
            control={control}
            name="address.street"
            render={({ field: { onChange, value } }) => (
              <TextInput
                label="Street"
                value={value}
                onChangeText={onChange}
                mode="outlined"
                style={styles.input}
                left={<TextInput.Icon icon="map-marker" />}
              />
            )}
          />

          <View style={styles.row}>
            <View style={styles.halfField}>
              <Controller
                control={control}
                name="address.city"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    label="City"
                    value={value}
                    onChangeText={onChange}
                    mode="outlined"
                    style={styles.input}
                    left={<TextInput.Icon icon="city" />}
                  />
                )}
              />
            </View>

            <View style={styles.halfField}>
              <Controller
                control={control}
                name="address.state"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    label="State"
                    value={value}
                    onChangeText={onChange}
                    mode="outlined"
                    style={styles.input}
                    left={<TextInput.Icon icon="map" />}
                  />
                )}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfField}>
              <Controller
                control={control}
                name="address.country"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    label="Country"
                    value={value}
                    onChangeText={onChange}
                    mode="outlined"
                    style={styles.input}
                    left={<TextInput.Icon icon="flag" />}
                  />
                )}
              />
            </View>

            <View style={styles.halfField}>
              <Controller
                control={control}
                name="address.zipCode"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    label="ZIP Code"
                    value={value}
                    onChangeText={onChange}
                    mode="outlined"
                    style={styles.input}
                    left={<TextInput.Icon icon="postal-code" />}
                    keyboardType="numeric"
                  />
                )}
              />
            </View>
          </View>

          {/* Submit Button */}
          <Button
            mode="contained"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            disabled={isLoading}
            style={styles.submitButton}
            contentStyle={styles.submitButtonContent}
            labelStyle={styles.submitButtonLabel}
          >
            {isLoading ? 'Creating Account...' : '🚀 Create Account'}
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formHeader: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: theme.borderRadius.xl,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    ...theme.shadows.medium,
  },
  icon: {
    fontSize: 32,
  },
  title: {
    fontSize: theme.typography.h2.fontSize,
    fontWeight: theme.typography.h2.fontWeight,
    color: theme.colors.surface,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.typography.body1.fontSize,
    color: theme.colors.surface,
    textAlign: 'center',
    opacity: 0.9,
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    ...theme.shadows.large,
  },
  sectionTitle: {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: theme.typography.h4.fontWeight,
    color: theme.colors.onSurface,
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfField: {
    flex: 0.48,
  },
  input: {
    marginBottom: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
  },
  submitButton: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.gradientSuccessStart,
  },
  submitButtonContent: {
    paddingVertical: theme.spacing.md,
  },
  submitButtonLabel: {
    fontSize: theme.typography.button.fontSize,
    fontWeight: theme.typography.button.fontWeight,
  },
});

export default RegisterForm;
