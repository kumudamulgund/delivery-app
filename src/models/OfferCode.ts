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

    set offerName(value: string) {
        this._offerName = value;
    }

    get minWeight(): number {
        return this._minWeight;
    }

    set minWeight(value: number) {
        this._minWeight = value;
    }

    get maxWeight(): number {
        return this._maxWeight;
    }

    set maxWeight(value: number) {
        this._maxWeight = value;
    }

    get minDistance(): number {
        return this._minDistance;
    }

    set minDistance(value: number) {
        this._minDistance = value;
    }
    
    get maxDistance(): number {
        return this._maxDistance;
    }

    set maxDistance(value: number) {
        this._maxDistance = value;
    }

    get discountPercent(): number {
        return this._discountPercent;
    }

    set discountPercent(value: number) {
        this._discountPercent = value;
    }
}