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
			const { author, content, publisher } = json;
			alert(`Author: ${author}\nContent: ${content}\nPublisher: ${publisher}\nSaved this buddy boy to local storage!`);
			
			// Save to local storage
			localStorage.setItem("author", author);
			localStorage.setItem("content", content);
			localStorage.setItem("publisher", publisher);
		});
}, { url: news_article_urls});
