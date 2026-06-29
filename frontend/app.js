async function checkBackend() {
const response = await fetch("http://127.0.0.1:8000/health");
const data = await response.json()
document.getElementById("answer").innerHTML = data.status
    
}
checkBackend()

//Funcion para cargar el archivo y mostrar su nombre 
async function uploadPDF(){
    const file = document.getElementById("pdf-input").files[0]

    if(!file){
        document.getElementById("answer").innerHTML = "No seleccionaste ningun pdf , selecciona uno"
        return
    }
    const formData = new FormData()
    formData.append("file",file)
    const response = await fetch ("http://127.0.0.1:8000/upload",{
        method : "POST",
        body : formData
    })
    const data = await response.json()
    document.getElementById("answer").innerHTML = data.status
    
    }
    document.getElementById("upload-button").addEventListener("click",uploadPDF)

// Función para enviar la pregunta y devolver la respuesta
async function sendQuestion() {
    const question = document.getElementById("text-area").value;
    const response = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: question })
    });
    const data = await response.json();
    document.getElementById("answer").innerHTML = data.answer;
}

    document.getElementById("send-button").addEventListener("click",sendQuestion);

    

