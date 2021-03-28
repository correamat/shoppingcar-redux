import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { addMessage } from '../../store/ducks/layout'

import { addCarFetch, alterCarFetch } from '../../store/fetchActions'

export default function Add() {

	const [form, setForm] = useState({ id: 0, name: '', url: '' })
	const [btnNameForm, setBtnNameForm] = useState('Adicionar');
	const dispatch = useDispatch();
	const history  = useHistory();
	let alterCar = history.location.state;

	useEffect(() => {
		if(alterCar){
			setForm(alterCar);
			setBtnNameForm('Alterar');
		}
	}, [])

	function formChange(e) {
		setForm({...form, [e.target.name]: e.target.value })
	}

	function onSubmit(e){
		e.preventDefault();

		
		if(form._id){
			dispatch(alterCarFetch(form));
			setBtnNameForm('Adicionar');
		}else{
			dispatch(addCarFetch(form));
		}

		setForm({id: 0, name: '', url: '' })

		dispatch(addMessage(`${form.name} ${form._id ? 'atualizado' : 'cadastrado' } com sucesso.`))
	}

	return (
		<form className="container mt-5" onSubmit={onSubmit}>
			<input type="hidden" name="id" id="id" value={form._id}/>
			<div className="form-group">
				<label>Nome</label>
				<input onChange={formChange} type="text" name="name" className="form-control" placeholder="Nome..." value={form.name}/>
			</div>
			<div className="form-group">
				<label>URL:</label>
				<input onChange={formChange} type="text" name="url" className="form-control" placeholder="URL:https://cars" value={form.url}/>
			</div>
			<button type="submit" className="btn btn-primary">
				{btnNameForm}
			</button>
		</form>
	);
}
