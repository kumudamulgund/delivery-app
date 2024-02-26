export class OfferCode {
    private _name: string;
    private _minWeight: number;
    private _maxWeight: number;
    private _minDistance: number;
    private _maxDistance: number;
    private _discountPercent: number;

    constructor(
        name: string,
        minWeight: number,
        maxWeight: number,
        minDistance: number,
        maxDistance: number,
        discountPercent: number
    ) {
        this._name = name;
        this._minWeight = minWeight;
        this._maxWeight = maxWeight;
        this._minDistance = minDistance;
        this._maxDistance = maxDistance;
        this._discountPercent = discountPercent;
    }

    get name(): string {
        return this._name;
    }

    get minWeight(): number {
        return this._minWeight;
    }

    get maxWeight(): number {
        return this._maxWeight;
    }

    get minDistance(): number {
        return this._minDistance;
    }
    
    get maxDistance(): number {
        return this._maxDistance;
    }

    get discountPercent(): number {
        return this._discountPercent;
    }

    isOfferValid(weight:number, distance:number):boolean {
        return (weight >= this._minWeight && weight <= this._maxWeight && 
            distance >= this._minDistance && distance <= this._maxDistance )
    }

    calculateDiscountOn(cost:number, weight:number, distance:number): number {
        let discount = 0;
        if(this.isOfferValid(weight, distance)) {
            discount = parseFloat((cost*(this.discountPercent/100)).toFixed(2));
        }
        return discount;
    }

    
}