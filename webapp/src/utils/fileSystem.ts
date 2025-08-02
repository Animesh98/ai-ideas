import type { FileNode } from '../types';

// Static file structure - this will be generated at build time
export const FILE_STRUCTURE: FileNode[] = [
  {
    name: 'Ideas',
    path: 'ideas',
    type: 'folder',
    children: [
      {
        name: 'AI Projects',
        path: 'ideas/ai',
        type: 'folder',
        children: [
          {
            name: 'Personal Assistant',
            path: 'ideas/ai/personal_assistant.md',
            type: 'file'
          },
          {
            name: 'Personal Assistant Development Tracker',
            path: 'ideas/ai/personal_assistant_development_tracker.md',
            type: 'file'
          }
        ]
      },
      {
        name: 'Business Ideas',
        path: 'ideas/business',
        type: 'folder',
        children: []
      },
      {
        name: 'Drafts',
        path: 'ideas/drafts',
        type: 'folder',
        children: [
          {
            name: 'News Platform',
            path: 'ideas/drafts/news.md',
            type: 'file'
          },
          {
            name: 'Operating System',
            path: 'ideas/drafts/operating_system.md',
            type: 'file'
          },
          {
            name: 'Personal Assistant (Draft)',
            path: 'ideas/drafts/personal_assistant.md',
            type: 'file'
          },
          {
            name: 'YouTube Video Agent',
            path: 'ideas/drafts/yt_vid_agent.md',
            type: 'file'
          }
        ]
      }
    ]
  },
  {
    name: 'Business Infrastructure',
    path: 'business-infrastructure',
    type: 'folder',
    children: [
      {
        name: 'Company Setup',
        path: 'business-infrastructure/company-setup',
        type: 'folder',
        children: [
          {
            name: 'Business Registration',
            path: 'business-infrastructure/company-setup/business-registration.md',
            type: 'file'
          }
        ]
      },
      {
        name: 'Tools & Stack',
        path: 'business-infrastructure/tools-stack',
        type: 'folder',
        children: [
          {
            name: 'Essential Tools',
            path: 'business-infrastructure/tools-stack/essential-tools.md',
            type: 'file'
          }
        ]
      }
    ]
  },
  {
    name: 'Execution Roadmaps',
    path: 'execution-roadmaps',
    type: 'folder',
    children: [
      {
        name: 'Master Execution Plan',
        path: 'execution-roadmaps/master-execution-plan.md',
        type: 'file'
      },
      {
        name: 'Side Hustle Master Plan',
        path: 'execution-roadmaps/side-hustle-master-plan.md',
        type: 'file'
      }
    ]
  },
  {
    name: 'Financial Planning',
    path: 'financial-planning',
    type: 'folder',
    children: [
      {
        name: 'Startup Budget',
        path: 'financial-planning/startup-budget.md',
        type: 'file'
      }
    ]
  },
  {
    name: 'Legal & Compliance',
    path: 'legal-compliance',
    type: 'folder',
    children: [
      {
        name: 'Essential Legal',
        path: 'legal-compliance/essential-legal.md',
        type: 'file'
      },
      {
        name: 'Indian Compliance Guide',
        path: 'legal-compliance/indian-compliance-guide.md',
        type: 'file'
      }
    ]
  },
  {
    name: 'Marketing & Growth',
    path: 'marketing-growth',
    type: 'folder',
    children: [
      {
        name: 'Content Strategy',
        path: 'marketing-growth/content-strategy.md',
        type: 'file'
      },
      {
        name: 'Time Constrained Marketing',
        path: 'marketing-growth/time-constrained-marketing.md',
        type: 'file'
      }
    ]
  },
  {
    name: 'Personal Development',
    path: 'personal-development',
    type: 'folder',
    children: [
      {
        name: 'Entrepreneur Mindset',
        path: 'personal-development/entrepreneur-mindset.md',
        type: 'file'
      }
    ]
  },
  {
    name: 'Research & Validation',
    path: 'research-validation',
    type: 'folder',
    children: [
      {
        name: 'Indian Market Insights',
        path: 'research-validation/indian-market-insights.md',
        type: 'file'
      },
      {
        name: 'Market Research Framework',
        path: 'research-validation/market-research-framework.md',
        type: 'file'
      }
    ]
  }
];

export const findFileByPath = (path: string, nodes: FileNode[] = FILE_STRUCTURE): FileNode | null => {
  for (const node of nodes) {
    if (node.path === path) {
      return node;
    }
    if (node.children) {
      const found = findFileByPath(path, node.children);
      if (found) return found;
    }
  }
  return null;
};

export const getAllFiles = (nodes: FileNode[] = FILE_STRUCTURE): FileNode[] => {
  const files: FileNode[] = [];
  
  const traverse = (nodes: FileNode[]) => {
    for (const node of nodes) {
      if (node.type === 'file') {
        files.push(node);
      }
      if (node.children) {
        traverse(node.children);
      }
    }
  };
  
  traverse(nodes);
  return files;
};

export const getFileContent = async (path: string): Promise<string> => {
  try {
    // Convert path to the format used in the JSON files
    const jsonPath = `/ai-ideas/content/${path.replace(/\//g, '_').replace(/\.md$/, '')}.json`;
    const response = await fetch(jsonPath);
    
    if (response.ok) {
      const data = await response.json();
      return data.content;
    } else {
      console.warn(`Could not load content for ${path} (${response.status})`);
    }
  } catch (error) {
    console.warn(`Error loading content for ${path}:`, error);
  }
  
  // Fallback content
  const fileName = path.split('/').pop()?.replace('.md', '') || 'Untitled';
  return `# ${fileName}\n\nContent for this file is not available. This might be because:\n\n- The file doesn't exist in the repository\n- The content hasn't been generated yet\n- There was an error loading the file\n\nPlease check that the file exists and try refreshing the page.`;
};