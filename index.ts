import { Devs } from "@utils/constants";
import definePlugin, { OptionType } from "@utils/types";
import { findByPropsLazy } from "@webpack";

const dictionary: Record<string, string> = {
    // 🔥 GREETINGS
    hello: "👋", hi: "👋", hey: "👋", bye: "👋", goodbye: "👋", cya: "👋", later: "👋", welcome: "🎉",

    // 😍 EMOTIONS
    happy: "😊", joy: "😂", laugh: "😂", lol: "😂", fun: "😄", smile: "😁", grin: "😀", love: "❤️",
    heart: "❤️", kiss: "😘", hug: "🤗", wow: "🤩", surprise: "😲", sad: "😢", cry: "😭", angry: "😠",
    mad: "😡", cool: "😎", fire: "🔥", lit: "🔥", tired: "😴", sleepy: "😪", think: "🤔", yes: "👍",
    no: "👎", ok: "👌", blush: "🥰", wink: "😉", shocked: "😱", relieved: "😌", nerd: "🤓",
    confused: "😕", pleading: "🥺", yawning: "🥱", exploding: "🤯", partying: "🥳",

    // 🐾 ANIMALS
    dog: "🐶", cat: "🐱", mouse: "🐭", hamster: "🐹", rabbit: "🐰", fox: "🦊", bear: "🐻",
    panda: "🐼", koala: "🐨", tiger: "🐯", lion: "🦁", cow: "🐮", pig: "🐷", frog: "🐸",
    monkey: "🐵", chicken: "🐔", bird: "🐦", penguin: "🐧", elephant: "🐘", giraffe: "🦒",
    horse: "🐴", unicorn: "🦄", sheep: "🐑", goat: "🐐", camel: "🐫", turtle: "🐢",
    snake: "🐍", dragon: "🐉", whale: "🐋", dolphin: "🐬", fish: "🐟", shark: "🦈",
    crab: "🦀", lobster: "🦞", butterfly: "🦋", bee: "🐝", ladybug: "🐞", spider: "🕷️",
    octopus: "🐙", snail: "🐌", duck: "🦆", owl: "🦉", bat: "🦇", rat: "🐀",

    // 🍔 FOOD & DRINK
    food: "🍔", eat: "🍴", pizza: "🍕", burger: "🍔", fries: "🍟", hotdog: "🌭", taco: "🌮",
    burrito: "🌯", sushi: "🍣", ramen: "🍜", soup: "🥣", cake: "🍰", chocolate: "🍫",
    candy: "🍬", cookie: "🍪", donut: "🍩", coffee: "☕", tea: "🍵", beer: "🍺", wine: "🍷",
    water: "💧", icecream: "🍦", popcorn: "🍿", cheese: "🧀", bread: "🍞", egg: "🥚",

    // 🌍 NATURE & WEATHER
    sun: "☀️", moon: "🌙", star: "⭐", cloud: "☁️", rain: "🌧️", thunder: "⚡", snow: "❄️",
    wind: "💨", rainbow: "🌈", flower: "🌸", rose: "🌹", tree: "🌳", leaf: "🍃", firework: "🎆",

    // 💻 TECH & OBJECTS
    phone: "📱", computer: "💻", laptop: "💻", tv: "📺", camera: "📷", watch: "⌚", light: "💡",
    book: "📖", pencil: "✏️", pen: "🖊️", key: "🔑", lock: "🔒", gift: "🎁", money: "💰",
    coin: "🪙", car: "🚗", bike: "🚲", airplane: "✈️", rocket: "🚀", robot: "🤖", game: "🎮",

    // ⚽ SPORTS & ACTIVITIES
    sport: "🏅", soccer: "⚽", football: "🏈", basketball: "🏀", baseball: "⚾", tennis: "🎾",
    golf: "⛳", swim: "🏊", run: "🏃", dance: "💃", music: "🎵", sing: "🎤", paint: "🎨",
    camera2: "📸", movie: "🎬", travel: "🧳",

    // 🎉 SYMBOLS & MISC
    star2: "🌟", sparkle: "✨", magic: "🪄", bomb: "💣", skull: "💀", ghost: "👻",
    alien: "👽", poop: "💩", crown: "👑", gem: "💎", clock: "⏰", bell: "🔔", balloon: "🎈",
    check: "✅", cross: "❌", question: "❓", exclamation: "❗", arrow: "➡️", warning: "⚠️",
    recycle: "♻️", globe: "🌍", medal: "🥇", trophy: "🏆", sparkle2: "💫",
};

export default definePlugin({
    name: "Emoji Replacer",
    description: "Automatically replaces common words with fun emojis in chat.",
    authors: [Devs.ChatGPT],
    options: {
        enabled: {
            type: OptionType.BOOLEAN,
            default: true,
            description: "Toggle emoji replacement on or off."
        }
    },
    start() {
        const MessageParser = findByPropsLazy("parse");
        const originalParse = MessageParser.parse;

        MessageParser.parse = function (...args) {
            let text = args[0];
            for (const [word, emoji] of Object.entries(dictionary)) {
                const regex = new RegExp(`\\b${word}\\b`, "gi");
                text = text.replace(regex, emoji);
            }
            args[0] = text;
            return originalParse.apply(this, args);
        };
    },
    stop() {
        const MessageParser = findByPropsLazy("parse");
        if (MessageParser?.parse?.__original) {
            MessageParser.parse = MessageParser.parse.__original;
        }
    }
});