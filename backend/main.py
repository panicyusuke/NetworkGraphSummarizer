from fastapi import FastAPI
from pydantic import BaseModel
import requests
import json
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
import os
load_dotenv()

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CLAUDE_API_SECRET = os.getenv('CLAUDE_API_SECRET')

class SummarizeRequest(BaseModel):
    graphData: list[tuple[str, str, int]]

@app.post("/api/summarize")
async def summarize(request: SummarizeRequest):
    graph_data = request.graphData
    prompt = """
        次のNeo4jデータを説明してください。鋭い洞察や示唆を得ることを期待しています。
        ネットワークグラフの概要は以下です。
        1. 本グラフは、Authorノード とPaperノードからなる巨大なネットワークから、任意の著者A, Bの間の累積引用回数を抽出したものです。
        2. 執筆者間の（論文を通した）引用回数の合計が各配列の第三要素に配置されています。
        3. このグラフから、ハブとなる著者や、著者間の関係性を読み取ることができ、誰がこの界隈において重要なのかを知ることができます。また、あるトピックにおける協力関係なども説明できるはずです。
        4. これらの情報から、著者が存在するネットワークを解析し、新規研究を画策する研究者をサポートしてあげてください。
        ```

        ■ データ:

        from_author_id（著者A）, from_author_name（著者A）, weight（著者A-著者Bの引用回数合計）


        """
    for row in graph_data:
        prompt += f"{row[0]}, {row[1]}, {row[2]}\n"

    prompt = "Hi How are you?"

    response = requests.post(
        "https://api.anthropic.com/v1/messages",
        headers={
            "anthropic-version": "2023-06-01",
            "Content-Type": "application/json",
            "x-api-key": CLAUDE_API_SECRET,
        },
        json={
            "model": "claude-3-opus-20240229",
            "max_tokens": 1024,
            "messages": [{"role": "user", "content": prompt}],
            "stream": True,
        },
        stream=True,
    )

    async def generate():
        summary = ""
        for line in response.iter_lines():
            if line:
                decoded_line = line.decode("utf-8")
                if decoded_line.startswith("data:"):
                    _, data = decoded_line.split(":", 1)
                    data = data.strip()
                    if data != "[DONE]" and data:
                        try:
                            message = json.loads(data)
                            if message["type"] == "content_block_delta":
                                summary += message["delta"]["text"]
                                yield f"data: {json.dumps({'summary': summary}, ensure_ascii=False)}\n\n"
                        except json.JSONDecodeError as e:
                            print(f"Error decoding JSON: {e}")
                            print(f"Decoded line: {decoded_line}")
        yield f"data: [DONE]\n\n"

    return StreamingResponse(generate(), media_type="text/event-stream")
