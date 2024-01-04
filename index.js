const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

// Assuming your GraphQL endpoint URL
const graphqlEndpoint = "http://localhost:8000/endpoint/";

const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: { headless: false },
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
});

client.on("message", async (message) => {
  if (message.body.length > 10) {
    const contact = await message.getContact();
    const chat = await message.getChat();
    //
    // Construct the mutation query with dynamic values
    const mutation = `
mutation {
  checkMessage(
    message: {author: "${message.author | ""}", fromId: "${message.from}", 
      body: ${JSON.stringify(message.body)}, deviceType: "${
        message.deviceType
      }"}
    chat: {name: "${chat.name}", isGroup: ${chat.isGroup}}
    contact: {number: "${contact.number}", pushname: "${contact.pushname}"}
  ) {
      isSpam
      messagePk
  }
}
`;
    console.log(mutation);

    // Perform the GraphQL mutation using fetch
    fetch(graphqlEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: mutation }),
    })
      .then((response) => response.json())
      .then((response) => {
        // Handle the response data
        console.log("GraphQL Mutation Response:", response);
        if (response.data?.checkMessage.isSpam) {
          // message.delete(true);
          // chat.sendMessage(
          //   `Spam message detected \`${response.data.checkMessage.messagePk}\``,
          // );
          message.reply(
            `Spam message detected \`${response.data.checkMessage.messagePk}\``,
          );
        }
      })
      .catch((error) => {
        // Handle errors
        console.error("Error making GraphQL Mutation:", error);
      });
  }
  // Read chat
  else {
    client.getChatById(message.id.remote).then(async (chat) => {
      await chat.sendSeen();
    });
  }
});

client.initialize();
