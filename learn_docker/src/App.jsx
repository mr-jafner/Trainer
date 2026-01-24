import React, { useState, useEffect, useCallback, useRef } from 'react';
import { config, referenceData } from './config.js';
import { curriculum } from './curriculum.js';

// ============================================================================
// LEARNING PLATFORM SCAFFOLD
// 
// This file contains all the reusable infrastructure:
// - Visualization components (DataFlow, ConceptMap, FaultTree)
// - Navigation (Dashboard, Category, Module views)
// - State management (progress, notes, bookmarks)
// - Modals (QuickReview, Reference, KeyboardHelp, Notes)
// - Export utilities (Markdown, Print)
// 
// YOU SHOULD NOT NEED TO EDIT THIS FILE for basic usage.
// Instead, edit:
// - src/config.js    → App settings, theme, features
// - src/curriculum.js → Your learning content
// 
// For subject-specific features (like a metronome for guitar, or SQL sandbox),
// add them in a separate file and import into this one.
// ============================================================================


// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const generateMarkdownExport = (progress, notes, curriculum, config) => {
  let md = `# ${config.title} - Reference Export\n\n`;
  md += `Generated: ${new Date().toLocaleDateString()}\n\n`;
  md += `---\n\n`;

  Object.values(curriculum).forEach(category => {
    const completedModules = category.modules.filter(m => progress[m.id]?.complete);
    if (completedModules.length === 0) return;

    md += `## ${category.icon} ${category.title}\n\n`;

    completedModules.forEach(module => {
      md += `### ${module.title}\n\n`;
      md += `**Why this matters:** ${module.why}\n\n`;

      if (module.pitfalls?.length > 0) {
        md += `**Watch out for:**\n`;
        module.pitfalls.forEach(p => {
          md += `- ${p}\n`;
        });
        md += `\n`;
      }

      // Export reveals based on module type
      if (module.type === 'conceptmap' && module.content.branches) {
        md += `**Key concepts:**\n\n`;
        module.content.branches.forEach(branch => {
          md += `**${branch.label}:** ${branch.details}\n`;
          if (branch.example) md += `- Example: ${branch.example}\n`;
          if (branch.children?.length > 0) {
            branch.children.forEach(child => {
              md += `  - ${child}\n`;
            });
          }
          md += `\n`;
        });
      }

      if (module.type === 'dataflow' && module.content.reveals) {
        md += `**Process steps:**\n\n`;
        module.content.nodes.forEach(node => {
          if (module.content.reveals[node.id]) {
            md += `**${node.label}:** ${module.content.reveals[node.id]}\n\n`;
          }
        });
      }

      if (module.type === 'faulttree' && module.content.branches) {
        md += `**Troubleshooting "${module.content.root}":**\n\n`;
        module.content.branches.forEach(branch => {
          md += `**${branch.fault}:**\n`;
          branch.causes.forEach(cause => {
            md += `- ${cause.cause}: ${cause.detail}\n`;
            md += `  - Fix: ${cause.fix}\n`;
          });
          md += `\n`;
        });
      }

      // Include notes if present
      if (notes.modules?.[module.id]) {
        md += `**My notes:** ${notes.modules[module.id]}\n\n`;
      }

      md += `---\n\n`;
    });
  });

  return md;
};

const downloadFile = (content, filename, type = 'text/markdown') => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};


// ============================================================================
// KEYBOARD NAVIGATION HOOK
// ============================================================================

const useKeyboardNav = (handlers) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if typing in input/textarea
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const key = e.key.toLowerCase();
      
      // Handle ctrl combinations
      if (e.ctrlKey || e.metaKey) {
        if (handlers[`ctrl+${key}`]) {
          e.preventDefault();
          handlers[`ctrl+${key}`]();
          return;
        }
      }

      // Handle regular keys
      if (handlers[key]) {
        e.preventDefault();
        handlers[key]();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlers]);
};


// ============================================================================
// VISUALIZATION COMPONENTS
// ============================================================================

