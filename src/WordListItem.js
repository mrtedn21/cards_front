import React from 'react';
import './WordListItem.css';

class WordListItem extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<p class="word-list-item">{ this.props.wordValue }</p>
		);
	}
}

export default WordListItem;