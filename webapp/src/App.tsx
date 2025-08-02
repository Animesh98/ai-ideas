import { useState, useEffect } from 'react';
import { Menu, LogOut, Sun, Moon } from 'lucide-react';
import AuthScreen from './components/AuthScreen';
import Sidebar from './components/Sidebar';
import MarkdownViewer from './components/MarkdownViewer';
import { checkAuth, logout } from './utils/auth';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import type { AppState } from './types';
import './App.css';

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const [appState, setAppState] = useState<AppState>({
    isAuthenticated: false,
    selectedFile: null,
    sidebarOpen: false,
    editMode: false,
  });

  useEffect(() => {
    setAppState(prev => ({
      ...prev,
      isAuthenticated: checkAuth()
    }));
  }, []);

  const handleAuthenticated = () => {
    setAppState(prev => ({ ...prev, isAuthenticated: true }));
  };

  const handleLogout = () => {
    logout();
    setAppState({
      isAuthenticated: false,
      selectedFile: null,
      sidebarOpen: false,
      editMode: false,
    });
  };

  const handleFileSelect = (path: string) => {
    setAppState(prev => ({
      ...prev,
      selectedFile: path,
      sidebarOpen: false, // Close sidebar on mobile after selection
      editMode: false,
    }));
  };

  const handleNewFile = () => {
    const fileName = prompt('Enter file name (without .md extension):');
    if (fileName) {
      const newFilePath = `new/${fileName}.md`;
      setAppState(prev => ({
        ...prev,
        selectedFile: newFilePath,
        editMode: true,
        sidebarOpen: false,
      }));
    }
  };

  const toggleSidebar = () => {
    setAppState(prev => ({ ...prev, sidebarOpen: !prev.sidebarOpen }));
  };

  const toggleEditMode = () => {
    setAppState(prev => ({ ...prev, editMode: !prev.editMode }));
  };

  if (!appState.isAuthenticated) {
    return <AuthScreen onAuthenticated={handleAuthenticated} />;
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <button className="menu-btn" onClick={toggleSidebar}>
            <Menu size={20} />
          </button>
          <h1 className="app-title">AI Ideas</h1>
        </div>
        
        <div className="header-right">
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            <span>{theme === 'light' ? 'Dark' : 'Light'}</span>
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <main className="app-main">
        <Sidebar
          selectedFile={appState.selectedFile}
          onFileSelect={handleFileSelect}
          onNewFile={handleNewFile}
          isOpen={appState.sidebarOpen}
          onToggle={toggleSidebar}
        />
        
        <div className="content-area">
          <MarkdownViewer
            filePath={appState.selectedFile}
            editMode={appState.editMode}
            onToggleEdit={toggleEditMode}
          />
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
