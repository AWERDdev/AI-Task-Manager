from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()
# Define a model for the request body
class message(BaseModel):
    message: str

@app.get("/")
def home():
    return {"message": "Hello, FastAPI!"}


@app.post("/message")
async def home(data:message):
    print(message)
    return {"Message":"hello node JS API Iam PY API","response": f"Received: {data.message}"}

# Run with: uvicorn index:app --reload
