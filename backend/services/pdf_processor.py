import PyPDF2
import io
import fitz # PyMuPDF

def extract_text(content: bytes) -> str:
    pdf = fitz.open(stream=content, filetype="pdf")
    texto_total = ""
    for pagina in pdf:
        texto_total += pagina.get_text() + "\n"
    return texto_total

def split_into_chunks (text : str , chunk_size : int = 500 , overlap : int = 50) -> list : 
    palabras = text.split()
    chunks = []
    step = chunk_size - overlap

    for i in range(0,len(palabras),step):
        chunk = palabras[i : i + chunk_size]
        chunks.append(" ".join(chunk))
    return chunks


