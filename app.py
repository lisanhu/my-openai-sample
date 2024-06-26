import os
from flask import Flask, request, jsonify, send_from_directory
from openai import OpenAI
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# Get the OpenAI API key from the environment variable
OpenAI.api_key = os.environ["OPENAI_API_KEY"]


# Serve index.html file from the root
@app.route("/")
def serve_index():
    return send_from_directory("static", "index.html")

@app.route("/get-response", methods=["POST"])
def generate_response():
    data = request.json
    system_message = data.get("systemMessage", "")
    conversation = data.get("conversation", [])

    messages = [{"role": "system", "content": system_message}] + conversation

    client = OpenAI(
        api_key=os.environ.get("OPENAI_API_KEY"),
    )
    # model="gpt-4-0314",
    response = client.chat.completions.create(
        model="gpt-4-turbo",
        messages=messages,
    )

    message = response.choices[0].message.content.strip()
    return jsonify({"botResponse": message})


if __name__ == "__main__":
    app.run(port=8080, debug=False)
