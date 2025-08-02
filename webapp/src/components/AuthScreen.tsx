import React, { useState, useEffect } from 'react';
import { Lock, Brain, Sparkles } from 'lucide-react';
import { authenticate } from '../utils/auth';

interface AuthScreenProps {
  onAuthenticated: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (authenticate(password)) {
      onAuthenticated();
    } else {
      setError('Invalid password. Try again.');
      setPassword('');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-container">
        <div className={`auth-card ${isAnimating ? 'animate-in' : ''}`}>
          <div className="auth-icon">
            <Brain size={48} />
            <Sparkles size={24} className="sparkle-1" />
            <Sparkles size={16} className="sparkle-2" />
          </div>
          
          <h1>AI Ideas Vault</h1>
          <p>Enter the secret key to unlock your knowledge base</p>
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <Lock size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className={error ? 'error' : ''}
                autoFocus
              />
            </div>
            
            {error && <div className="error-message">{error}</div>}
            
            <button type="submit" className="auth-button">
              <span>Unlock</span>
              <div className="button-glow"></div>
            </button>
          </form>
          
        </div>
      </div>
      
      <div className="background-pattern"></div>
    </div>
  );
};

export default AuthScreen;