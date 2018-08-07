'use strict';

const botgram = require("botgram")
const bot = botgram("643000446:AAGyNyrVNHnamrJUMJK5MBguRj_JEMibu0U")
const replies = require('./replies')

bot.command("start", function (msg, reply, next) {
  console.log("Received a /start command from", msg.from.username);
});
bot.on("ready", function () {
  var reply = bot.reply(383063938);
  reply.text("Bot started ");
});


var keyboard1 = [
    [ { text: "Use my location", request: "location" }, "Specify city", "Use other hint" ],
    [ "Discard", "Main menu" ],
  ];
  
  // Display the keyboard
  reply.keyboard(keyboard1, true).text("Where is the hint placed?");
  
  // Remove keyboard
  reply.keyboard().text("Hint saved.");
  
bot.text(function (msg, reply, next) {
  console.log("Received a text message from ", msg.from.username);
  console.log("Message: ",msg.text);
});

bot.contact(function (msg, reply, next) {
  console.log("User %s sent us a contact:", msg.from.firstname);
  console.log(" * Phone: %s", msg.phone);
  console.log(" * Name: %s %s", msg.firstname, msg.lastname);
  reply.text("Ok, got that contact.");
});

bot.video(function (msg, reply, next) {
  reply.text("That's a " + msg.width + "x" + msg.height + " video.");
});

bot.location(function (msg, reply, next) {
  reply.text("You seem to be at " + msg.latitude + ", " + msg.longitude);
});
bot.command("time", function (msg, reply, next) {
  reply.text("The current time is: " + Date());
});

bot.all(function (msg, reply, next) {
  if (msg.from.id === 383063938 || msg.from.id === 9824830)
    msg.hasPrivileges = true;
  next();
});

bot.command("quit", function (msg, reply, next) {
  if (!msg.hasPrivileges) {
    reply.text("Only some users can stop the bot.");
    return;
  }
  reply.text("Shutting down the bot.");
  process.exit(0);
});

bot.command("pwd", function (msg, reply, next) {
  reply.text("Bot is running from: " + require("path").resolve(__dirname));
});

bot.command("eval", function (msg, reply, next) {
  if (!msg.hasPrivileges) {
    reply.text("This is for ADMINS only ");
    return;
  }
  var code = msg.args();
  try {
    reply.text("Result: " + eval(code).toString());
  } catch (e) {
    reply.text(e.toString());
  }
});
bot.edited.text(function (msg, reply, next) {
    console.log("''%s'' edited a message and the new text is ''%s'' ", msg.from.firstname, msg.text);
  });

function exitHandler(exitCode) {
    storage.flush();
    process.exit(exitCode);
}

process.on('SIGINT', exitHandler.bind(null, 0));
process.on('uncaughtException', exitHandler.bind(null, 1));