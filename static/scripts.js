const userSubmit = document.getElementById("userSubmit");
const userInput = document.getElementById("userInput");
const systemMessage = document.getElementById("systemMessage");
const chatContainer = document.getElementById("chatContainer");

let conversation = [];

userSubmit.addEventListener("click", async () => {
    const userText = userInput.value.trim();
    if (!userText) {
        return;
    }

    appendUserMessage(userText);
    conversation.push({ role: "user", content: userText });

    userInput.value = "";
    userInput.focus();

    const response = await fetch("/get-response", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            systemMessage: systemMessage.value.trim(),
            conversation: conversation,
        }),
    });

    const responseData = await response.json();
    const botText = responseData.botResponse;

    appendBotMessage(botText);
    conversation.push({ role: "assistant", content: botText });
    console.log(conversation);
});

function appendUserMessage(text) {
    const message = document.createElement("div");
    message.classList.add("user-message");
    message.textContent = text;
    chatContainer.appendChild(message);
}

function appendBotMessage(text) {
    const message = document.createElement("div");
    message.classList.add("bot-message");
    message.textContent = text;
    chatContainer.appendChild(message);
}



// document.getElementById("submit").addEventListener("click", function () {
//     const userInput = document.getElementById("userInput");
//     const chatArea = document.getElementById("chatArea");

//     if (userInput.value.trim() !== "") {
//         const userMessage = document.createElement("div");
//         userMessage.classList.add("message", "user-message");
//         userMessage.textContent = userInput.value;
//         chatArea.appendChild(userMessage);

//         generateBotResponse(userInput.value).then((botResponse) => {
//             const botMessage = document.createElement("div");
//             botMessage.classList.add("message", "bot-message");
//             botMessage.textContent = botResponse;
//             chatArea.appendChild(botMessage);
//         });

//         userInput.value = "";
//     }
// });

// function generateBotResponse(userInput) {
//     // Replace this function with your own bot implementation
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             resolve("This is a bot response. Replace this with your backend integration.");
//         }, 1000);
//     });
// }
