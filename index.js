const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");

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

client.on("message", (message) => {
  console.log(message.body);
  if (message.body == "delete me") {
    console.log(message);
    message.getContact().then(value => console.log(value))
    message.getChat().then(value => console.log(value))
    message.delete(true);
  }
});

client.initialize();
