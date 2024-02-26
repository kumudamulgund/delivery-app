import { OfferCode } from "./OfferCode";
import { COST_PER_KG, COST_PER_KM } from "./config";

export class Package {
    private _id: string;
    private _weight: number;
    private _distance: number;
    private _deliveryCost:number;
    private _discount:number;
    private _offerCode: OfferCode | undefined;
    private _isPickedForShipment: boolean;
    private _eta:number;

    constructor(id: string, weight: number, distance: number,offerCode: OfferCode | undefined) {
        this._id = id;
        this._weight = weight;
        this._distance = distance;
        this._offerCode = offerCode;
        this._deliveryCost = 0;
        this._discount = 0;
        this._isPickedForShipment = false;
        this._eta = 0;
    }

    get id(): string {
        return this._id;
    }

    get weight(): number {
        return this._weight;
    }

    get distance(): number {
        return this._distance;
    }

    get offerCode(): OfferCode | undefined {
        return this._offerCode;
    }

    get deliveryCost():number {
        return this._deliveryCost;
    }

    private setDeliveryCost(cost:number) {
        this._deliveryCost = cost;
    }

    get discount():number {
        return this._discount;
    }

    private setDiscount(discount:number) {
        this._discount = discount;
    }

    get isPickedForShipment(): boolean {
        return this._isPickedForShipment;
    }

    set isPickedForShipment(isPicked: boolean) {
        this._isPickedForShipment = isPicked;
    }

    get eta():number {
        return this._eta;
    }

    set eta(eta:number) {
        this._eta = eta;
    }

    calculateDeliveryCost(baseDeliveryCost:number):void {
        let cost = baseDeliveryCost + (this._weight * COST_PER_KG) + (this._distance * COST_PER_KM);
        let discount = 0;
        if(this.offerCode && this.offerCode !== undefined) {
            discount = this.offerCode.calculateDiscountOn(cost, this.weight, this.distance);
        }
        cost = cost - discount;
        this.setDeliveryCost(cost);
        this.setDiscount(discount);
    }

    printDeliveryCostAndETA ():string {
        return  `${this._id} ${this._discount} ${this._deliveryCost} ${this._eta}`
    }
}