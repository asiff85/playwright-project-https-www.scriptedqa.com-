/**
 * Common generic utility helper functions for test execution.
 */
export class CommonUtils {
  /**
   * Generates a random alphanumeric string of specified length.
   */
  static generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generates a fixed 300-character test payload for boundary testing.
   */
  static generateLongString(length: number = 300): string {
    return 'A'.repeat(length);
  }
}

