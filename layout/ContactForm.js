import React, { useEffect, useState } from 'react';


export default function ContactForm() {
	const TOKEN = "5775183225:AAGUPuyf5PHRfSa5Zoux-zz5_KWIx1vHAPo";
	const CHAT_ID = "-1001759583869";
	const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [text, setText] = useState('');
	const [nameDirty, setNameDirty] = useState(false);
	const [phoneDirty, setPhoneDirty] = useState(false);
	const [textDirty, setTextDirty] = useState(false);
	const [nameError, setNameError] = useState('');
	const [phoneError, setPhoneError] = useState('');
	const [textError, setTextError] = useState('');
	const [formValid, setformValid] = useState(false);

	const onNameChange = React.useCallback((value) => {
		if (!nameDirty) {
			setNameDirty(true)
		}
		setName(value)
		setNameError(validateName(value))
	}, [nameDirty])

	const onPhoneChange = React.useCallback((value) => {
		if (!phoneDirty) {
			setPhoneDirty(true)
		}
		setPhone(value)
		setPhoneError(validatePhone(value))
	}, [phoneDirty])

	const onTextChange = React.useCallback((value) => {
		if (!textDirty) {
			setTextDirty(true)
		}
		setText(value)
		setTextError(validateText(value))
	}, [textDirty])


	let formatBody = ({ sender, phone, orderText }) => `
	<h4>Заявка с сайта</h4>
	<p>
	  <b>Отправитель:</b> ${sender}<br/>
	  <b>Телефон:</b> ${phone}<br/>
	  <b>Текст заказа:</b> ${orderText}
	</p>
 `

	const blurHandler = React.useCallback((e) => {
		switch (e.target.id) {
			case 'name':
				setNameDirty(true)
				break
		}
		switch (e.target.id) {
			case 'phone':
				setNameDirty(true)
				break
		}
		switch (e.target.id) {
			case 'text':
				setTextDirty(true)
				break
		}
	}, [])

	const handleSubmit = () => {
		// TODO reset ALL dirty, ALL errors, etc. to false if we don't redirect


		let formatBody = ({ sender, phone, orderText }) => `
  			<strong>Заявка с сайта</strong>n/
    		<b>Отправитель:</b> ${name}n/
    		<b>Телефон:</b> ${phone}n/
    		<b>Текст заказа:</b> ${text}
`

		let body = formatBody({
			sender: this.name.value,
			phone: this.phone.value,
			orderText: this.text.value,
		})

		fetch(`https://api.telegram.org/bot5775183225:AAGUPuyf5PHRfSa5Zoux-zz5_KWIx1vHAPo/sendMessage`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				chat_id: "-1001759583869",
				text: formatBody,
				parse_mode: "html",
			})
		})
			.then(resp => {
				return resp.json()
				setName('');
				setPhone('');
				setText('');
				setNameDirty(false);
				setPhoneDirty(false);
				setTextDirty(false);
			})
			.catch((err) => {
				console.warn(err);
			})
			.finally(() => {
				console.log('Конец');
			})
	};



	return (
		<div>
			<form className='container block mx-auto'>
				<h3>Отправка формы заказа для связи</h3>
				<NameField
					nameDirty={nameDirty}
					nameError={nameError}
					name={name}
					blurHandler={blurHandler}
					onChange={onNameChange}
				/>
				<PhoneField
					phoneDirty={phoneDirty}
					phoneError={phoneError}
					phone={phone}
					blurHandler={blurHandler}
					onChange={onPhoneChange}
				/>
				<TextField
					textDirty={phoneDirty}
					textError={textError}
					text={text}
					blurHandler={blurHandler}
					onChange={onTextChange}
				/>
				<button
					className='block p-2 border border-red-700'
					type="submit"
					onClick={handleSubmit}
				>
					Send
				</button>
			</form>
		</div >
	);
}

function validateName(name) {
	const re = /^[a-zA-Z'][a-zA-Z-' ]+[a-zA-Z']?$/u
	if (!name) {
		return "Заполните поле"
	} else if (!re.test(String(name))) {
		return "Введите только буквы"
	} else {
		return ""
	}
}

function validatePhone(phone) {
	const re = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/u
	if (!phone) {
		return "Заполните поле"
	} else if (!re.test((phone))) {
		return ('Введите корректный телефон')
	} else {
		return ""
	}
}

function validateText(text) {
	if (!text) {
		return "Заполните поле"
	} else {
		return ""
	}
}

const NameField = React.memo(({ nameDirty, nameError, name, onBlur, onChange }) => {
	return <>
		<label htmlFor="name">Имя:</label>
		{(nameDirty && nameError) && <div className='text-red-800'>{nameError}</div>}
		<input
			className='block p-2'
			id="name"
			type="text"
			value={name}
			onBlur={onBlur}
			onChange={event => onChange(event.target.value)}
		/>
	</>
})

const PhoneField = React.memo(({ phoneDirty, phoneError, phone, onBlur, onChange }) => {
	return <>
		<label htmlFor="phone">Телефон:</label>
		{(phoneDirty && phoneError) && <div className='text-red-800'>{phoneError}</div>}
		<input
			className='block p-2'
			id="phone"
			type="tel"
			value={phone}
			onBlur={onBlur}
			onChange={event => onChange(event.target.value)}
		/>
	</>
})

const TextField = React.memo(({ textDirty, textError, text, onBlur, onChange }) => {
	return <>
		<label htmlFor="text">Введите текст заказа:</label>
		{(textDirty && textError) && <div className='text-red-800'>{textError}</div>}
		<textarea
			className='block min-h-[150px] p-2'
			id="text"
			type="text"
			placeholder=''
			value={text}
			onBlur={onBlur}
			onChange={event => onChange(event.target.value)}
		/>
	</>
})