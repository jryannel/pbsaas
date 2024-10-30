from typing import Union

from fastapi import FastAPI
from anthropic import Anthropic
from anthropic.types import Message
import os

app = FastAPI()


claude = Anthropic(
    api_key=os.environ.get("ANTHROPIC_API_KEY"),
)

def claude_msg(content: str) -> Message:
    msg = claude.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=1024,
        messages=[
            {"role": "user", "content": content},
        ],
    )
    return msg

@app.post("/claude/chat")
def claude_chat(content: str) -> Message:
    return claude_msg(content)


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}