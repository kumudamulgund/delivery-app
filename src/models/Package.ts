import { OfferCodeManager } from "../OfferCodeManager";
import { OfferCode } from "./OfferCode";

export class Package {
    private _id: string;
    private _weight: number;
    private _distance: number;
    private _offerCode?: OfferCode;

    constructor(id: string, weight: number, distance: number, offerCodeName?: string) {
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

}