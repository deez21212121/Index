/**

@name Emoji Replacer

@description Automatically replaces common words with fun emojis in chat.

@author ChatGPT

@version 1.0.2 */


module.exports = class EmojiReplacer { start() { this.dictionary = { hello: "👋", hi: "👋", hey: "👋", bye: "👋", welcome: "🎉", happy: "😊", joy: "😂", lol: "😂", love: "❤️", sad: "😢", dog: "🐶", cat: "🐱", pizza: "🍕", coffee: "☕", fire: "🔥", cool: "😎", star: "⭐", sun: "☀️", moon: "🌙", tree: "🌳", music: "🎵", game: "🎮", gift: "🎁", car: "🚗", rocket: "🚀", alien: "👽", crown: "👑", skull: "💀", ghost: "👻", sparkle: "✨" };

const Messages = BdApi.findModuleByProps("sendMessage");
    if (!Messages) return;

    this.unpatch = BdApi.Patcher.before("EmojiReplacer", Messages, "sendMessage", (_, args) => {
        const content = args[1]?.content;
        if (!content) return;

        let newContent = content;
        for (const [word, emoji] of Object.entries(this.dictionary)) {
            const regex = new RegExp(`\\b${word}\\b`, "gi");
            newContent = newContent.replace(regex, emoji);
        }
        args[1].content = newContent;
    });

    BdApi.showToast("Emoji Replacer started ✅", { type: "success" });
}

stop() {
    if (this.unpatch) this.unpatch();
    BdApi.Patcher.unpatchAll("EmojiReplacer");
    BdApi.showToast("Emoji Replacer stopped ❌", { type: "info" });
}

};