import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Car from '../../components/Car';

import { getAllCars } from '../../store/fetchActions';
import { addItem } from '../../store/ducks/cart';
import { alterCar } from '../../store/ducks/cars';
import { addMessage } from '../../store/ducks/layout';

export default function List() {

	const cars = useSelector(state => state.cars)
	const dispatch = useDispatch()
	const history  = useHistory();

	useEffect(() => {
		dispatch(getAllCars())
	}, [dispatch])

	function addItemCart(car){
		dispatch(addItem(car));

		dispatch(addMessage(`${car.name} adicionado com sucesso.`));
	}

	function alterCarList(car){

		history.push('/add', {
			...car
		});
	}

	return (
		<div className="container-fluid">
			<div className="row">{cars.map((car, index) => <Car key={index} car={car} addItemCart={addItemCart} alterCarList={alterCarList} />)}</div>
		</div>
	);
}
