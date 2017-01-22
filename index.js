console.log("hello world");
const Discord = require("discord.js"); //import the discord.js module
const client = new Discord.Client(); //create an instance of a Discord Client, and call it client
const keysJson = require("./keys.json")
const token = keysJson.discordtoken;

/********** Imports *********/
//cleverbot API
var cleverbot = require("cleverbot"),
bot = new cleverbot(keysJson.cleverbotname, keysJson.cleverbotpassword);
//REST API
var https = require("https");
var http = require("http");
//League of Legends items json
var iJson = require("./leagueitem.json");
//ytdl API
const yt = require('ytdl-core');

//the ready event is vital, it means that your bot will only start reacting to information from Discord _after_ ready is emitted
client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
  client.user.setGame('_help for commands').then(user => console.log('help status set')).catch(console.error);
});

/********** functions **********/
//number generator
function randomIntInc (low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
}
//split and concant sentence function for announcement and cleverbot
function takeFstElem(str) {
  var arr = str.split(" ");
  var newArr = '';
  for (i = 1; i < arr.length; i++) {
    newArr = newArr.concat(arr[i] + ' ');
  }
  return newArr.trim();
}
//split and concant sentence function for giphy
function giphySearchKey(str) {
  var arr = str.split(" ");
  var newArr = '';
  for (i = 1; i < arr.length; i++) {
    newArr = newArr.concat(arr[i] + '+');
  }
  return newArr;
}
//split and concant sentence function for url
function urlSearch(str) {
  var arr = str.split(" ");
  var newArr = '';
  for (i = 1; i < arr.length; i++) {
    newArr = newArr.concat(arr[i] + '%20');
  }
  return newArr.trim();
}

/********** local things **********/
var replyArr = [];
replyArr[0] = 'I\'m giving up on you...\n' + 'Just kidding\n';
replyArr[1] = 'What do you want me to say?';
replyArr[2] = 'I am saying something.';
replyArr[3] = 'THIS. IS. TOBIAS!';
replyArr[4] = 'Potatoes have skins. I have skin. Therefore, I am a potato.';
replyArr[5] = 'One time I died, but I got better.';
replyArr[6] = 'I eat babies.';
replyArr[7] = 'Aloha snackbar!';
replyArr[8] = 'I like farting.';
replyArr[9] = 'A balloon just flew out of my ass.';

/* help list:
=> will improve/update when more stuff is on */
client.on('message', msg => {
  if (msg.content === '_help') {
    msg.reply('What I have so far:');
    msg.channel.sendCode('Markdown',
                         '// useful discord related commands\n' +
                         '_announce [your message]:\n' + '#I will make an announcement for you\n' +
                         '_invite:\n' + '#I will print out the invite URL of the channel you\'re in\n' +
                         '_join:\n' + '#I will join the voice channel that you\'re in\n' +
                         '_leave:\n' + '#I will leave the channel that you\'re in\n');
    msg.channel.sendCode('Markdown',
                          '//League of Legends builds\n' +
                          '_items [champion name]:\n' + '#I will print out the most popluar items used on a champion\n');
    msg.channel.sendCode('Markdown',
                         '// fun commands\n' +
                         '_annoy everyone:\n' + '#HA HA HA okay\n' +
                         '_gif [tag or keywords]:\n' + '#I will send a gif from giphy\n' +
                         '_hImage [tag or keywords]:\n' + '#I will send a hentai image\n' +
                         '_my avatar:\n' + '#I will show your avatar\n' +
                         '_ping:\n' + '#I will let you know how laggy I am\n' +
                         '_say something:\n' + '#I will say something random\n' +
                         'Tobias, [your message]:\n' + '#I reply you better(maybe)\n' +
                         '_wai or _why:\n' + '#I will reply with love <3\n');
    msg.channel.sendCode('Markdown',
                         '// music\n' +
                         '_play [youtube url]:\n' + '#I will play a YouTube link\n' +
                         '_pause:\n' + '#I will pause the music\n' +
                         '_resume:\n' + '#I will resume the music\n' +
                         '_stop:\n' + '#I will stop the music and leave\n');
  }
});

