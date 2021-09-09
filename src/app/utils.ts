const outputMessage = (message) => {
    const div = document.createElement("div");
    div.classList.add("message");
    div.innerHTML = ` <p class="meta">Sam <span>9:15pm</span></p>
                        <p class="text">
                        ${message}
                    </p>`;
    document.querySelector(".chat-messages").appendChild(div);
};

module.exports = {
    outputMessage
}