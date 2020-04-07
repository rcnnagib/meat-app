import { Injectable } from "@angular/core";
import { ClassStmt } from "@angular/compiler/src/output/output_ast";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { Observable } from "rxjs/Observable";
import {Order, OrderItem} from './order.model'
import 'rxjs/add/operator/map';
import { MEAT_API } from "app/app.api";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class OrderService{
    constructor(private cartService: ShoppingCartService, 
                private http: HttpClient){}

    itemsValue(): number{
        return this.cartService.total()
    }
    cartItems(): CartItem[]{
        return this.cartService.items

    }

    increaseQty(item: CartItem){
        return this.cartService.increaseQty(item)
    }

    decreaseQty(item: CartItem){
        return this.cartService.decreaseQty(item)
    }

    remove(item: CartItem){
        this.cartService.removeItem(item)
    }

    clear(){
        this.cartService.clear()
    }
    checkOrder(order: Order): Observable<string> {
        let headers = new HttpHeaders()
        
        return this.http.post<Order>(`${MEAT_API}/orders`, order, {headers: headers})            
            .map(order => order.id)

    }

}