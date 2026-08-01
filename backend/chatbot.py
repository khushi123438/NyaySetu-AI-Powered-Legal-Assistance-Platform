from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

SYSTEM_PROMPT = """
You are NyaySetu Legal Assistant.

Rules:
- Explain legal procedures in simple language.
- Tell required documents.
- Handle Divorce, Property, Criminal, Civil, Family and Business cases.
- Never claim to be a lawyer.
- Suggest consulting a qualified advocate.
"""

@app.route("/api/chatbot/chat", methods=["POST"])
def chat():

    data = request.get_json()
    user_message = data.get("message", "")

    prompt = f"""
{SYSTEM_PROMPT}

User: {user_message}

Assistant:
"""

    response = requests.post(
        "http://localhost:11434/api/generate",
        json={
            "model": "phi3:mini",
            "prompt": prompt,
            "stream": False
        }
    )

    result = response.json()

    return jsonify({
        "reply": result["response"]
    })

if __name__ == "__main__":
    app.run(port=5000, debug=True)