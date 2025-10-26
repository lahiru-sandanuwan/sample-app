from fastapi import FastAPI, WebSocket, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import asyncio
import json

app = FastAPI()

# Allow your Angular app (localhost:4200) to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:4200"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage
latest_data = {}
connected_clients = set()

class GameData(BaseModel):
    health: int
    weapon: str
    kda: dict


@app.post("/update")
async def update(request: Request):
    body = await request.json()
    # data = body["string"]
    data = """
    {"info":{"game_info":{"scene":"CharacterSelectPersistentLevel"}},"feature":"game_info"}
    """
    data = data.replace('\\"', '"')
    data = data.replace('\"[', '[')
    data = data.replace(']\"', ']')

    try:
        data = json.loads(data)
        info = data["info"]
        print(info)
    except Exception as e:
        print("Error parsing all_players:", e)
        info = []

    print("Players count:", len(info))
    return {"status": "ok"}

@app.get("/latest")
def get_latest_data():
    """Fallback endpoint to fetch current state"""
    return latest_data

@app.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
    await ws.accept()
    connected_clients.add(ws)
    try:
        while True:
            await asyncio.sleep(1)
            if latest_data:
                await ws.send_json(latest_data)
    except Exception:
        connected_clients.remove(ws)
