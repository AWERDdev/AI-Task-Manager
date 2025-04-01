from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from mongoengine import connect
from Routes.LinkedLists import router as linked_lists_router
from mongoengine import Document, StringField

# Connect to MongoDB using mongoengine
connect('TaskMaster', host='mongodb://127.0.0.1:27017/')

# Define a MongoEngine model for the Task (ensure consistency with your schema)
class Task(Document):
    userId = StringField(required=True)  # userId field (make sure it's the same in MongoDB)
    taskName = StringField()
    description = StringField()
    meta = {'collection': 'tasks'}  # Ensure it uses the 'tasks' collection

# Initialize FastAPI app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers correctly
app.include_router(linked_lists_router, prefix="/api")

@app.get("/")
def home():
    return {"message": "Hello, FastAPI!"}
