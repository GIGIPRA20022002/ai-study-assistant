from services.retrieval import search_chunks,generate_answer
from pydantic import BaseModel
from fastapi import APIRouter,HTTPException


class ChatRequest(BaseModel) :
    question : str 

router = APIRouter()

@router.post("/chat")
async def chatear(request : ChatRequest) :
    buscar_chunks = search_chunks(request.question)
    generar_respuesta = generate_answer(request.question,buscar_chunks)
    return {"answer":generar_respuesta,"sources" : buscar_chunks}

