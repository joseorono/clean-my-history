/*

    This file contains all the constants used in the project.

    Including the keywords to block, the list of websites to block.
    We do not want to hardcode the list of websites to block, so as to prevent this
    file from being used to access those sites. We'll simply block generic keywords
    like lots of security software out there.


*/

// Default Pomodoro Duration
export const DEFAULT_WORK_MINUTES = 25;
export const DEFAULT_SHORT_BREAK_MINUTES = 5;
export const DEFAULT_LONG_BREAK_MINUTES = 15;
export const DEFAULT_SESSIONS_UNTIL_LONG_BREAK = 4;

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
export const socialMediaKeywords: string[] = [
  "facebook",
  "twitter",
  "x.com/",
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
  "hinge",
  "youtube"
];

export const gamingKeywords: string[] = [
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

export const badKeyboardCategories = ["nsfw", "gaming", "social"];

export type BadKeyboardCategory = (typeof badKeyboardCategories)[number];

export const focusEncouragementMessages: string[] = [
  "Break time is over! Ready to focus?",
  "Deep work awaits. Let’s get back in the zone.",
  "Shift back into focus mode—you’ve got this.",
  "Time to tune out distractions and dial in.",
  "Let’s pick up where you left off and push a little further."
];

export const breakEncouragementMessages: string[] = [
  "Great work! Time for a break.",
  "Nice session—take a moment to recharge.",
  "You’ve earned a breather. Step away for a bit.",
  "Stand up, stretch, and enjoy a short break.",
  "Pause and reset—your next focus block will be even better."
];

// Focus mode animation constants
export const FOCUS_VIEW_TRANSITION_DURATION = 300; // milliseconds

// Task archiving
export const MAX_PAST_TASKS_ARCHIVED = 10;
