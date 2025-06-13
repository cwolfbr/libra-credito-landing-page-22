/**
 * Editor de texto rico usando React Quill
 * 
 * @component RichTextEditor
 * @description Editor WYSIWYG para criação de conteúdo de blog
 */

import React, { useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
  className?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Escreva o conteúdo do seu post...",
  height = "400px",
  className = ""
}: RichTextEditorProps) {
  
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'align': [] }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['clean']
      ],
    },
    clipboard: {
      matchVisual: false,
    }
  }), []);

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'script',
    'list', 'bullet', 'indent',
    'align',
    'blockquote', 'code-block',
    'link', 'image', 'video'
  ];

  return (
    <div className={`rich-text-editor ${className}`}>
      <style jsx global>{`
        .rich-text-editor .ql-container {
          height: ${height};
          font-family: inherit;
        }
        
        .rich-text-editor .ql-editor {
          line-height: 1.6;
          font-size: 16px;
        }
        
        .rich-text-editor .ql-toolbar {
          border-top: 1px solid #e2e8f0;
          border-left: 1px solid #e2e8f0;
          border-right: 1px solid #e2e8f0;
          border-bottom: none;
          background-color: #f8fafc;
        }
        
        .rich-text-editor .ql-container {
          border-bottom: 1px solid #e2e8f0;
          border-left: 1px solid #e2e8f0;
          border-right: 1px solid #e2e8f0;
          border-top: none;
        }
        
        .rich-text-editor .ql-editor.ql-blank::before {
          color: #9ca3af;
          font-style: normal;
        }
        
        /* Personalização dos botões da toolbar */
        .rich-text-editor .ql-toolbar .ql-picker-label:hover,
        .rich-text-editor .ql-toolbar .ql-picker-item:hover {
          background-color: #e2e8f0;
        }
        
        .rich-text-editor .ql-toolbar button:hover {
          background-color: #e2e8f0;
        }
        
        .rich-text-editor .ql-toolbar button.ql-active {
          background-color: #3b82f6;
          color: white;
        }
        
        /* Melhorar aparência dos links */
        .rich-text-editor .ql-editor a {
          color: #3b82f6;
          text-decoration: underline;
        }
        
        /* Estilos para listas */
        .rich-text-editor .ql-editor ul,
        .rich-text-editor .ql-editor ol {
          padding-left: 1.5em;
        }
        
        /* Estilos para blockquotes */
        .rich-text-editor .ql-editor blockquote {
          border-left: 4px solid #e2e8f0;
          margin: 16px 0;
          padding-left: 16px;
          font-style: italic;
          color: #6b7280;
        }
        
        /* Estilos para código */
        .rich-text-editor .ql-editor code {
          background-color: #f3f4f6;
          padding: 2px 4px;
          border-radius: 3px;
          font-family: 'Courier New', monospace;
        }
        
        .rich-text-editor .ql-editor pre {
          background-color: #1f2937;
          color: #f9fafb;
          padding: 16px;
          border-radius: 6px;
          overflow-x: auto;
        }
        
        /* Responsividade */
        @media (max-width: 768px) {
          .rich-text-editor .ql-toolbar {
            flex-wrap: wrap;
          }
          
          .rich-text-editor .ql-container {
            height: 300px;
          }
        }
      `}</style>
      
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{ height: 'fit-content' }}
      />
    </div>
  );
}