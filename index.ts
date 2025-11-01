/**
 * @name Emoji Replacer
 * @description Automatically replaces common words with fun emojis in chat.
 * @author ChatGPT
 * @version 1.0.0
 * @source https://github.com/your-repo/EmojiReplacer
 * @updateUrl https://github.com/your-repo/EmojiReplacer/raw/main/EmojiReplacer.plugin.js
 */

module.exports = (() => {
    const config = {
        name: "Emoji Replacer",
        version: "1.0.0",
        description: "Automatically replaces common words with fun emojis in chat.",
        author: "ChatGPT"
    };

    const dictionary = {
        hello: "👋", hi: "👋", hey: "👋", bye: "👋", welcome: "🎉",
        happy: "😊", lol: "😂", love: "❤️", sad: "😢", cry: "😭", mad: "😡",
        cool: "😎", fire: "🔥", tired: "😴", think: "🤔", yes: "👍", no: "👎",
        wink: "😉", shocked: "😱", nerd: "🤓", pleading: "🥺", exploding: "🤯",
        dog: "🐶", cat: "🐱", fox: "🦊", bear: "🐻", frog: "🐸", panda: "🐼",
        food: "🍔", pizza: "🍕", burger: "🍔", fries: "🍟", cake: "🍰", coffee: "☕",
        sun: "☀️", moon: "🌙", star: "⭐", cloud: "☁️", rain: "🌧️", flower: "🌸",
        book: "📖", pen: "🖊️", key: "🔑", gift: "🎁", car: "🚗", rocket: "🚀",
        sport: "🏅", soccer: "⚽", music: "🎵", game: "🎮", crown: "👑"
    };

    return class EmojiReplacer {
        load() {
            console.log(`[${config.name}] Loaded v${config.version}`);
        }

        start() {
            this.patchMessages();
            BdApi.showToast(`${config.name} started! 🌟`, { type: "success" });
        }

        stop() {
            BdApi.Patcher.unpatchAll(config.name);
            BdApi.showToast(`${config.name} stopped.`, { type: "info" });
        }

        patchMessages() {
            const MessageEvents = BdApi.findModuleByProps("sendMessage", "receiveMessage");
            if (!MessageEvents) return console.error(`[${config.name}] Message module not found.`);

            BdApi.Patcher.before(config.name, MessageEvents, "sendMessage", (_, args) => {
                const content = args[1]?.content;
                if (!content) return;

                let newContent = content;
                for (const [word, emoji] of Object.entries(dictionary)) {
                    const regex = new RegExp(`\\b${word}\\b`, "gi");
                    newContent = newContent.replace(regex, emoji);
                }

                args[1].content = newContent;
            });
        }
    };
})();