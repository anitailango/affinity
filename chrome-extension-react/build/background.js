const news_article_urls = [
	{ "hostSuffix": "www.nytimes.com" },
	{ "hostSuffix": "www.wsj.com/articles" }
]

const api = 'http://127.0.0.1:5000/'
const api_scrape = 'scrape'

chrome.runtime.onInstalled.addListener(function () {
});

chrome.webNavigation.onCompleted.addListener(function (e) {
	fetch(api + api_scrape)
		.then((res) => {
			return res.json();
		})
		.then((json) => {
			const { author, content } = json;
			alert(`Author: ${author}\nContent: ${content}\nSaved this buddy boy to local storage!`);
			localStorage.setItem("author", author);
		});
}, { url: news_article_urls});
