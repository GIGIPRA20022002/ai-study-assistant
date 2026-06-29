from openai import OpenAI
import os
from dotenv import load_dotenv
from services.embeddings import get_or_create_collection


load_dotenv()

client_openai = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def search_chunks(question : str   ) -> list :
    result = client_openai.embeddings.create(model="text-embedding-ada-002",input=question)
    vector = result.data[0].embedding
    collection = get_or_create_collection()
    results = collection.query(
        query_embeddings=[vector],
        n_results=3
    )
    return results["documents"][0]


#LLAMANDO A GPT CON OPENAI
def generate_answer(question: str, chunks: list[str]) -> str:
    context = "\n\n".join(chunks)
    response = client_openai.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", 
             "content": "Eres un asistente que responde preguntas basándose únicamente en el contexto proporcionado. Si la respuesta no está en el contexto, dilo."},
            {"role": "user", 
             "content": f"Question: {question}\nContext: {context}"},
        ]
    )
    return response.choices[0].message.content