/********** simple replies; for fun **********/
client.on('message', msg => {
  if (msg.content === '_wai' || msg.content === '_why') {
    msg.reply('because fuck you! <3');
  }
});

/********** simple methods **********/
client.on('message', msg => {
  //show bot's ping
  if (msg.content === '_ping') {
    msg.reply('this is my ping; not yours:  ' + client.ping);
  }
  if (msg.content === '_annoy everyone') {
    msg.channel.sendMessage('ด้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็็\nด้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็็\nด้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็็\nด้้้้้็็็็็้้้้้็\nด้้้้้็็็็็้้้้้็\nด้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็็\nด้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็็\nด้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็็้้้้้้้้็็็็็้้้้้็็็็็\n');
  }
  //random replies using local array
  if (msg.content === '_say something') {
    msg.reply(replyArr[randomIntInc(0,9)]);
  }
  //show the user's avatar
  if (msg.content === '_my avatar') {
    msg.reply('your avatar is shit\n'+ msg.author.avatarURL);
  }
  //bot tts user's message
  if (msg.content.startsWith('_announce')) {
    msg.channel.sendMessage(takeFstElem(msg.content),{tts:true});
  }
  //bot joins voice channel
  /* sudo apt-get install python
  / sudo apt-get install ffmpeg // add --no-bin-links if not working (for windows)
  / npm install node-opus  --save --> for audio
  / npm install discord.js node-opus --save --> for audio */
  if (msg.content === '_join') {
    return new Promise((resolve, reject) => {
      const voiceChannel = msg.member.voiceChannel;
      if (!voiceChannel || voiceChannel.type !== 'voice') {
        return msg.reply('I couldn\'t connect to your voice channel...');
      }
      voiceChannel.join();//.then(connection => resolve(connection)).catch(err => reject(err));
    });
  }
  /* //this works too lol
  if(msg.content === 'join') {
    msg.member.voiceChannel.join();
  } */
  //bot leaves a voice channel
  if(msg.content === '_leave') {
    msg.member.voiceChannel.leave();
  }
  //generate invite url of a voice channel
  if (msg.content.startsWith('_invite')) {
    var invite = msg.member.voiceChannel;
    if (!invite || invite.type !== 'voice') {
      return msg.reply('I can\'t invite someone to a channel you\'re not in.');
    }
    invite.createInvite().then((invite) => {
      msg.reply(invite.url);
    });
  }
  //play youtube links
  //npm install ytdl-core
  if (msg.content.startsWith('_play')) {
    const voiceChannel = msg.member.voiceChannel;
    song = takeFstElem(msg.content);
    if (!voiceChannel) {
      return msg.reply(`Please be in a voice channel first!`);
    }
    voiceChannel.join().then(connnection => {
      let stream = yt(song, {audioonly: true});
      const dispatcher = connnection.playStream(stream);
      let collector = msg.channel.createCollector(msg => msg);
      collector.on('message', msg => {
        if (msg.content === '_pause') {
          msg.channel.sendMessage('paused').then(() => {dispatcher.pause();});
        }
        if (msg.content === '_resume') {
          msg.channel.sendMessage('resumed').then(() => {dispatcher.resume();});
        }
        if (msg.content === '_stop') {
          msg.channel.sendMessage('stopped').then(() => {dispatcher.end();});
        }
      });
      dispatcher.on('end', () => {
        voiceChannel.leave();
      });
    });
  }
});

