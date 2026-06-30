import { useState, useRef } from 'react'
import './App.css'

function App(){
    const [messages,setMessages] = useState([])
    const [question,setQuestion] = useState("")
    const fileInputRef = useRef(null);

    async function SendQuestion(){
        const response = await fetch (`${import.meta.env.VITE_API_URL}/chat`,{
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({question:question})

    })
    const data = await response.json()
    setMessages([...messages,
        {role : "user" , content : question},
        {role : "assistant", content : data.answer}
    ])
    setQuestion("")
    }

    async function uploadPDF(){
        const file = fileInputRef.current.files[0];
        const formData = new FormData();
        formData.append('file', file);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/upload`,{
                method: "POST",
                body: formData

            })
            const data = await response.json()
        setMessages([...messages,
            {role : "assistant", content : "PDF subido correctamente : " + data.filename}
        ])
    }



    return(
        <div className='app'>
        
        <div className='header'>
        {/*Seccion de upload*/}
        <input type='file'accept='application/pdf' ref = {fileInputRef}></input>
        <button onClick={uploadPDF}>Subir PDF</button>
        </div>

                <div className='messages'>
            {messages.map((msg,index) => (
                <div key={index} className={msg.role}>
                    <p>{msg.content}</p>
                </div>
            ))}
        </div>

        <div className='input-area'>
            {/*Seccion de chat*/}
            <textarea placeholder='Escribe tu pregunta'
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            ></textarea>
            <button onClick={SendQuestion}>Enviar Pregunta </button>
        </div>

    </div>
    )
}
export default App
