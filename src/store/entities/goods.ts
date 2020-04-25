import Entity from './entity'

export default class Goods extends Entity<string>{
    goodsName:string;
    price:number;
    describe:string;
    surplusQty:number;    
}