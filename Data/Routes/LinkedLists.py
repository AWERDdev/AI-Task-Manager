from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from pymongo import MongoClient

router = APIRouter()

router.get('/')
def HelloWorld():
    return{"Message":"welcome to Linked lists Router"}

class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

