import React from 'react';

const BookmarkButton = (url) => {
	return (
		<button onClick={function() { console.log(url.url) }}>
            Bookmark
		</button>
	);
}

function saveURL(url) {
 // placeholder
}

export default BookmarkButton;