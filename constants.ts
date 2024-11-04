/*

    This file contains all the constants used in the project.

    Including the keywords to block, the list of websites to block. 
    We do not want to hardcode the list of websites to block, so as to prevent this
    file from being used to access those sites. We'll simply block generic keywords
    like lots of security software out there.
    

*/

// https://www.cisdem.com/resource/list-of-websites-to-block-at-work.html

export const nsfwKeywords: string[] = [
  "porn",
  "adult",
  "xxx",
  "nsfw",
  "sex",
  "hentai",
  "rule34",
  "fetish",
  "nude",
  "xvid",
  "xham",
  "kink",
  "dirty",
  "naughty",
  "milf"
];

// I've excluded Social Media sites that might be useful for work, like
const socialMediaKeywords: string[] = [
  "facebook",
  "twitter",
  "instagram",
  "tiktok",
  "snapchat",
  "reddit",
  "tumblr",
  "myspace",
  "whatsapp",
  "telegram",
  "wechat",
  "line",
  "kik",
  "omegle",
  "periscope",
  "meowchat",
  "bumble",
  "grindr",
  "okcupid",
  "tinder",
  "match",
  "hinge"
];

const gamingKeywords: string[] = [
  "game",
  "gaming",
  "gamer",
  "ign",
  "roblox",
  "play",
  "gaming",
  "playstation",
  "psx",

  "ps2",
  "ps3",
  "ps4",
  "ps5",
  "nintendo",
  "steampowered",
  "fortnite",
  "steamdeck",
  "xbox",
  "steam",
  "online",
  "esports",
  "console",
  "gamble",
  "mmo",
  "multiplayer",
  "arcade",
  "rpg",
  "fps",
  "joystick",
  "twitch"
];

// The Spread operator is a perfomrance killer. We can probably optimize this later.
export const allBadKeywords = [
  ...nsfwKeywords,
  ...gamingKeywords,
  ...socialMediaKeywords
];
