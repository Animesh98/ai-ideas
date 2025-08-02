import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Edit3, Eye, Save, X } from 'lucide-react';
import { getFileContent } from '../utils/fileSystem';

interface MarkdownViewerProps {
  filePath: string | null;
  editMode: boolean;
  onToggleEdit: () => void;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ 
  filePath, 
  editMode, 
  onToggleEdit 
}) => {
  const [content, setContent] = useState<string>('');
  const [editContent, setEditContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (filePath) {
      setLoading(true);
      getFileContent(filePath)
        .then(content => {
          setContent(content);
          setEditContent(content);
        })
        .catch(error => {
          console.error('Error loading file:', error);
          setContent(`# Error\n\nCould not load file: ${filePath}`);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [filePath]);

  const handleSave = () => {
    setContent(editContent);
    onToggleEdit();
    // In a real implementation, this would save to a backend or GitHub API
  };

  const handleCancel = () => {
    setEditContent(content);
    onToggleEdit();
  };

  if (!filePath) {
    return (
      <div className="markdown-viewer empty-state">
        <div className="empty-content">
          <div className="empty-icon">📝</div>
          <h2>Welcome to AI Ideas</h2>
          <p>Select a file from the sidebar to start reading.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="markdown-viewer loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="markdown-viewer">
      <div className="viewer-header">
        <div className="file-info">
          <h1>{filePath.split('/').pop()?.replace('.md', '') || 'Untitled'}</h1>
          <span className="file-path">{filePath}</span>
        </div>
        
        <div className="viewer-actions">
          {editMode ? (
            <>
              <button className="action-btn save" onClick={handleSave}>
                <Save size={18} />
                <span>Save</span>
              </button>
              <button className="action-btn cancel" onClick={handleCancel}>
                <X size={18} />
                <span>Cancel</span>
              </button>
            </>
          ) : (
            <button className="action-btn edit" onClick={onToggleEdit}>
              <Edit3 size={18} />
              <span>Edit</span>
            </button>
          )}
        </div>
      </div>
      
      <div className="viewer-content">
        {editMode ? (
          <div className="editor-container">
            <div className="editor-tabs">
              <div className="tab active">
                <Edit3 size={14} />
                <span>Edit</span>
              </div>
              <div className="tab">
                <Eye size={14} />
                <span>Preview</span>
              </div>
            </div>
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="markdown-editor"
              placeholder="Start writing..."
            />
          </div>
        ) : (
          <div className="markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '');
                  const inline = (props as any).inline;
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={oneDark as any}
                      language={match[1]}
                      PreTag="div"
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className}>
                      {children}
                    </code>
                  );
                },
                h1: ({ children }) => <h1 className="heading-1">{children}</h1>,
                h2: ({ children }) => <h2 className="heading-2">{children}</h2>,
                h3: ({ children }) => <h3 className="heading-3">{children}</h3>,
                blockquote: ({ children }) => <blockquote className="blockquote">{children}</blockquote>,
                table: ({ children }) => <table className="table">{children}</table>,
                a: ({ href, children }) => (
                  <a href={href} className="link" target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarkdownViewer;