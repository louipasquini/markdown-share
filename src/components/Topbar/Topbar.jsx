import "./Topbar.css"

const Topbar = ({enviarMarkdown,exportDivToPDF,exportMarkdownToHTML,exportAsMd,styles,isDark,setIsDark}) => {

  

  return (<div style={styles.topbar} className="topbar">
    <div className="topbar-left">
      <h1 onClick={()=>{window.location.href = `${window.location.origin}/?editmode=on`}}>Markdown Share</h1>
    </div>
    <div className="topbar-right">
      <div style={styles.topbar} onClick={() => setIsDark(!isDark)} className="theme-change">
        <div style={styles.footer} className="sun">
          <div style={styles.moon} className="moon">
            
          </div>
        </div>
      </div>
      <button onClick={exportAsMd} style={styles.topbar}>Exportar como MD</button>
      <button onClick={exportMarkdownToHTML} style={styles.topbar}>Exportar como HTML</button>
      <button onClick={exportDivToPDF} style={styles.topbar}>Exportar como PDF</button>
      <button onClick={enviarMarkdown} style={styles.share}>Compartilhar</button>
    </div>
    </div>
    )
}

export default Topbar;