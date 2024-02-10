import { OfferCodeManager } from "../OfferCodeManager";
import { OfferCode } from "./OfferCode";
import { COST_PER_KG, COST_PER_KM } from "./config";

export class Package {
    private _id: string;
    private _weight: number;
    private _distance: number;
    private _deliveryCost:number;
    private _discount:number;
    private _offerCode?: OfferCode;



    constructor(id: string, weight: number, distance: number,offerCodeName?: string) {
        this._id = id;
        if(weight <= 0) {
            throw new Error("Weight must be greater than zero.")
        }
        if(distance <= 0) {
            throw new Error("Distance must be greater than zero");
        }
        if(offerCodeName && !OfferCodeManager.getOfferCodeByName(offerCodeName)) {
            throw new Error("Offer code does not exist.");
        }
        this._weight = weight;
        this._distance = distance;
        this._offerCode = offerCodeName ? OfferCodeManager.getOfferCodeByName(offerCodeName) : undefined;
        this._deliveryCost = 0;
        this._discount = 0;
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
        return this.discount;
    }

    private setDiscount(discount:number) {
        this._discount = discount;
    }

    calculateDeliveryCostAndDiscount(baseDeliveryCost:number):void {
        let cost = baseDeliveryCost + (this._weight * COST_PER_KG) + (this._distance * COST_PER_KM);
        let discount = 0;
        if(this._offerCode && this._offerCode.isOfferValid(this._weight, this._distance)) {
            const discount = cost*(this._offerCode.discountPercent/100);
            cost = cost - discount;
        }
        this.setDeliveryCost(cost);
        this.setDiscount(discount);
    }

    printDeliveryCost ():string {
        return  `${this._id} ${this._discount} ${this._deliveryCost}`
    }
}