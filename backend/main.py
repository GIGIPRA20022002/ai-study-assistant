from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.upload import router as upload_router
from routes.chat import router as chat_router

app = FastAPI()

app.include_router(upload_router)
app.include_router(chat_router)

origins = [
           "http://127.0.0.1:5500",
            "http://localhost:5173",
            "https://ai-study-assistant-five-ochre.vercel.app",
           ]

# Agregar el middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,        # quién puede acceder
    allow_credentials=True,       # si se permiten cookies/autenticación
    allow_methods=["*"],          # qué métodos HTTP (GET, POST, etc.)
    allow_headers=["*"],          # qué headers
)

@app.get("/health")
def health_check() : 
    return {"status" : "ok"}