from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Enable CORS (Cross-Origin Resource Sharing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (you can specify ["http://localhost:3000"] instead)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Connect to MongoDB
client = MongoClient("mongodb://127.0.0.1:27017/")
db = client["TaskMaster"]  
User_tasks = db["Task"]  

# Define a model for the request body
class UserRequest(BaseModel):
    # email: str
    userData:object

@app.get("/")
def home():
    return {"message": "Hello, FastAPI!"}

@app.post("/users")
async def get_users_tasks(user: UserRequest):
    try:
        # Find tasks for the given user ID
        tasks = list(User_tasks.find({"userData": user.userData}))  # Exclude _id field
        print(tasks)
        if not tasks:
            return {"success": False, "message": "No tasks found for this user"}
        
        return {"success": True, "tasks": tasks}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
