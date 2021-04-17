import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from "yup";

import { addMessage } from '../../store/ducks/layout'

import { addCarFetch, alterCarFetch } from '../../store/fetchActions'

export default function Add() {

	const [btnNameForm, setBtnNameForm] = useState('Adicionar');
	const dispatch = useDispatch();
	const history  = useHistory();

	let alterCar = history.location.state;

	let INITIAL_VALUES = {
		id: alterCar._id ? alterCar._id : 0,
		name: alterCar.name ? alterCar.name : '',
		url: alterCar.url ? alterCar.url : '',
		numero: '',
		sexo: ''
	}

	useEffect(() => {
		if(alterCar){
			setBtnNameForm('Alterar');
		}
	}, []);
	
	const formik = useFormik({
		initialValues: INITIAL_VALUES,
		validationSchema: yup.object({
			name: yup.string().min(3, 'Mínimo de 3 caracteres').required('Campo Obrigatório'),
			url: yup.string().url('Digite uma url válida').required('Campo Obrigatório'),
			//numero: yup.number().required('Campo Obrigatório').positive().integer(),
			//sexo: yup.number().oneOf([0, 1], 'Sexo Inválido').required('Campo Obrigatório'),
		}),
		onSubmit: async (values) => {
			if(values.id){
				dispatch(alterCarFetch(values));
				setBtnNameForm('Adicionar');
			}else{
				dispatch(addCarFetch(values));
			}
	
			dispatch(addMessage(`${values.name} ${values.id ? 'atualizado' : 'cadastrado' } com sucesso.`));

			formik.resetForm({});
		},
	});

	return (
		<form className="container mt-5" onSubmit={formik.handleSubmit}>
			<input type="hidden" name="id" id="id" onChange={formik.handleChange} value={formik.values.id}/>
			<div className="form-group">
				<label>Nome</label>
				<input 
					type="text" 
					name="name" 
					className="form-control" 
					placeholder="Nome..." 
					onChange={formik.handleChange} 
					onBlur={formik.handleBlur} 
					value={formik.values.name}
				/>
			</div>

			{formik.touched.name && formik.errors.name ? <span className="text-danger">{formik.errors.name}</span> : null}

			<div className="form-group">
				<label>URL:</label>
				<input 
					type="text" 
					name="url" 
					className="form-control" 
					placeholder="URL:https://cars" 
					onChange={formik.handleChange} 
					onBlur={formik.handleBlur} 
					value={formik.values.url} 
				/>
			</div>

			{formik.touched.url && formik.errors.url ? <span className="text-danger">{formik.errors.url}</span> : null}

			{/*<div className="form-group">
				<label>Número:</label>
				<input 
					type="text" 
					name="numero" 
					className="form-control" 
					onChange={formik.handleChange} 
					onBlur={formik.handleBlur} 
					value={formik.values.numero}
				/>
			</div>

			{formik.touched.numero && formik.errors.numero ? <span className="text-danger">{formik.errors.numero}</span> : null}

			<div className="form-group">
				<label>Sexo:</label>
				<select
					name="sexo"
					id="sexo"
					className="form-control" 
					onChange={formik.handleChange} 
					onBlur={formik.handleBlur} 
					value={formik.values.sexo}
				>
					<option value="" selected>Selecione o sexo</option>
					<option value="0">Masculino</option>
					<option value="1">Femino</option>
				</select> 
			</div>

			formik.touched.sexo && formik.errors.sexo ? <span className="text-danger">{formik.errors.sexo}</span> : null*/}

			<div className="form-group">
				<button type="submit" className="btn btn-primary">
					{btnNameForm}
				</button>
			</div>
		</form>
	);
}
