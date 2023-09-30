var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
/*!Don't edit script.js. Edit script.ts*/
let num = parseInt((_a = window.localStorage.getItem("session-counter")) !== null && _a !== void 0 ? _a : "0");
let cursessionnum = 0;
function startSpam(urls) {
    for (let i = 0; i < urls.length; i++) {
        setInterval(spam, 100, urls[i]);
    }
}
function syncToLocalStorage() {
    window.localStorage.setItem("session-counter", num.toString());
}
function spam(url) {
    if (url === "") {
        return;
    }
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: "反恶意软件战争万岁！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！" })
    }).then((response) => {
        if (response.status < 400) {
            document.getElementById("session-counter").innerText = `We have sent ${++cursessionnum} non-429 requests in this session`;
            document.getElementById("total-counter").innerText = `We have sent ${++num} non-429 requests in total`;
        }
    }).catch(error => { });
}
(() => __awaiter(this, void 0, void 0, function* () {
    let urls = yield fetch("https://raw.githubusercontent.com/thefightagainstmalware/GuildedSpammer/main/urls.txt").then(res => res.text());
    startSpam(urls.split("\n"));
}))().catch(err => {
    console.error(err);
});
setInterval(syncToLocalStorage, 1000);