/********** cool stuff involving other APIs **********/
/***** cleverbot *****/
//npm install cleverbot --save
client.on('message', msg => {
  bot.setNick(msg.author); //--> only if you want the bot to keep on topic
  //function
  bot.create(function (err, session) {
    //user type in questions
    if (msg.content.startsWith('Tobias,')) {
      bot.ask(takeFstElem(msg.content), function (err, response) {
        if(response === 'Error, the reference "" does not exist'){
          response = takeFstElem(msg.content);
        }
        msg.reply(response);
      });
    }
  });
});
/***** giphy *****/
//npm install giphy --save
client.on('message', msg => {
  if (msg.content.startsWith('_gif')) {
    var options = {
      "method": "GET",
      "hostname": "api.giphy.com",
      "port": null,
      "path": "/v1/gifs/search?api_key=" + keysJson.giphytoken + "&q="+ giphySearchKey(msg.content) +"&limit=10",
      "headers": {
        "cache-control": "no-cache",
        "postman-token": "e1942328-ed70-a70d-ad71-42f57400aab4"
      }
    };
    var req = https.request(options, function (res) {
      var chunks = [];
      var json;
      res.on("data", function (chunk) {
        chunks += chunk.toString();
      });
      res.on("end", function () {
        json = JSON.parse(chunks);
        msg.reply(json.data[randomIntInc(0,9)].url);
      });
    });
    req.end();
  }
});
/***** ibsearch.xxx *****/ //for ecchi images
client.on('message', msg => {
  if (msg.content.startsWith('_hImage')) {
    var query = urlSearch(msg.content);
    var options = {
      "method": "GET",
      "hostname": "ibsearch.xxx",
      "port": null,
      "path": "/api/v1/images.json?q=" + query + "&key=" + keysJson.ibsearchtoken + "&limit=10",
      "headers": {
        "cache-control": "no-cache",
        "postman-token": "02eb707c-64e8-e982-b5d5-06c2c5f5f84e"
      }
    };
    var req = https.request(options, function (res) {
      var chunks = [];
      var json;
      res.on("data", function (chunk) {
          chunks += chunk.toString();
      });
      res.on("end", function () {
        var json = JSON.parse(chunks);
        if (json.length == 0) {
          msg.reply("No picture found");
        }
        else {
          msg.reply("https://ibsearch.xxx/images/" + json[randomIntInc(0,json.length)].id.toString());
        }
      });
    });
    req.end();
  }
});
/***** League of legends champion build guides *****/
client.on('message', msg => {
  if (msg.content.startsWith('_items')) {
    var champName = giphySearchKey(msg.content);
    var options1 = {
      "method": "GET",
      "hostname": "api.champion.gg",
      "port": null,
      "path": "/champion/" + champName + "/items/finished/mostPopular?api_key=" + keysJson.leaguetoken,
      "headers": {
        "cache-control": "no-cache",
        "postman-token": "2e63c247-469b-78d3-1f69-1b8c0f9de995"
      }
    };
    var options2 = {
      "method": "GET",
      "hostname": "api.champion.gg",
      "port": null,
      "path": "/champion/" + champName + "/items/finished/mostWins?api_key=" + keysJson.leaguetoken,
      "headers": {
        "cache-control": "no-cache",
        "postman-token": "2e63c247-469b-78d3-1f69-1b8c0f9de995"
      }
    };
    var req = http.request(options1, function (res) {
      var chunks = [];
      var json;
      res.on("data", function (chunk) {
        chunks += chunk.toString();
      });
      res.on("end", function () {
        var json = JSON.parse(chunks);
        var item = json[0].items;
        var iName = '';
        for (i = 0; i < item.length; i++) {
          iName += iJson.data[item[i]].name + '\n';
        }
        msg.channel.sendMessage('Most popular build:\n');
        msg.channel.sendCode('Markdown', iName);
      });
    });
    req.end();
    var req = http.request(options2, function (res) {
      var chunks = [];
      var json;
      res.on("data", function (chunk) {
        chunks += chunk.toString();
      });
      res.on("end", function () {
        var json = JSON.parse(chunks);
        var item = json[0].items;
        var iName = '';
        for (i = 0; i < item.length; i++) {
          iName += iJson.data[item[i]].name + '\n';
        }
        msg.channel.sendMessage('Highest winning build:\n');
        msg.channel.sendCode('Markdown', iName);
      });
    });
    req.end();
  }
});
client.login(token);