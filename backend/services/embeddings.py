from dotenv import load_dotenv
from openai import OpenAI
import os
import chromadb

load_dotenv()


client_openai = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def get_or_create_collection():
    client_chroma = chromadb.PersistentClient(path=os.getenv("CHROMA_DB_PATH"))
    collection = client_chroma.get_or_create_collection(name="documents")
    return collection


def save_chunks(chunks, filename):
    collection = get_or_create_collection()
    collection.delete(where={"source": {"$ne": ""}})
    for i, chunk in enumerate(chunks):
        result = client_openai.embeddings.create(model="text-embedding-ada-002", input=chunk)
        vector = result.data[0].embedding
        try:
            collection.add(
                ids=[f"{filename}_{i}"],
                embeddings=[vector],
                metadatas=[{"source": filename}],
                documents=[chunk],
            )
        except Exception as e:
            print(f"Error guardando chunk {i}:{e}")

