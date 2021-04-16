import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { addMessage } from '../../store/ducks/layout'

import { addCarFetch, alterCarFetch } from '../../store/fetchActions'

export default function Add() {
	const schema = yup.object().shape({
		name: yup.string().min(2, 'Mínimo dois caracteres').required(), 
		url: yup.string().url('Informe uma url válida').required('Campo Obrigatório'), 
		numero: yup.string().min(1, 'Informe um número').required('Campo Obrigatório')
	});
	
	const { register, handleSubmit, watch, formState: { errors } } = useForm({
		resolver: yupResolver(schema)
	});

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

	function onSubmit(car){
		console.log(car);
		/*e.preventDefault();

		
		if(form._id){
			dispatch(alterCarFetch(form));
			setBtnNameForm('Adicionar');
		}else{
			dispatch(addCarFetch(form));
		}

		setForm({id: 0, name: '', url: '' })

		dispatch(addMessage(`${form.name} ${form._id ? 'atualizado' : 'cadastrado' } com sucesso.`))*/

	}

	return (
		<form className="container mt-5" onSubmit={handleSubmit(onSubmit)}>
			<input type="hidden" name="id" id="id" value={form._id}/>
			<div className="form-group">
				<label>Nome</label>
				<input onChange={formChange} type="text" name="name" className="form-control" placeholder="Nome..." defaultValue={form.name} {...register("name")}/>
			</div>
			{errors.name && (
				<span className="text-danger">{errors.name.message}</span>
			)}

			<div className="form-group">
				<label>URL:</label>
				<input onChange={formChange} type="text" name="url" className="form-control" placeholder="URL:https://cars" defaultValue={form.url} {...register("url")}/>
			</div>
			{errors.url && (
				<span className="text-danger">{errors.url.message}</span>
			)}

			<div className="form-group">
				<label>Número:</label>
				<input onChange={formChange} type="text" name="numero" className="form-control" {...register("numero")}/>
			</div>
			{errors.numero && (
				<span className="text-danger">{errors.numero.message}</span>
			)}

			<div className="form-group">
				<button type="submit" className="btn btn-primary">
					{btnNameForm}
				</button>
			</div>
		</form>
	);
}
