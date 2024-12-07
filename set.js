const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMERRRGxZQVVCSFpobitFV2V5Rkpob1dhcjVjZlhWR2NWSlRsSzM2dkZtST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMWtJZE4ydWFIYjd6MlRVSnMyQjNOZzhyL0VueUtOY0NWYXNVY2RDRTd3QT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2R3BZbm9aU3o2S1dVOGZZTUczSnlUU25uRWRaMmprQjNCb3NQS2VaeUdnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4dkk2QlBYMWNmQjFRMXEwTU5RNjJ5RFd6MUpXR1MxVnZ2SkZZTTNBQ1RvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlMOWNueEgrdGNQbCtDbFlvR3o3N041ZFJRdzV2VTBBUHJtSzJWSXBMbVk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlIrcmZqY25sa3d1cXVQMXNGQjZvUXZQYlhSZXdySFdkaEtwT2hycll0aDg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUpOTlZaK0ZuUTMvTVJLR3Vvd0JhRTdNaGtJL0tzRSszVnJzUGEvbUZXQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYU93UFI4Qnc1UnFLdWtWNmVONm9ENm9RUnVTWWx6M05aWVhsK0ZqSElXWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZoYXhBYTlRT21PaC9NelFsM0h5QVZvYW42eXV5ZS9VU0Z0ekJZeko4d3Zta0NGemhzaGtpVjVueUpYd2I4MTJXQ3oybm9USHhXZmRscnM1bnRLK0FRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQwLCJhZHZTZWNyZXRLZXkiOiI4Qi8yZk8yRDgvQ2hTYVVEaS95bjl3L1UvMXg5OFNpR0FRL0pJWlBJeHkwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJyZVN3U2tDZ1F3dVI5WHJBMFRYODBBIiwicGhvbmVJZCI6IjIxYzBjY2NkLTIyYzctNDg5Zi05NTE2LWU5ZTg5ZjJjZThkYSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJOMktMaWZ1azZRSUJrV3dzaUhSeWl4ZWFxbzQ9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieHlUL1ZiNXVXV0Z3UVd6MjJ1bUpPY1ViT2prPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjFRS1FGV0c1IiwibWUiOnsiaWQiOiIyNjM3MTgwMzYxMDg6MTlAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BLWS81VURFS0wrejdvR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjFEWmlnQkpQRG10d3ZKTjh6OHZJOGlqMlFFODF5K0ZtWVdSQW9nMk9KQWs9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkdmYXExeDNMWXU3TU12ZVF0SjMwYW5hekRuWEh4YlgzckpSZVU5Y2RVZXVJcXpXTmJnTjJjTHBEc3p0NFhLUXpGdFN3SUxTM3RkWXZkc0w5TitzTEN3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJVNFU1dW00a2x5OHdhYWJwSWdYUmNVYnVzNFNUMTRnMHlrWHltVUVERFZEWURhN2dMbHZMZVBpSUNvd3kvekxkUWZlY2JsMW1TZHVGQTFXcTNyVHNDdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MzcxODAzNjEwODoxOUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJkUTJZb0FTVHc1cmNMeVRmTS9MeVBJbzlrQlBOY3ZoWm1Ga1FLSU5qaVFKIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMzNTU4MDY1LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUtjLyJ9',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/Keithkeizzah/ALPHA-MD1',
    OWNER_NAME : process.env.OWNER_NAME || "Keith",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "263718036108",  
    ANTILINK : process.env.ANTILINK || "yes",
    ANTI_VV : process.env.ANTI_VV || "yes",               
    AUTO_REPLY : process.env.AUTO_REPLY || "yes",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT: process.env.AUTO_REACTION || "non",  
    AUTO_LIKE_STATUS: process.env.AUTO_LIKE_STATUS || 'non',              
    CHATBOT: process.env.CHAT_BOT || "off",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "yes",
    AUTO_BLOCK: process.env.BLOCK_ALL || 'yes',              
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029Vaan9TF9Bb62l8wpoD47",
    CAPTION : process.env.CAPTION || "ALPHA-MD",
    BOT : process.env.BOT_NAME || 'ALPHA_MD',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    GEMINI_API_KEY : process.env.GEMINI_API_KEY || 'AIzaSyCcZqDMBa8FcAdBxqE1o6YYvzlygmpBx14',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL: process.env.ANTICALL || 'yes',              
    CHAT_BOT : process.env.CHAT_BOT || 'no',  
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
