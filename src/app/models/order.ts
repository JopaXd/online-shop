import { Cart } from './cart'

export interface Order {
	id:string;
	date: Date;
	order: Cart;
	status: string;
	orderCost: number;
}
