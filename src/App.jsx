import { useState } from 'react'
import Topbar from './components/Topbar/Topbar.jsx'
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "github-markdown-css/github-markdown.css"; 
import "highlight.js/styles/github.css";
import "github-markdown-css/github-markdown-light.css"
import './App.css'

function App() {
  const [textoFormatado, setTextoFormatado] = useState('')
  const [isDark, setIsDark] = useState(false);

  const styles = {
    app: {
      backgroundColor: isDark ? '#1e1e1e' : '#f8f8f8',
    },
    editor: {
      backgroundColor: isDark ? '#1e1e1e' : '#f8f8f8',
      color: isDark ? '#f8f8f8' : '#1e1e1e',
      outlineColor: isDark ? '#f8f8f8' : '#1e1e1e',
    },
    preview: {
      backgroundColor: isDark ? '#1e1e1e' : '#f8f8f8',
      color: isDark ? '#f8f8f8' : '#1e1e1e',
      outlineColor: isDark ? '#f8f8f8' : '#1e1e1e',
      borderColor: isDark ? '#f8f8f8' : '#1e1e1e',
      headerBg: isDark ? '#f8f8f8' : '#1e1e1e',
      rowBg: isDark ? '#f8f8f8' : '#1e1e1e',
    },
    topbar: {
      backgroundColor: isDark ? '#1e1e1e' : '#f8f8f8',
      color: isDark ? '#f8f8f8' : '#1e1e1e',
      outlineColor: isDark ? '#f8f8f8' : '#1e1e1e',
    },
    share: {
      backgroundColor: isDark ? '#f8f8f8' : '#1e1e1e',
      color: isDark ? '#1e1e1e' : '#f8f8f8',
      outlineColor: isDark ? '#f8f8f8' : '#1e1e1e',
    },
    moon: {
      backgroundColor: isDark ? "#1e1e1e" : "transparent",
    },
    textarea: {
      color: isDark ? '#f8f8f8' : '#1e1e1e',
    },
    footer: {
      backgroundColor: isDark ? '#f8f8f8' : '#1e1e1e',
      color: isDark ? '#1e1e1e' : '#f8f8f8',
    }
  };

  const convertToHtml = () => {
    const rawHtml = marked.parse(textoFormatado, {
      breaks: true, 
      gfm: true,    
    });
    return DOMPurify.sanitize(rawHtml); 
  };

  const globalStyles = `
    body {
      background-color: ${isDark ? '#1e1e1e' : '#f8f8f8'} !important;
    }

    .markdown-body {
      border: ${isDark ? '#1e1e1e' : '#f8f8f8'} !important;
    }
    
    .markdown-body th {
      background-color: ${isDark ? '#1e1e1e' : '#f8f8f8'} !important;
      border: none;
    }
    
    .markdown-body td {
      background-color: ${isDark ? '#1e1e1e' : '#f8f8f8'} !important;
      border: none;
    }
  `;

  function getFirstSentence(markdown) {
    let firstLine = markdown.split(/\r?\n/)[0];
    firstLine = firstLine.replace(/[*_`#>\-!\[\]\(\)~]/g, ' ');
    firstLine = firstLine.replace(/[^a-zA-ZÀ-ÿ0-9\s]/g, '').trim();
    return firstLine;
  }

  function exportDivToPDF(filename = "export.pdf", margin = 20) {
    const div = document.getElementById("texto-completo");
    if (!div) {
      alert("Div não encontrada!");
      return;
    }
  
    const divWidth = div.offsetWidth;
    const divHeight = div.offsetHeight;
  
    html2canvas(div, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
  
      const pdf = new jsPDF({
        unit: "mm", 
        format: [divWidth + 2 * margin, divHeight + 2 * margin], 
      });
  
      pdf.addImage(imgData, "PNG", margin, margin, divWidth, divHeight);
  
      let filename = getFirstSentence(textoFormatado)
      pdf.save(filename);
    });
  }

  function exportMarkdownToHTML() {
    const div = document.getElementById("texto-completo");
    if (!div) {
      alert("Texto não encontrado!");
      return;
    }
  
    const divContent = div.innerHTML;
  
    function getCSSStyles(element) {
      let cssText = "";
      const computedStyles = window.getComputedStyle(element);
      for (let prop of computedStyles) {
        cssText += `${prop}: ${computedStyles.getPropertyValue(prop)}; `;
      }
      return cssText;
    }
  
    function applyInlineStyles(element) {
      element.setAttribute("style", getCSSStyles(element));
      for (let child of element.children) {
        applyInlineStyles(child);
      }
    }
  
    const clonedDiv = div.cloneNode(true);
    applyInlineStyles(clonedDiv);
  
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Exported Content</title>
        <style>
          body {
            font-family: Outfit;
            background: #f4f4f4;
            padding: 20px;
            padding-left: 500px;
            padding-right: 500px;
            display: flex;
            justify-content: center;
          }
          tr {
          outline: solid 1px #1e1e1e;
          border: none;
          }
          td {
          outline: solid 1px #1e1e1e;
          border: none;
          }
          th {
          outline: solid 1px #1e1e1e;
          border: none;
          }
        </style>
      </head>
      <body>
        <div>${clonedDiv.outerHTML}</div>
      </body>
      </html>
    `;
  
    const blob = new Blob([fullHtml], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    let filename = getFirstSentence(textoFormatado)
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  

  const exportAsMd = () => {
    let nomeArquivo = getFirstSentence(textoFormatado)
    const blob = new Blob([textoFormatado], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${nomeArquivo}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  window.addEventListener("resize", () => {
    const app = document.querySelector(".app");
    app.style.height = window.innerHeight + "px";
  });
  
  document.addEventListener("click", (e) => {
    if (!e.target.closest("textarea")) {
      window.dispatchEvent(new Event("resize"));
    }
  });

  return (
    <div style={styles.app} className='app'>
      <style>{globalStyles}</style>
      <Topbar exportDivToPDF={exportDivToPDF} exportMarkdownToHTML={exportMarkdownToHTML} exportAsMd={exportAsMd} styles={styles} isDark={isDark} setIsDark={setIsDark}/>
      <div className='container'>
        <div style={styles.editor} className='editor'>
          <textarea style={styles.textarea} value={textoFormatado} onChange={(e) => setTextoFormatado(e.target.value)}></textarea>
        </div>
         <div style={styles.preview} className='text'>
          <div id="texto-completo" style={styles.preview} className='markdown-body' dangerouslySetInnerHTML={{ __html: convertToHtml() }}></div>
         </div>
      </div>
      <div style={styles.footer} className='footer'>
        <span>DESENVOLVIDO POR @347LOUI</span>
      </div>
    </div>
  )
}

export default App
