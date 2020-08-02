import React from 'react';

function BookmarkButton(url) {
	return (
		<button onClick={function() { console.log(url.url) }}>
            Bookmark
		</button>
	)
}

function saveURL(url) {
 // placeholder
}

export default BookmarkButton;