/* global chrome */
const news_article_urls = [
	{ hostSuffix: "www.nytimes.com" },
	{ hostSuffix: "www.wsj.com/articles" },
];

const api = "http://127.0.0.1:5000/";
// const api_scrape = "scrape";

chrome.runtime.onInstalled.addListener(function () {
	// Go to home page of Affinity
});

chrome.webNavigation.onCompleted.addListener(
	function (e) {
		fetch(api + "?url=" + e.url)
			.then((res) => {
				return res.json();
			})
			.then((json) => {
				const { author, title, publisher, rating } = json;

				chrome.runtime.sendMessage({
					type: "AFFINITY_ARTICLE_INFO",
					isArticle: true,
					author,
					title,
					publisher,
					rating,
				});
			});
	}
	// { url: news_article_urls }
);
