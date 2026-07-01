import { useState, useRef } from 'react'
import './App.css'

function App(){
    const [messages, setMessages] = useState([])
    const [question, setQuestion] = useState("")
    const [fileName, setFileName] = useState("")
    const fileInputRef = useRef(null);
    const [pdfloaded, setPdfLoaded] = useState(false)


    async function SendQuestion(){
        const response = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({question: question})
        })
        const data = await response.json()
        setMessages([...messages,
            {role: "user", content: question},
            {role: "assistant", content: data.answer}
        ])
        setQuestion("")
    }

    async function uploadPDF(){
        const file = fileInputRef.current.files[0];
        if (!file) return;
        setFileName(file.name)
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
            method: "POST",
            body: formData
        })
        setPdfLoaded(true)
        const data = await response.json()
        setMessages([...messages,
            {role: "assistant", content: "✅ PDF cargado: " + data.filename}
        ])
    }

    return(
        <div className='app'>

        <div className='header'>
            <span className='header-title'>📚 AI Study Assistant</span>
            <div className='header-upload'>
                <input 
                    type='file' 
                    accept='application/pdf' 
                    ref={fileInputRef}
                    onChange={uploadPDF}
                    style={{display: 'none'}}
                />
                <button className="select-btn" onClick={() => fileInputRef.current.click()}>
                    📄 {fileName ? fileName : "Seleccionar PDF"}
                </button>
                {pdfloaded && (
                    <button className="change-btn" onClick={() => fileInputRef.current.click()}>
                        🔄 Cambiar PDF
                    </button>
                )}
            </div>
        </div>

        <div className='messages'>
            {messages.map((msg, index) => (
                <div key={index} className={msg.role}>
                    <p>{msg.content}</p>
                </div>
            ))}
        </div>

        <div className='input-area'>
            <textarea 
                placeholder='Escribe tu pregunta sobre el documento...'
                value={question}

                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        SendQuestion()
                    }
                }}
            ></textarea>
            <button onClick={SendQuestion} disabled={!pdfloaded}>➤</button>
        </div>

    </div>
    )
}
export default App