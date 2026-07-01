# AI Study Assistant

Aplicación web que permite subir un PDF y hacerle preguntas en lenguaje natural. Responde basándose únicamente en el contenido del documento usando RAG (Retrieval-Augmented Generation).

🔗 **Demo en vivo:** [ai-study-assistant-five-ochre.vercel.app](https://ai-study-assistant-five-ochre.vercel.app)

![AI Study Assistant](screenshot.png)

---

## ¿Cómo funciona?

```
Usuario sube PDF → se divide en chunks → se generan embeddings (OpenAI)
→ se guardan en ChromaDB → usuario hace una pregunta → se buscan los
chunks más relevantes por similitud semántica → GPT responde con contexto
```

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Frontend | React + Vite |
| Backend | Python + FastAPI |
| Embeddings | OpenAI `text-embedding-ada-002` |
| Generación | OpenAI `gpt-4o-mini` |
| Base de datos vectorial | ChromaDB |
| Extracción de PDF | PyMuPDF |
| Deploy backend | Render |
| Deploy frontend | Vercel |

---

## Estructura del proyecto

```
ai-study-assistant/
├── backend/
│   ├── main.py
│   ├── routes/
│   │   ├── upload.py       # POST /upload
│   │   └── chat.py         # POST /chat
│   └── services/
│       ├── pdf_processor.py    # extracción y chunking
│       ├── embeddings.py       # vectores + ChromaDB
│       └── retrieval.py        # búsqueda semántica + GPT
├── frontend-react/
│   └── src/
│       ├── App.jsx
│       └── App.css
└── README.md
```

---

## Correrlo localmente

### Requisitos
- Python 3.10+
- Node.js 18+
- API key de OpenAI

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate       # Windows
pip install -r requirements.txt
```

Crea un archivo `.env` en `backend/`:

```
OPENAI_API_KEY=sk-...
CHROMA_DB_PATH=./db
MAX_CHUNK_SIZE=500
CHUNK_OVERLAP=50
TOP_K_RESULTS=3
```

Inicia el servidor:

```bash
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend-react
npm install
```

Crea un archivo `.env.local` en `frontend-react/`:

```
VITE_API_URL=http://127.0.0.1:8000
```

Inicia el servidor:

```bash
npm run dev
```

Abre `http://localhost:5173` en el navegador.

---

## API endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/health` | Verifica que el servidor esté activo |
| POST | `/upload` | Sube y procesa un PDF |
| POST | `/chat` | Envía una pregunta y recibe respuesta |

---

## Limitaciones conocidas

- **Tiempo de respuesta inicial**: El backend en Render (tier gratuito) se duerme tras 15 minutos de inactividad. La primera request puede tardar 30-60 segundos en despertar el servidor. Las siguientes son inmediatas.
- **Velocidad de procesamiento**: Los embeddings se generan de forma secuencial — un chunk a la vez. PDFs muy largos pueden tardar varios segundos en procesarse.

## Autor

**Juan Jose Giraldo Ramos**  
[GitHub](https://github.com/GIGIPRA20022002) · [LinkedIn](https://www.linkedin.com/in/juan-jose-giraldo-a45301321)
