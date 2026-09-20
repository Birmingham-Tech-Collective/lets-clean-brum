from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import boto3
import uuid
from datetime import datetime, timezone


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

dynamodb = boto3.resource(
    "dynamodb",
    endpoint_url="http://localhost:8001",
    region_name="eu-west-2",
    aws_access_key_id="dummy",
    aws_secret_access_key="dummy"
)

table = dynamodb.Table("Events")


class EventCreate(BaseModel):
    title: str
    description: str
    location: str
    date_time: str


@app.get("/")
def read_root():
    return {"message": "Let's Clean Brum API is running"}


@app.post("/events")
def create_event(event: EventCreate):
    event_id = str(uuid.uuid4())
    created_at = datetime.now(timezone.utc).isoformat()

    item = {
        "event_id": event_id,
        "title": event.title,
        "description": event.description,
        "location": event.location,
        "date_time": event.date_time,
        "status": "upcoming",
        "created_at": created_at
    }

    table.put_item(Item=item)

    return item

@app.get("/events")
def get_events():
    response = table.scan()
    return response.get("Items", [])