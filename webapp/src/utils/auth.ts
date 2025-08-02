const AUTH_KEY = 'ai-ideas-auth';
const VALID_PASSWORDS = ['ideas2024', 'stiffler123']; // In production, this would be more secure

export const checkAuth = (): boolean => {
  const stored = localStorage.getItem(AUTH_KEY);
  if (!stored) return false;
  
  try {
    const { timestamp, hash } = JSON.parse(stored);
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    
    // Check if auth is less than 24 hours old
    if (now - timestamp > oneDay) {
      localStorage.removeItem(AUTH_KEY);
      return false;
    }
    
    return VALID_PASSWORDS.some(pwd => btoa(pwd) === hash);
  } catch {
    return false;
  }
};

export const authenticate = (password: string): boolean => {
  if (VALID_PASSWORDS.includes(password)) {
    const authData = {
      timestamp: Date.now(),
      hash: btoa(password)
    };
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
    return true;
  }
  return false;
};

export const logout = (): void => {
  localStorage.removeItem(AUTH_KEY);
};

// Simple hash function for password verification
export const hashPassword = (password: string): string => {
  return btoa(password);
};