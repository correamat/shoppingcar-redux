import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { authLogin } from '../../store/fetchActions'
export default function Login(){

    const [form, setForm] = useState({username: '', password: ''})
    const dispatch = useDispatch();

    function changeForm(e){
        const { name, value } = e.target;

        setForm({ ...form, [name]: value })
    }

    function submitForm(e){
        e.preventDefault();

        dispatch(authLogin(form));

        setForm({ username: '', password: '' });
    }

    return (
        <form
        onSubmit={submitForm}
        style={{
            width: 350,
            margin: '40px auto'
        }}>
            <h2 className="text-center">SC-Login</h2>
            <div className="form-group">
                <input type="text" placeholder="Usuário" onChange={changeForm} name="username" className="form-control" value={form.username}/>
            </div>

            <div className="form-group">
                <input type="password" placeholder="Senha" onChange={changeForm} name="password" className="form-control" value={form.password}/>
            </div>

            <div className="form-group">
                <button className="btn btn-block btn-primary" type="submit">Logar</button>
            </div>
        </form>
    )
}