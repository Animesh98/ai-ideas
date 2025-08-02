export interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  content?: string;
}

export interface AppState {
  isAuthenticated: boolean;
  selectedFile: string | null;
  sidebarOpen: boolean;
  editMode: boolean;
}

export interface MarkdownFile {
  path: string;
  name: string;
  content: string;
  lastModified?: Date;
}