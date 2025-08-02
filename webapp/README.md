# AI Ideas Web App

A modern, minimal web application for browsing and editing markdown files from the AI Ideas repository. Features an Apple Notes-inspired design with full mobile responsiveness.

## Features

### 🎨 Modern Design
- **Apple Notes-inspired UI** with clean, professional aesthetics
- **Fully responsive** design that works on desktop, tablet, and mobile
- **Dark/light theme** support with smooth transitions
- **Beautiful animations** and micro-interactions

### 📝 Rich Markdown Support
- **GitHub Flavored Markdown** rendering with syntax highlighting
- **Interactive editor** with live preview capabilities
- **Code block highlighting** using Prism.js
- **Tables, lists, and blockquotes** support
- **External link handling** with proper security

### 🔐 Simple Authentication
- **Password protection** with innovative login screen
- **Session persistence** for 24 hours
- **Multiple password support** for different access levels
- **Secure client-side authentication**

### 📱 Mobile-First Experience
- **Responsive sidebar** that slides out on mobile
- **Touch-friendly interface** with proper gesture support
- **Optimized typography** for all screen sizes
- **Progressive Web App** capabilities

### 🗂️ Intelligent File Organization
- **Hierarchical folder structure** matching repository layout
- **Search functionality** across all files
- **File tree navigation** with expand/collapse
- **Auto-generated file structure** from repository content

## Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Development

1. **Install dependencies**
   ```bash
   cd webapp
   npm install
   ```

2. **Generate content from markdown files**
   ```bash
   npm run build-content
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173/ai-ideas/`
   - Use password: `ideas2024` or `stiffler123`

### Production Build

```bash
npm run build
```

This will:
1. Generate JSON content files from all markdown files
2. Compile TypeScript and build the React app
3. Output everything to `dist/` directory

## Authentication

The app uses simple client-side password protection:

- **Default passwords**: `ideas2024`, `stiffler123`
- **Session duration**: 24 hours
- **Secure storage**: Uses localStorage with timestamp validation

> **Note**: This is basic protection suitable for personal use. For production deployment with sensitive content, consider implementing proper server-side authentication.

## File Structure

```
webapp/
├── public/
│   └── content/          # Auto-generated JSON files
├── scripts/
│   └── build-content.js  # Content generation script
├── src/
│   ├── components/       # React components
│   │   ├── AuthScreen.tsx
│   │   ├── Sidebar.tsx
│   │   └── MarkdownViewer.tsx
│   ├── utils/           # Utility functions
│   │   ├── auth.ts
│   │   └── fileSystem.ts
│   ├── types.ts         # TypeScript definitions
│   ├── App.tsx          # Main app component
│   └── App.css          # Styles
└── README.md
```

## Deployment

### GitHub Pages

1. **Enable GitHub Pages** in repository settings
2. **Push to main branch** - the GitHub Action will automatically build and deploy
3. **Access your site** at `https://username.github.io/repository-name/`

### Manual Deployment

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Deploy the `dist/` folder** to any static hosting service:
   - Netlify
   - Vercel  
   - AWS S3
   - Your own server

## Customization

### Passwords
Edit the `VALID_PASSWORDS` array in `src/utils/auth.ts`:

```typescript
const VALID_PASSWORDS = ['your-password-here'];
```

### Styling
The app uses CSS custom properties for easy theming. Edit variables in `src/App.css`:

```css
:root {
  --accent-primary: #007aff;  /* Primary color */
  --bg-primary: #ffffff;      /* Background color */
  /* ... more variables */
}
```

### File Structure
The app automatically reads the repository structure. To modify the displayed structure, edit `FILE_STRUCTURE` in `src/utils/fileSystem.ts`.

## Browser Support

- ✅ **Chrome/Edge** 90+
- ✅ **Firefox** 88+  
- ✅ **Safari** 14+
- ✅ **Mobile browsers** (iOS Safari, Chrome Mobile)

## Performance

- ⚡ **Fast loading** with code splitting
- 📦 **Small bundle size** (~200KB gzipped)
- 🎯 **Efficient rendering** with React 18
- 💾 **Smart caching** of markdown content

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and test thoroughly
4. Commit with a clear message: `git commit -m "Add feature"`
5. Push and create a pull request

## License

This project is part of the AI Ideas repository and follows the same license terms.

---

**Built with**: React, TypeScript, Vite, and modern web technologies  
**Inspired by**: Apple Notes, Linear, and other beautiful web applications