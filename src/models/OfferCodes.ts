import { OfferCode } from './OfferCode';

export class OfferCodes {
    private offerCodeMap: Map<string, OfferCode>;

    constructor() {
        this.offerCodeMap = new Map();
        this.offerCodeMap.set('OFR001', new OfferCode('OFR001', 70, 200, 0.01, 199.99, 10));
        this.offerCodeMap.set('OFR002', new OfferCode('OFR002', 100, 250, 50, 150, 7));
        this.offerCodeMap.set('OFR003', new OfferCode('OFR003', 10, 150, 50, 150, 5));
    }

    
    getOfferCodeByName(offerName:string): OfferCode | undefined {
        return this.offerCodeMap.get(offerName);
    }
    
    add(offerCode:OfferCode) {
        if(this.getOfferCodeByName(offerCode.name) === undefined) {
            this.offerCodeMap.set(offerCode.name, offerCode);
        } else {
            throw new Error("Offer code already exists.");
        }
    }

    update(offerCodeName: string, updatedOffer: OfferCode) {
        const existingOfferCode = this.getOfferCodeByName(offerCodeName);
        if (existingOfferCode) {
            this.offerCodeMap.set(offerCodeName, updatedOffer);
        } else {
            throw new Error("Offer code does not exist.");
        }
    }

    delete(offerCodeName:string) {
        if(this.getOfferCodeByName(offerCodeName) !== undefined) {
            this.offerCodeMap.delete(offerCodeName);
        } else {
            throw new Error("Offer code does not exist.");
        }
    }

}
