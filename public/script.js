async function sendMessage() {
    const input = document.getElementById("message");
    const chat = document.getElementById("chat");

    const message = input.value.trim();

    if (!message) {
        return;
    }

    // User ka message screen par dikhana
    const userMessage = document.createElement("div");
    userMessage.className = "message user";
    userMessage.textContent = message;
    chat.appendChild(userMessage);

    input.value = "";

    // AI ke liye temporary message
    const aiMessage = document.createElement("div");
    aiMessage.className = "message ai";
    aiMessage.textContent = "Thinking...";
    chat.appendChild(aiMessage);

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: message
            })
        });

        const data = await response.json();

        if (data.reply) {
            aiMessage.textContent = data.reply;
        } else {
            aiMessage.textContent = "Kuch problem aa gayi.";
        }

    } catch (error) {
        console.error(error);
        aiMessage.textContent = "Server se connection nahi ho pa raha.";
    }

    chat.scrollTop = chat.scrollHeight;
}