import { OfferCode } from './models/OfferCode';

export class OfferCodeManager {
    private static offerCodeMap: Map<string, OfferCode> = new Map();

    static initialiseOffercodes(): void {
        this.offerCodeMap.set('OFR001', new OfferCode('OFR001', 70, 200, 0.01, 199.99, 10));
        this.offerCodeMap.set('OFR002', new OfferCode('OFR002', 100, 250, 50, 150, 7));
        this.offerCodeMap.set('OFR003', new OfferCode('OFR003', 10, 150, 50, 150, 5));
    }

    static getOfferCodeByName(offerName:string): OfferCode | undefined {
        return this.offerCodeMap.get(offerName);
    }
}