// Data Flow Diagram Component
const DataFlowDiagram = ({ content, revealed, onReveal }) => {
  const getNodeColor = (type) => {
    switch (type) {
      case 'boundary': return { bg: '#1e3a5f', border: '#3b82f6', text: '#93c5fd' };
      case 'process': return { bg: '#4a3728', border: '#f59e0b', text: '#fcd34d' };
      case 'flow': return { bg: '#1a3d2e', border: '#22c55e', text: '#86efac' };
      default: return { bg: '#374151', border: '#6b7280', text: '#d1d5db' };
    }
  };

  // Calculate SVG dimensions based on node positions
  const maxX = Math.max(...content.nodes.map(n => n.x)) + 150;
  const maxY = Math.max(...content.nodes.map(n => n.y)) + 100;

  return (
    <div className="space-y-4">
      <p className="text-slate-300 text-sm">{content.description}</p>
      
      <div className="overflow-x-auto">
        <svg 
          viewBox={`0 0 ${maxX} ${maxY}`} 
          className="w-full min-w-[600px]"
          style={{ maxHeight: '400px' }}
          role="img"
          aria-label={`Data flow diagram: ${content.description}`}
        >
          {/* Draw edges */}
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
            </marker>
          </defs>
          
          {content.edges.map((edge, i) => {
            const fromNode = content.nodes.find(n => n.id === edge.from);
            const toNode = content.nodes.find(n => n.id === edge.to);
            if (!fromNode || !toNode) return null;
            
            return (
              <line
                key={i}
                x1={fromNode.x + 60}
                y1={fromNode.y + 25}
                x2={toNode.x - 10}
                y2={toNode.y + 25}
                stroke="#64748b"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
            );
          })}

          {/* Draw nodes */}
          {content.nodes.map(node => {
            const colors = getNodeColor(node.type);
            const isRevealed = revealed.includes(node.id);
            
            return (
              <g key={node.id}>
                <rect
                  x={node.x}
                  y={node.y}
                  width="120"
                  height="50"
                  rx="8"
                  fill={colors.bg}
                  stroke={colors.border}
                  strokeWidth="2"
                  className="cursor-pointer transition-all hover:brightness-110"
                  onClick={() => onReveal(node.id)}
                  role="button"
                  aria-label={`${node.label}${isRevealed ? ' (revealed)' : ' (click to reveal)'}`}
                  aria-expanded={isRevealed}
                />
                <text
                  x={node.x + 60}
                  y={node.y + 30}
                  textAnchor="middle"
                  fill={colors.text}
                  fontSize="12"
                  fontWeight="500"
                  className="pointer-events-none"
                >
                  {node.label}
                </text>
                {!isRevealed && (
                  <circle
                    cx={node.x + 110}
                    cy={node.y + 10}
                    r="6"
                    fill="#3b82f6"
                    className="animate-pulse"
                  />
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Reveals */}
      <div className="space-y-2 mt-4">
        {content.nodes.map(node => {
          if (!revealed.includes(node.id)) return null;
          const colors = getNodeColor(node.type);
          return (
            <div
              key={node.id}
              className="p-3 rounded-lg border-l-4"
              style={{ backgroundColor: colors.bg, borderColor: colors.border }}
            >
              <span className="font-semibold" style={{ color: colors.text }}>{node.label}:</span>
              <span className="text-slate-300 ml-2">{content.reveals[node.id]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};


// Concept Map Component
const ConceptMap = ({ content, revealed, onReveal }) => {
  return (
    <div className="space-y-4">
      {content.description && (
        <p className="text-slate-300 text-sm">{content.description}</p>
      )}
      
      {/* Central concept */}
      <div className="text-center mb-6">
        <div className="inline-block bg-slate-700 px-6 py-3 rounded-xl border-2 border-slate-500">
          <span className="text-xl font-bold text-white">{content.central}</span>
        </div>
      </div>

      {/* Branches */}
      <div className="grid gap-4 md:grid-cols-2">
        {content.branches.map(branch => {
          const isRevealed = revealed.includes(branch.id);
          
          return (
            <div
              key={branch.id}
              className="rounded-lg overflow-hidden cursor-pointer transition-all hover:scale-[1.02]"
              style={{ backgroundColor: `${branch.color}20`, border: `2px solid ${branch.color}` }}
              onClick={() => onReveal(branch.id)}
              role="button"
              aria-expanded={isRevealed}
              aria-label={`${branch.label}${isRevealed ? '' : ' (click to expand)'}`}
            >
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-white">{branch.label}</h4>
                  {!isRevealed && (
                    <span className="text-xs bg-slate-600 px-2 py-1 rounded text-slate-300">
                      Click to expand
                    </span>
                  )}
                </div>
                
                {isRevealed && (
                  <div className="mt-3 space-y-3">
                    <p className="text-slate-200">{branch.details}</p>
                    
                    {branch.example && (
                      <div className="bg-slate-800/50 p-2 rounded text-sm">
                        <span className="text-slate-400">Example: </span>
                        <span className="text-slate-200">{branch.example}</span>
                      </div>
                    )}
                    
                    {branch.children?.length > 0 && (
                      <ul className="space-y-1">
                        {branch.children.map((child, i) => (
                          <li key={i} className="text-slate-300 text-sm flex items-start gap-2">
                            <span style={{ color: branch.color }}>•</span>
                            {child}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};


// Fault Tree Component
const FaultTree = ({ content, revealed, onReveal }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '•';
    }
  };

  return (
    <div className="space-y-4">
      {/* Root problem */}
      <div className="text-center mb-6">
        <div className="inline-block bg-red-900/50 px-6 py-3 rounded-xl border-2 border-red-500">
          <span className="text-xl font-bold text-red-200">{content.root}</span>
        </div>
      </div>

      {/* Fault branches */}
      <div className="space-y-4">
        {content.branches.map((branch, branchIndex) => {
          const branchId = `branch-${branchIndex}`;
          const isRevealed = revealed.includes(branchId);
          
          return (
            <div
              key={branchId}
              className="bg-slate-800 rounded-lg overflow-hidden"
            >
              <button
                className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-700 transition-colors"
                onClick={() => onReveal(branchId)}
                aria-expanded={isRevealed}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getIcon(branch.icon)}</span>
                  <span className="font-semibold text-white">{branch.fault}</span>
                </div>
                <span className="text-slate-400">
                  {isRevealed ? '▼' : '▶'}
                </span>
              </button>

              {isRevealed && (
                <div className="px-4 pb-4 space-y-3">
                  {branch.causes.map((cause, causeIndex) => (
                    <div
                      key={causeIndex}
                      className="bg-slate-900 rounded-lg p-4 border-l-4 border-amber-500"
                    >
                      <h5 className="font-semibold text-amber-200">{cause.cause}</h5>
                      <p className="text-slate-300 text-sm mt-1">{cause.detail}</p>
                      <div className="mt-2 bg-green-900/30 p-2 rounded border border-green-700">
                        <span className="text-green-400 text-sm font-medium">Fix: </span>
                        <span className="text-green-200 text-sm">{cause.fix}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};


// ============================================================================
// MODAL COMPONENTS
// ============================================================================

// Keyboard Help Modal
const KeyboardHelpModal = ({ onClose }) => {
  const shortcuts = [
    { key: 'Q', action: 'Open Quick Review' },
    { key: 'R', action: 'Open Reference' },
    { key: 'Ctrl+E', action: 'Export to Markdown' },
    { key: 'Ctrl+P', action: 'Print' },
    { key: 'Esc', action: 'Close modal / Go back' },
    { key: 'J', action: 'Next item' },
    { key: 'K', action: 'Previous item' },
    { key: 'Enter', action: 'Select / Expand' },
    { key: '?', action: 'Show this help' },
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800 rounded-xl p-6 max-w-md w-full"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-label="Keyboard shortcuts"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Keyboard Shortcuts</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-2">
          {shortcuts.map(({ key, action }) => (
            <div key={key} className="flex items-center justify-between py-2 border-b border-slate-700">
              <kbd className="bg-slate-700 px-3 py-1 rounded text-sm font-mono text-slate-200">
                {key}
              </kbd>
              <span className="text-slate-300">{action}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


// Quick Review Modal
const QuickReviewModal = ({ progress, curriculum, notes, onClose, onNavigate }) => {
  const completedModules = [];
  
  Object.values(curriculum).forEach(category => {
    category.modules.forEach(module => {
      if (progress[module.id]?.complete) {
        completedModules.push({
          ...module,
          categoryTitle: category.title,
          categoryIcon: category.icon,
          note: notes.modules?.[module.id],
        });
      }
    });
  });

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-label="Quick review"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Quick Review</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {completedModules.length === 0 ? (
          <p className="text-slate-400 text-center py-8">
            No completed modules yet. Complete some modules to see them here!
          </p>
        ) : (
          <div className="space-y-2">
            {completedModules.map(module => (
              <button
                key={module.id}
                className="w-full text-left p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                onClick={() => {
                  onNavigate(module);
                  onClose();
                }}
              >
                <div className="flex items-center gap-2">
                  <span>{module.categoryIcon}</span>
                  <span className="font-medium text-white">{module.title}</span>
                  <span className="text-xs bg-slate-600 px-2 py-0.5 rounded text-slate-300">
                    {module.type}
                  </span>
                </div>
                {module.note && (
                  <p className="text-slate-400 text-sm mt-1 truncate">
                    📝 {module.note}
                  </p>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


// Reference Modal
const ReferenceModal = ({ onClose }) => {
  const [activeSection, setActiveSection] = useState(referenceData.sections[0]?.id);

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800 rounded-xl p-6 max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-label="Reference"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Reference</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Section tabs */}
        <div className="flex flex-wrap gap-2 mb-4" role="tablist">
          {referenceData.sections.map(section => (
            <button
              key={section.id}
              role="tab"
              aria-selected={activeSection === section.id}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1" role="tabpanel">
          {referenceData.sections
            .filter(s => s.id === activeSection)
            .map(section => (
              <div key={section.id} className="space-y-3">
                {section.content.map((item, i) => (
                  <div key={i} className="bg-slate-700 p-3 rounded-lg">
                    <span className="font-semibold text-blue-300">{item.term}: </span>
                    <span className="text-slate-200">{item.definition}</span>
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};


// Notes Modal
const NotesModal = ({ moduleId, moduleTitle, notes, onSave, onClose }) => {
  const [text, setText] = useState(notes.modules?.[moduleId] || '');
  const textareaRef = useRef(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSave = () => {
    onSave(moduleId, text);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-slate-800 rounded-xl p-6 max-w-lg w-full"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-label={`Notes for ${moduleTitle}`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Notes: {moduleTitle}</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <textarea
          ref={textareaRef}
          value={text}
          onChange={e => setText(e.target.value)}
          className="w-full h-48 bg-slate-900 border border-slate-600 rounded-lg p-3 text-white resize-none focus:outline-none focus:border-blue-500"
          placeholder="Add your personal notes here..."
        />

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};


// ============================================================================
// VIEW COMPONENTS
// ============================================================================

// Dashboard View
const Dashboard = ({ curriculum, progress, onSelectCategory }) => {
  const totalModules = Object.values(curriculum).reduce(
    (sum, cat) => sum + cat.modules.length, 0
  );
  const completedModules = Object.values(curriculum).reduce(
    (sum, cat) => sum + cat.modules.filter(m => progress[m.id]?.complete).length, 0
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">{config.title}</h1>
        <p className="text-slate-400">{config.subtitle}</p>
        <div className="mt-4 inline-block bg-slate-800 px-6 py-3 rounded-full">
          <span className="text-slate-300">Overall Progress: </span>
          <span className="text-blue-400 font-bold">
            {completedModules}/{totalModules} modules
          </span>
        </div>
      </div>

      {/* Categories */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.values(curriculum).map(category => {
          const completed = category.modules.filter(m => progress[m.id]?.complete).length;
          const total = category.modules.length;
          const percent = Math.round((completed / total) * 100);

          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category)}
              className="text-left p-6 rounded-xl bg-slate-800 hover:bg-slate-700 transition-all border-2 hover:scale-[1.02]"
              style={{ borderColor: category.color }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{category.icon}</span>
                <h2 className="text-xl font-bold text-white">{category.title}</h2>
              </div>
              
              <p className="text-slate-400 text-sm mb-4">{category.description}</p>

              {/* Progress bar */}
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full transition-all"
                  style={{ width: `${percent}%`, backgroundColor: category.color }}
                />
              </div>
              <p className="text-right text-sm text-slate-400 mt-1">
                {completed}/{total} complete
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};


// Category View
const CategoryView = ({ category, progress, onBack, onSelectModule }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          aria-label="Back to dashboard"
        >
          <span className="text-2xl">←</span>
        </button>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl">{category.icon}</span>
            <h1 className="text-3xl font-bold text-white">{category.title}</h1>
          </div>
          <p className="text-slate-400">{category.description}</p>
        </div>
      </div>

      {/* Modules */}
      <div className="grid gap-4">
        {category.modules.map((module, index) => {
          const isComplete = progress[module.id]?.complete;
          const typeColors = {
            dataflow: config.theme.dataflow,
            conceptmap: config.theme.conceptmap,
            faulttree: config.theme.faulttree,
          };

          return (
            <button
              key={module.id}
              onClick={() => onSelectModule(module)}
              className={`text-left p-4 rounded-lg transition-all hover:scale-[1.01] ${
                isComplete 
                  ? 'bg-green-900/30 border-2 border-green-600' 
                  : 'bg-slate-800 border-2 border-slate-600 hover:border-slate-500'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 font-mono">{String(index + 1).padStart(2, '0')}</span>
                  <span className="font-semibold text-white">{module.title}</span>
                  <span 
                    className="text-xs px-2 py-0.5 rounded"
                    style={{ 
                      backgroundColor: `${typeColors[module.type]}30`,
                      color: typeColors[module.type]
                    }}
                  >
                    {module.type}
                  </span>
                </div>
                {isComplete && (
                  <span className="text-green-400 text-xl" title="Completed">✓</span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};


// Module View
const ModuleView = ({ module, category, progress, notes, onBack, onComplete, onSaveNote }) => {
  const [revealed, setRevealed] = useState(progress[module.id]?.revealed || []);
  const [showNotes, setShowNotes] = useState(false);
  const isComplete = progress[module.id]?.complete;

  // Calculate required reveals
  const getRequiredReveals = () => {
    switch (module.type) {
      case 'dataflow':
        return module.content.nodes.map(n => n.id);
      case 'conceptmap':
        return module.content.branches.map(b => b.id);
      case 'faulttree':
        return module.content.branches.map((_, i) => `branch-${i}`);
      default:
        return [];
    }
  };

  const requiredReveals = getRequiredReveals();
  const allRevealed = requiredReveals.every(r => revealed.includes(r));

  const handleReveal = (id) => {
    if (!revealed.includes(id)) {
      const newRevealed = [...revealed, id];
      setRevealed(newRevealed);
    }
  };

  const handleComplete = () => {
    onComplete(module.id, revealed);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
          aria-label="Back to category"
        >
          <span className="text-2xl">←</span>
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{category.icon}</span>
            <h1 className="text-2xl font-bold text-white">{module.title}</h1>
            {isComplete && (
              <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                Completed
              </span>
            )}
          </div>
        </div>
        {config.features.notes && (
          <button
            onClick={() => setShowNotes(true)}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            aria-label="Add note"
            title="Add note (N)"
          >
            <span className="text-xl">{notes.modules?.[module.id] ? '📝' : '📋'}</span>
          </button>
        )}
      </div>

      {/* Why this matters */}
      <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4">
        <h3 className="text-blue-300 font-semibold mb-2">Why This Matters</h3>
        <p className="text-slate-200">{module.why}</p>
      </div>

      {/* Pitfalls */}
      {module.pitfalls?.length > 0 && (
        <div className="bg-amber-900/30 border border-amber-700 rounded-lg p-4">
          <h3 className="text-amber-300 font-semibold mb-2">Watch Out For</h3>
          <ul className="space-y-1">
            {module.pitfalls.map((pitfall, i) => (
              <li key={i} className="text-slate-200 flex items-start gap-2">
                <span className="text-amber-400">⚠</span>
                {pitfall}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Visualization */}
      <div className="bg-slate-800 rounded-lg p-6">
        {module.type === 'dataflow' && (
          <DataFlowDiagram
            content={module.content}
            revealed={revealed}
            onReveal={handleReveal}
          />
        )}
        {module.type === 'conceptmap' && (
          <ConceptMap
            content={module.content}
            revealed={revealed}
            onReveal={handleReveal}
          />
        )}
        {module.type === 'faulttree' && (
          <FaultTree
            content={module.content}
            revealed={revealed}
            onReveal={handleReveal}
          />
        )}
      </div>

      {/* Progress / Complete button */}
      {!isComplete && (
        <div className="flex items-center justify-between bg-slate-800 rounded-lg p-4">
          <div>
            <span className="text-slate-400">Progress: </span>
            <span className="text-white font-semibold">
              {revealed.length}/{requiredReveals.length} revealed
            </span>
          </div>
          {allRevealed && (
            <button
              onClick={handleComplete}
              className="px-6 py-2 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg transition-colors"
            >
              Complete & Freeze ✓
            </button>
          )}
        </div>
      )}

      {/* Notes display */}
      {notes.modules?.[module.id] && (
        <div className="bg-slate-800 rounded-lg p-4">
          <h3 className="text-slate-300 font-semibold mb-2">📝 My Notes</h3>
          <p className="text-slate-200 whitespace-pre-wrap">{notes.modules[module.id]}</p>
        </div>
      )}

      {/* Notes modal */}
      {showNotes && (
        <NotesModal
          moduleId={module.id}
          moduleTitle={module.title}
          notes={notes}
          onSave={onSaveNote}
          onClose={() => setShowNotes(false)}
        />
      )}
    </div>
  );
};


// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

export default function App() {
  // Navigation state
  const [view, setView] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);

  // Modal state
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  const [showQuickReview, setShowQuickReview] = useState(false);
  const [showReference, setShowReference] = useState(false);

  // Progress state
  const [progress, setProgress] = useState({});
  const [notes, setNotes] = useState({ modules: {}, bookmarks: {} });

  // Load from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem(config.storageKey);
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch (e) {
        console.error('Failed to load progress:', e);
      }
    }

    const savedNotes = localStorage.getItem(`${config.storageKey}-notes`);
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error('Failed to load notes:', e);
      }
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem(config.storageKey, JSON.stringify(progress));
  }, [progress]);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem(`${config.storageKey}-notes`, JSON.stringify(notes));
  }, [notes]);

  // Handlers
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setView('category');
  };

  const handleSelectModule = (module) => {
    setSelectedModule(module);
    setView('module');
  };

  const handleBack = () => {
    if (view === 'module') {
      setView('category');
      setSelectedModule(null);
    } else if (view === 'category') {
      setView('dashboard');
      setSelectedCategory(null);
    }
  };

  const handleComplete = (moduleId, revealed) => {
    setProgress(prev => ({
      ...prev,
      [moduleId]: {
        complete: true,
        revealed,
        completedAt: new Date().toISOString(),
      }
    }));
  };

  const handleSaveNote = (moduleId, text) => {
    setNotes(prev => ({
      ...prev,
      modules: {
        ...prev.modules,
        [moduleId]: text || undefined,
      }
    }));
  };

  const handleExport = () => {
    const markdown = generateMarkdownExport(progress, notes, curriculum, config);
    const filename = `${config.title.toLowerCase().replace(/\s+/g, '-')}-export-${new Date().toISOString().split('T')[0]}.md`;
    downloadFile(markdown, filename);
  };

  const handleNavigateToModule = (module) => {
    // Find the category for this module
    const category = Object.values(curriculum).find(cat =>
      cat.modules.some(m => m.id === module.id)
    );
    if (category) {
      setSelectedCategory(category);
      setSelectedModule(module);
      setView('module');
    }
  };

  // Keyboard handlers
  const keyboardHandlers = useCallback(() => ({
    '?': () => setShowKeyboardHelp(true),
    'escape': () => {
      if (showKeyboardHelp) setShowKeyboardHelp(false);
      else if (showQuickReview) setShowQuickReview(false);
      else if (showReference) setShowReference(false);
      else handleBack();
    },
    'q': () => config.features.quickReview && setShowQuickReview(true),
    'r': () => config.features.reference && setShowReference(true),
    'ctrl+e': () => config.features.export && handleExport(),
    'ctrl+p': () => config.features.print && window.print(),
  }), [showKeyboardHelp, showQuickReview, showReference]);

  useKeyboardNav(keyboardHandlers());

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto p-6">
        
        {/* Main content */}
        {view === 'dashboard' && (
          <Dashboard
            curriculum={curriculum}
            progress={progress}
            onSelectCategory={handleSelectCategory}
          />
        )}
        {view === 'category' && selectedCategory && (
          <CategoryView
            category={selectedCategory}
            progress={progress}
            onBack={handleBack}
            onSelectModule={handleSelectModule}
          />
        )}
        {view === 'module' && selectedModule && selectedCategory && (
          <ModuleView
            module={selectedModule}
            category={selectedCategory}
            progress={progress}
            notes={notes}
            onBack={handleBack}
            onComplete={handleComplete}
            onSaveNote={handleSaveNote}
          />
        )}

        {/* Floating buttons */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-2 print:hidden">
          {config.features.quickReview && (
            <button
              onClick={() => setShowQuickReview(true)}
              className="w-12 h-12 bg-purple-600 hover:bg-purple-500 rounded-full flex items-center justify-center shadow-lg transition-colors"
              aria-label="Quick Review (Q)"
              title="Quick Review (Q)"
            >
              📋
            </button>
          )}
          {config.features.reference && (
            <button
              onClick={() => setShowReference(true)}
              className="w-12 h-12 bg-amber-600 hover:bg-amber-500 rounded-full flex items-center justify-center shadow-lg transition-colors"
              aria-label="Reference (R)"
              title="Reference (R)"
            >
              📖
            </button>
          )}
          {config.features.export && (
            <button
              onClick={handleExport}
              className="w-12 h-12 bg-green-600 hover:bg-green-500 rounded-full flex items-center justify-center shadow-lg transition-colors"
              aria-label="Export (Ctrl+E)"
              title="Export (Ctrl+E)"
            >
              💾
            </button>
          )}
          <button
            onClick={() => setShowKeyboardHelp(true)}
            className="w-12 h-12 bg-slate-600 hover:bg-slate-500 rounded-full flex items-center justify-center shadow-lg transition-colors"
            aria-label="Keyboard shortcuts (?)"
            title="Keyboard shortcuts (?)"
          >
            ⌨️
          </button>
        </div>

        {/* Modals */}
        {showKeyboardHelp && (
          <KeyboardHelpModal onClose={() => setShowKeyboardHelp(false)} />
        )}
        {showQuickReview && (
          <QuickReviewModal
            progress={progress}
            curriculum={curriculum}
            notes={notes}
            onClose={() => setShowQuickReview(false)}
            onNavigate={handleNavigateToModule}
          />
        )}
        {showReference && (
          <ReferenceModal onClose={() => setShowReference(false)} />
        )}
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          body { 
            background: white !important; 
            color: black !important; 
          }
          .print\\:hidden { 
            display: none !important; 
          }
          .bg-slate-900, .bg-slate-800, .bg-slate-700 {
            background: white !important;
          }
          .text-white, .text-slate-200, .text-slate-300, .text-slate-400 {
            color: black !important;
          }
          .border-slate-600, .border-slate-700 {
            border-color: #ccc !important;
          }
        }
      `}</style>
    </div>
  );
}
