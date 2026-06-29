import os 
from fastapi import APIRouter , UploadFile,File,HTTPException
from services.pdf_processor import extract_text, split_into_chunks
from services.embeddings import save_chunks


router = APIRouter()

@router.post("/upload")
async def upload_pdf(file : UploadFile = File()):
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400,detail=("el archivo debe ser un pdf"))
    content = await file.read()
    texto_extraido = extract_text(content)
    texto_dividido = split_into_chunks(texto_extraido)
    texto_guardado = save_chunks(texto_dividido,file.filename)

    return {"status": "success", "filename" :file.filename , "text_lenght": len(texto_extraido), "chunks_lenght" : len(texto_dividido)}
