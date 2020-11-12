
// These are the whitelisted sources for affinity to scrape data
const news_article_urls = [
	{ "hostSuffix": "www.nytimes.com" },
	{ "hostSuffix": "www.wsj.com" },
	{ "hostSuffix": "www.cnn.com"},
	{ "hostSuffix": "www.foxnews.com"}
]

const api = 'http://127.0.0.1:8000/'
const api_scrape = 'rating/'

chrome.storage.sync.set({ // set up data
	'type': 'inactive', 
	'author': ' ',
	'title': ' ',
	'publisher': ' ',
	'rating': ' '
});

chrome.runtime.onInstalled.addListener(function () {
	console.log('on installed');
	
});

chrome.runtime.onStartup.addListener(function () {
	console.log('on startup');
	chrome.storage.sync.set({ // set up data
		'type': 'inactive', 
		'author': ' ',
		'title': ' ',
		'publisher': ' ',
		'rating': ' '
	});
});

chrome.webNavigation.onCommitted.addListener(function (e) {
	console.log('on committed');
	chrome.storage.sync.set({ // set up data
		'type': 'inactive', 
		'author': ' ',
		'title': ' ',
		'publisher': ' ',
		'rating': ' '
	});
});

chrome.webNavigation.onCompleted.addListener(function (e) {
	console.log('web navigation completed');
	console.log(api + api_scrape)
	fetch(api + api_scrape + '?url=' + e.url, 
		{
			mode: 'no-cors', 
			headers: {'Accept': 'application/json', 'Content-type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'},
			method: 'GET'
		}
	)
		.then((res) => {
			console.log(res);
			return res.json();
		})
		.then((json) => {
			console.log(json)
			const { author, title, publisher, rating } = json;
			// alert(`Author: ${author}\nContent: ${content}\nPublisher: ${publisher}\nSaved this buddy boy to session storage!`);
			console.log('in background');
			console.log(author, title, publisher);
			chrome.runtime.sendMessage({
				type: "AFFINITY_ARTICLE_INFO",
				author,
				title,				
				publisher,
				rating
			});
			// store the request
			chrome.storage.sync.set({
				'type': 'article',
				author, 
				title,
				publisher,
				rating
			});
			console.log('sent');
		});
}, { url: news_article_urls});


chrome.runtime.onSuspend.addListener(function() {
	chrome.storage.sync.set({
		'type': 'inactive', 
		'author': ' ',
		'title': ' ',
		'publisher': ' ',
		'rating': ' '
	});
});