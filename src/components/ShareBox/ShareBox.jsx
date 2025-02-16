import './ShareBox.css'

const ShareBox = ({showShareBox,setShowShareBox,link}) => {
  const copyReadOnly = () => {
    navigator.clipboard.writeText(document.getElementById('link-read-only').value)
    document.getElementById('link-read-only').select()
  }

  const copyEditMode = () => {
    navigator.clipboard.writeText(document.getElementById('link-edit-mode').value)
    document.getElementById('link-edit-mode').select()
  }

  return (
    <div style={{display: showShareBox}} id='share-box' className='share-box'>
      <button onClick={()=>{setShowShareBox('none')}} className='close-btn'>X</button>
      <h2>Copie e compartilhe</h2>
      <div className='read-only'>
        <div className='copy-box'>
          <input id='link-read-only' className='link-box' type="text" value={link} />
          <button onClick={copyReadOnly} className='copy-btn'><svg className='share-ico' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
<path d="M 23 3 A 4 4 0 0 0 19 7 A 4 4 0 0 0 19.09375 7.8359375 L 10.011719 12.376953 A 4 4 0 0 0 7 11 A 4 4 0 0 0 3 15 A 4 4 0 0 0 7 19 A 4 4 0 0 0 10.013672 17.625 L 19.089844 22.164062 A 4 4 0 0 0 19 23 A 4 4 0 0 0 23 27 A 4 4 0 0 0 27 23 A 4 4 0 0 0 23 19 A 4 4 0 0 0 19.986328 20.375 L 10.910156 15.835938 A 4 4 0 0 0 11 15 A 4 4 0 0 0 10.90625 14.166016 L 19.988281 9.625 A 4 4 0 0 0 23 11 A 4 4 0 0 0 27 7 A 4 4 0 0 0 23 3 z"></path>
</svg></button>
        </div>
        <h5>Read Only</h5>
      </div>
      <div className='edit-mode'>
        <div className='copy-box'>
          <input id='link-edit-mode' className='link-box' type="text" value={link+'&editmode=on'}/>
          <button onClick={copyEditMode} className='copy-btn'><svg className='share-ico' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
<path d="M 23 3 A 4 4 0 0 0 19 7 A 4 4 0 0 0 19.09375 7.8359375 L 10.011719 12.376953 A 4 4 0 0 0 7 11 A 4 4 0 0 0 3 15 A 4 4 0 0 0 7 19 A 4 4 0 0 0 10.013672 17.625 L 19.089844 22.164062 A 4 4 0 0 0 19 23 A 4 4 0 0 0 23 27 A 4 4 0 0 0 27 23 A 4 4 0 0 0 23 19 A 4 4 0 0 0 19.986328 20.375 L 10.910156 15.835938 A 4 4 0 0 0 11 15 A 4 4 0 0 0 10.90625 14.166016 L 19.988281 9.625 A 4 4 0 0 0 23 11 A 4 4 0 0 0 27 7 A 4 4 0 0 0 23 3 z"></path>
</svg></button>
        </div>
        <h5>Edit Mode</h5>
      </div>
    </div>
  )
}

export default ShareBox;