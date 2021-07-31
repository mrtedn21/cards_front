import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import './CommonForm.css';
import OverForm from './OverForm'

import { insertCard } from '../../state/cards/cardsSlice'
import { updateOriginalWord, updateTranslatedWord, clearWords } from '../../state/inputWords/inputWordsSlice'

import request from '../../util/request'

function NewCardForm(props) {
	var dispatch = useDispatch();
	var originalWord = useSelector(state => state.inputWords.originalWord);
	var translatedWord = useSelector(state => state.inputWords.translatedWord);

	function submitHandler() {
		if (!originalWord || !translatedWord)
			return;

		var form = new FormData();
		form.set('original_word', originalWord);
		form.set('translated_word', translatedWord);

		request({
			url: 'add',
			method: 'POST',
			body: form,
			callback: data => {
				console.log(data.id);
				var card = {
					id: data.id,
					original_word: originalWord,
					translated_word: translatedWord
				};

				dispatch(insertCard(card));
				dispatch(clearWords());
			}
		});

		props.closeForm();
	}

	function originalWordInputHandler(event) {
		dispatch(updateOriginalWord(event.target.value));
	}

	function translatedWordInputHandler(event) {
		dispatch(updateTranslatedWord(event.target.value));
	}

	return (
		<OverForm>
			<p>New card</p>
			<textarea
				onInput={ originalWordInputHandler }
				value={ originalWord }
				className="over-input-textarea"
				placeholder="Original word"
				rows="3"
			/>
			<br/>
			<textarea
				onInput={ translatedWordInputHandler }
				value={ translatedWord }
				className="over-input-textarea"
				placeholder="Translated word with context"
				rows="3"
			/>
			<br />
			<input
				onClick={ submitHandler }
				type="button"
				value="Save"
				className="over-form-button"
			/>
		</OverForm>
	);
}

export default NewCardForm;