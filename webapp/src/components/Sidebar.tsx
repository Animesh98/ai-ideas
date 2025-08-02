import React, { useState } from 'react';
import { ChevronDown, ChevronRight, FileText, Folder, FolderOpen, Search, Plus } from 'lucide-react';
import type { FileNode } from '../types';
import { FILE_STRUCTURE } from '../utils/fileSystem';
import clsx from 'clsx';

interface SidebarProps {
  selectedFile: string | null;
  onFileSelect: (path: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

interface FileTreeProps {
  nodes: FileNode[];
  selectedFile: string | null;
  onFileSelect: (path: string) => void;
  level?: number;
}

const FileTree: React.FC<FileTreeProps> = ({ nodes, selectedFile, onFileSelect, level = 0 }) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['ideas']));

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(path)) {
        newSet.delete(path);
      } else {
        newSet.add(path);
      }
      return newSet;
    });
  };

  return (
    <div className="file-tree">
      {nodes.map((node) => (
        <div key={node.path} className="file-tree-item">
          {node.type === 'folder' ? (
            <>
              <div
                className={clsx('folder-item', {
                  'expanded': expandedFolders.has(node.path)
                })}
                style={{ paddingLeft: `${level * 16 + 8}px` }}
                onClick={() => toggleFolder(node.path)}
              >
                <div className="folder-icon">
                  {expandedFolders.has(node.path) ? (
                    <>
                      <ChevronDown size={14} />
                      <FolderOpen size={16} />
                    </>
                  ) : (
                    <>
                      <ChevronRight size={14} />
                      <Folder size={16} />
                    </>
                  )}
                </div>
                <span className="folder-name">{node.name}</span>
              </div>
              {expandedFolders.has(node.path) && node.children && (
                <FileTree
                  nodes={node.children}
                  selectedFile={selectedFile}
                  onFileSelect={onFileSelect}
                  level={level + 1}
                />
              )}
            </>
          ) : (
            <div
              className={clsx('file-item', {
                'selected': selectedFile === node.path
              })}
              style={{ paddingLeft: `${level * 16 + 32}px` }}
              onClick={() => onFileSelect(node.path)}
            >
              <FileText size={16} />
              <span className="file-name">{node.name}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const Sidebar: React.FC<SidebarProps> = ({ selectedFile, onFileSelect, isOpen, onToggle }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFiles = React.useMemo(() => {
    if (!searchTerm) return FILE_STRUCTURE;
    
    // Simple search implementation
    const filterNodes = (nodes: FileNode[]): FileNode[] => {
      return nodes.reduce((acc: FileNode[], node) => {
        if (node.type === 'file' && node.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          acc.push(node);
        } else if (node.type === 'folder' && node.children) {
          const filteredChildren = filterNodes(node.children);
          if (filteredChildren.length > 0) {
            acc.push({ ...node, children: filteredChildren });
          }
        }
        return acc;
      }, []);
    };
    
    return filterNodes(FILE_STRUCTURE);
  }, [searchTerm]);

  return (
    <>
      <div className={clsx('sidebar-overlay', { 'active': isOpen })} onClick={onToggle} />
      <aside className={clsx('sidebar', { 'open': isOpen })}>
        <div className="sidebar-header">
          <h2>AI Ideas</h2>
          <button className="new-file-btn" title="New File">
            <Plus size={18} />
          </button>
        </div>
        
        <div className="search-container">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="file-list">
          <FileTree
            nodes={filteredFiles}
            selectedFile={selectedFile}
            onFileSelect={onFileSelect}
          />
        </div>
        
        <div className="sidebar-footer">
          <div className="file-count">
            {FILE_STRUCTURE.reduce((count, node) => {
              const countFiles = (nodes: FileNode[]): number => {
                return nodes.reduce((sum, n) => {
                  if (n.type === 'file') return sum + 1;
                  if (n.children) return sum + countFiles(n.children);
                  return sum;
                }, 0);
              };
              return count + countFiles([node]);
            }, 0)} files
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;