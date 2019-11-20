import React, { Component } from 'react';

import Aux from '../../hoc/Fragment';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import { BurgerPrice, BasePrice } from './BurgerPrice';

class BurgerBuilder extends Component {
	constructor(props){
		super(props);
		this.state = {
			ingredients: {
				salad: 1,
				bacon: 2,
				cheese: 1,
				meat: 1,
			},
			totalprice: BasePrice,
			purchasable: false,
			purchasing: false,
		}
		this.addIngredientHandler = this.addIngredientHandler.bind(this);
		this.removeIngredientHandler = this.removeIngredientHandler.bind(this);
		// this.purchaseHandler = this.purchaseHandler.bind(this);
	}

	componentDidMount(){
		this.updateTotalPrice();
		this.updatePurchaseState(this.state.ingredients);
	}

	updateTotalPrice(){
		const ingredients = this.state.ingredients;
		let newPrice = this.state.totalprice;
		const items = Object.keys(ingredients)
			.map(igKey=>{
				return BurgerPrice[igKey]
			});
		for( let i in items ){
			newPrice += Number(items[i]);
		}
		this.setState({
			totalprice: newPrice
		});
	}

	updatePurchaseState(ingredients){
		const sum = Object.keys(ingredients)
					.map(igKey => {
						return ingredients[igKey]
					})
					.reduce((sum, el)=>{
						return sum + el;
					}, 0);
		this.setState({purchasable: sum > 0})
	}
	purchaseHandler = () => {
		this.setState({ purchasing: true });
	}
	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	}
	purchaseContinueHandler = () => {
		alert('Continued!')
	}

	addIngredientHandler(type){
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = updatedCount;
		const priceAddition = BurgerPrice[type];
		const oldPrice = this.state.totalprice;
		const newPrice = oldPrice + priceAddition;
		this.setState({
			ingredients: updatedIngredients,
			totalprice: newPrice
		});
		this.updatePurchaseState(updatedIngredients);
	}
	removeIngredientHandler(type){
		const oldCount = this.state.ingredients[type];
		if( oldCount <= 0 ){
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = updatedCount;
		const priceDeduction = BurgerPrice[type];
		const oldPrice = this.state.totalprice;
		const newPrice = oldPrice - priceDeduction;
		this.setState({
			ingredients: updatedIngredients,
			totalprice: newPrice
		});
		this.updatePurchaseState(updatedIngredients);
	}

	render(){
		let disabledInfo = {
			...this.state.ingredients
		};
		for (let key in disabledInfo){
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					<OrderSummery 
						price={this.state.totalprice}
						ingredients={this.state.ingredients}
						purchaseCancel={this.purchaseCancelHandler}
						purchaseContinued={this.purchaseContinueHandler} />
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls 
				ingredientRemoved={this.removeIngredientHandler} 
				ingredientAdded={this.addIngredientHandler} 
				disabled={disabledInfo}
				purchasable={this.state.purchasable}
				price={this.state.totalprice} 
				ordered={this.purchaseHandler} />
			</Aux>
		)
	}
}

export default BurgerBuilder;