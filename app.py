import os

import openai
from flask import Flask, redirect, render_template, request, url_for

app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")


@app.route("/", methods=("GET", "POST"))
def index():
    result = request.args.get("result")
    return render_template("index.html", result=result)


@app.route("/qa", methods=(["POST"]))
def qa():
    if request.method == "POST":
        question = request.form["question"]
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "Answer the Question respectfully. Reply unknown if you don't know."},
                {"role": "user", "content": question},
            ],
            temperature=0.6,
        )
        return redirect(url_for("index", result=response.choices[0].message.content))

    result = request.args.get("result")
    return render_template("index.html", result=result)


# def generate_prompt(question):
#     return """Answer the Question respectfully. Reply unknown if you don't know.

# Question: {},
# Answer:""".format(
#         question
#     )
