/**
 * Environment variable utilities
 * 
 * These functions help safely access environment variables
 * with validation and type checking.
 */

/**
 * Get a required environment variable
 * Throws an error if the variable is not defined
 */
export const getRequiredEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is required but not set`);
  }
  return value;
};

/**
 * Get an optional environment variable with a default value
 */
export const getEnvVar = (key: string, defaultValue: string): string => {
  const value = process.env[key];
  return value || defaultValue;
};

/**
 * Get a boolean environment variable
 * Accepts: 'true', '1', 'yes' as true
 * Everything else is false
 */
export const getBooleanEnvVar = (key: string, defaultValue = false): boolean => {
  const value = process.env[key]?.toLowerCase();
  if (!value) return defaultValue;
  return ['true', '1', 'yes'].includes(value);
};

/**
 * Get a number environment variable
 * Returns the default value if the variable is not a valid number
 */
export const getNumberEnvVar = (key: string, defaultValue: number): number => {
  const value = process.env[key];
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};