import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.css';

import Search from '../interface/Search/Search';
import HeaderButton from '../interface/HeaderButton/HeaderButton';
import CardList from '../interface/WordList/CardList';
import OverContainer from '../interface/OverContainer/OverContainer';
import Pipe from '../Pipe'

import NewCardForm from '../interface/forms/NewCardForm';
import AccountForm from '../interface/forms/AccountForm';
import GameForm from '../interface/forms/GameForm';
import HelpForm from '../interface/forms/HelpForm';

import { initiateCards } from '../state/cards/cardsSlice'
import request from "../util/request";

export const FORMS = {
	newCard: 'New card',
	game: 'Game',
	piles: 'Piles',
	help: 'Help',
	import: 'Import',
	account: 'Account',
	none: 'None',
};

function App() {
	var [ currentForm, setCurrentForm ] = useState(FORMS.none);
	var dispatch = useDispatch();
	var cards = useSelector(state => state.cards);

	function headerButtonHandler(event, form) {
		setCurrentForm(form);
	}

	function overContainerClickHandler(event) {
		setCurrentForm(FORMS.none);
	}

	function closeForm() {
		setCurrentForm(FORMS.none);
	}

	useEffect(() => {
		request({
			url: 'get_all',
			callback: data => dispatch(initiateCards(data))
		});
	}, []);

	var currentFormElement = null;
	
	switch (currentForm) {
		case FORMS.newCard:
			currentFormElement = <NewCardForm closeForm={ closeForm } />;
			break;
		case FORMS.game:
			currentFormElement = <GameForm />;
			break;
		case FORMS.account:
			currentFormElement = <AccountForm />;
			break;
		case FORMS.help:
			currentFormElement = <HelpForm />;
			break;
		default:
			currentFormElement = null
	}
	
	if (currentFormElement) {
		currentFormElement = (
			<OverContainer clickHandler={ overContainerClickHandler } >
				{ currentFormElement }
			</OverContainer>
		);
	}

	return (
		<React.Fragment>
			<section className="header" >
				<HeaderButton form={ FORMS.newCard } handler={ headerButtonHandler } />
				<HeaderButton form={ FORMS.game } handler={ headerButtonHandler } />
				<HeaderButton form={ FORMS.piles } handler={ headerButtonHandler } />
				<HeaderButton form={ FORMS.help } handler={ headerButtonHandler } />
				<HeaderButton form={ FORMS.import } handler={ headerButtonHandler } />
				<HeaderButton form={ FORMS.account } handler={ headerButtonHandler } />
			</section>
			<hr />
			<Search />
			<Pipe value="test pipe" />
			<CardList cards={ cards } />
			{ currentFormElement }
		</React.Fragment>
	)
}

export default App
