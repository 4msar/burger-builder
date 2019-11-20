import React from 'react';

import Aux from '../../../hoc/Fragment';
import Button from '../../UI/Button/Button';
import { BurgerPrice, BasePrice } from '../../../containers/BurgerBuilder/BurgerPrice';
const orderSummery = (props) => {
	const ordersSummery = Object.keys(props.ingredients)
			.map(igKey => {
				return (
					<li key={igKey}>
						<span style={{ textTransform: 'capitalize' }}>{igKey}</span> : {props.ingredients[igKey]} x {BurgerPrice[igKey]} = {props.ingredients[igKey] * BurgerPrice[igKey]}
					</li>
				)
			});
	return (
		<Aux>
			<h3>Order Summery</h3>
			<p>A delicious burger with folowing ingredients: </p>
			<ul>
				<li>Base: {BasePrice}</li>
				{ordersSummery}
			</ul>
			<p><strong>Total Price : {props.price.toFixed(2)}</strong></p>
			<p>Continue to checkout?</p>
			<Button btnType="Danger" clicked={props.purchaseCancel}>Cancel</Button>
			<Button btnType="Success" clicked={props.purchaseContinued}>Continue</Button>
		</Aux>
	)
}

export default orderSummery;