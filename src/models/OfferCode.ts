export class OfferCode {
    private _offerName: string;
    private _minWeight: number;
    private _maxWeight: number;
    private _minDistance: number;
    private _maxDistance: number;
    private _discountPercent: number;

    constructor(
        offerName: string,
        minWeight: number,
        maxWeight: number,
        minDistance: number,
        maxDistance: number,
        discountPercent: number
    ) {
        this._offerName = offerName;
        this._minWeight = minWeight;
        this._maxWeight = maxWeight;
        this._minDistance = minDistance;
        this._maxDistance = maxDistance;
        this._discountPercent = discountPercent;
    }

    get offerName(): string {
        return this._offerName;
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
}