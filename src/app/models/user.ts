import { Cart } from './cart';
import { Order } from './order'; 

export interface User {
	id:number
	firstName:string;
	lastName:string;
	email:string;
	password:string;
	dateOfBirth:string;
	cart?:Cart;
	orders?:Array<Order>;
}
