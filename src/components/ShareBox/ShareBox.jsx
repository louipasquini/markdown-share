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
          <button onClick={copyReadOnly} className='copy-btn'></button>
        </div>
        <h5>Read Only</h5>
      </div>
      <div className='edit-mode'>
        <div className='copy-box'>
          <input id='link-edit-mode' className='link-box' type="text" value={link+'&editmode=on'}/>
          <button onClick={copyEditMode} className='copy-btn'></button>
        </div>
        <h5>Edit Mode</h5>
      </div>
    </div>
  )
}

export default ShareBox;