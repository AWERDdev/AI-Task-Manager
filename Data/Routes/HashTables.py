from fastapi import APIRouter, HTTPException,HTTPException, Depends
from pydantic import BaseModel
from pymongo import MongoClient
import jwt

# Secret key for JWT verification (must match the frontend's secret)
JWT_SECRET = "your_secret_key"
router = APIRouter()

# Connect to MongoDB
client = MongoClient("mongodb://127.0.0.1:27017/")
db = client["TaskMaster"]
User_tasks = db["Task"]

router.get('/HashTables')
def HelloWorld():
    return{"Message":"welcome to hashTabel Router"}
