import { Review } from './review'; 

export interface Product {
	id: number;
	name: string;
	price: number;
	image: string;
	tags: Array<string>;
	reviews?: Array<Review>;
}
