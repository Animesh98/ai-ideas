import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the root directory (parent of webapp)
const rootDir = path.resolve(__dirname, '../../');
const contentDir = path.join(__dirname, '../public/content');

// Ensure content directory exists
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

// Function to read markdown files recursively
function readMarkdownFiles(dir, basePath = '') {
  const files = fs.readdirSync(dir);
  const content = {};

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      // Skip node_modules, .git, and webapp directories
      if (['node_modules', '.git', 'webapp', '.next', 'dist'].includes(file)) {
        continue;
      }
      
      // Recursively read subdirectories
      const subContent = readMarkdownFiles(fullPath, path.join(basePath, file));
      Object.assign(content, subContent);
    } else if (file.endsWith('.md')) {
      // Read markdown file
      const relativePath = path.join(basePath, file);
      const fileContent = fs.readFileSync(fullPath, 'utf-8');
      
      // Convert path to key (replace / with _)
      const key = relativePath.replace(/\//g, '_').replace(/\.md$/, '');
      
      content[relativePath] = {
        path: relativePath,
        name: file.replace('.md', ''),
        content: fileContent,
        lastModified: stat.mtime
      };
      
      // Also save individual file
      const outputPath = path.join(contentDir, `${key}.json`);
      fs.writeFileSync(outputPath, JSON.stringify({
        path: relativePath,
        name: file.replace('.md', ''),
        content: fileContent,
        lastModified: stat.mtime
      }, null, 2));
      
      console.log(`Generated: ${outputPath}`);
    }
  }
  
  return content;
}

// Read all markdown files
console.log('Building content from markdown files...');
console.log('Root directory:', rootDir);

const allContent = readMarkdownFiles(rootDir);

// Write combined content file
const combinedOutputPath = path.join(contentDir, 'all-content.json');
fs.writeFileSync(combinedOutputPath, JSON.stringify(allContent, null, 2));

console.log(`\nGenerated ${Object.keys(allContent).length} content files`);
console.log(`Combined content saved to: ${combinedOutputPath}`);
console.log('\nContent build complete! 🎉');