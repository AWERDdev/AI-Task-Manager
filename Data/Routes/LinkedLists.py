from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import jwt
from mongoengine import Document, StringField, IntField, connect
from pymongo import MongoClient

# Secret key for JWT verification (must match the frontend's secret)
JWT_SECRET = "your_secret_key"

router = APIRouter()

# Connect to MongoDB using mongoengine
connect('TaskMaster', host='mongodb://127.0.0.1:27017/')

# Define a MongoEngine model for the Task
class Task(Document):
    userId = StringField(required=True)
    TaskTitle = StringField()
    Task = StringField()
    importance = StringField()
    type = StringField()
    Due = StringField()
    # Add __v field to match Mongoose versioning
    __v = IntField(required=False)
    meta = {'collection': 'tasks'}

# Define a model for the request body
class TokenRequest(BaseModel):
    token: str

def verify_token(token: str):
    """Verify and decode JWT token."""
    try:
        decoded = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        print(f"Decoded token: {decoded}")
        return decoded
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

@router.post("/users")
async def get_users_tasks(user: TokenRequest):
    try:
        # Verify the token sent from the client
        decoded_client_token = verify_token(user.token)
        
        # Extract user ID safely
        userId_from_token = None
        
        # Check if decoded_client_token is a dictionary
        if isinstance(decoded_client_token, dict):
            userId_from_token = decoded_client_token.get('id') or decoded_client_token.get('_id')
        else:
            # If it's not a dictionary, it might be the ID itself or have a different structure
            print(f"Decoded token is not a dictionary: {type(decoded_client_token)}")
            userId_from_token = decoded_client_token
                
        if not userId_from_token:
            raise HTTPException(status_code=400, detail="Token does not contain user ID")
        
        print(f"Decoded userId from token: {userId_from_token}")
        
        # Use a more direct approach with PyMongo to avoid field validation issues
        from pymongo import MongoClient
        client = MongoClient('mongodb://127.0.0.1:27017/')
        db = client['TaskMaster']
        tasks_collection = db['tasks']
        
        # Query tasks directly using PyMongo
        tasks_cursor = tasks_collection.find({"userId": str(userId_from_token)})
        
        # Convert cursor to list of dictionaries
        task_list = []
        for task in tasks_cursor:
            task_dict = {
                "id": str(task.get("_id")),
                "TaskTitle": task.get("TaskTitle"),
                "Task": task.get("Task"),
                "importance": task.get("importance"),
                "type": task.get("type"),
                "Due": task.get("Due")
            }
            task_list.append(task_dict)
        
        if not task_list:
            return {"success": False, "message": "No tasks found for this user"}
        
        return {"success": True, "tasks": task_list, "message": "Tasks found successfully"}
    
    except HTTPException as he:
        # Re-raise HTTP exceptions
        raise he
    except Exception as e:
        print(f"Error in get_users_tasks: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))