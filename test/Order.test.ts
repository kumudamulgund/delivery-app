import { Order } from "../src/models/Order";
import { DeliveryPartner } from "../src/models/DeliveryPartner";
import { Package } from "../src/models/Package";
import { OfferCodes } from "../src/models/OfferCodes";
import { Shipment } from "../src/models/Shipment";


jest.mock('../src/models/Package', () => {
    return {
        Package: jest.fn().mockImplementation(() => ({
            calculateDeliveryCost: jest.fn(),
            eta: 0, 
            id: '1',
        }))
    };
});


jest.mock('../src/models/DeliveryPartner', () => {
    return {
        DeliveryPartner: jest.fn().mockImplementation(() => ({
            elapsedTime: 0, // Mocking elapsedTime property
            arrivalTimeBy: jest.fn(() => 2), // Mocking arrivalTimeBy method
        }))
    };
});

describe('Order', () => {
    let order: Order;
    let deliveryPartners: DeliveryPartner[];
    let offerCodes: OfferCodes;
    let packages:Map<string, Package>;
    beforeEach(() => {
        offerCodes = new OfferCodes();
        deliveryPartners = [new DeliveryPartner('DP1', 50), new DeliveryPartner('DP2', 50)];
        packages = new Map<string, Package>();
        const pkg1 = new Package('1', 10, 100, offerCodes.getOfferCodeByName('NA'));
        const pkg2 =  new Package('2', 20, 100, offerCodes.getOfferCodeByName('OFR001'));
        packages.set('1', pkg1);
        packages.set('2', pkg2);
        const shipment:Shipment = new Shipment([pkg1,pkg2]);
      
        order = new Order(10, packages, [shipment], deliveryPartners);        
    });

    it('should return the index of the earliest available partner', () => {
        deliveryPartners[0].elapsedTime = 5;
        deliveryPartners[1].elapsedTime = 3;
        const earliestPartnerIndex = order['earliestAvailablePartner']();
        expect(earliestPartnerIndex).toBe(1);
    });

    it('should return 0 if all partners have the same elapsedTime', () => {
        deliveryPartners.forEach(partner => {
            partner.elapsedTime = 5;
        });
        const earliestPartnerIndex = order['earliestAvailablePartner']();
        expect(earliestPartnerIndex).toBe(0);
    });

    it('should calculate delivery costs and ETA for each package', () => {
        deliveryPartners[0].elapsedTime = 5;
        const packageArr = Array.from(packages.values());
        order['calculateDeliveryCostsAndETA'](packageArr, deliveryPartners[0]);
        expect(deliveryPartners[0].arrivalTimeBy).toHaveBeenCalledTimes(2);
        expect(packageArr[0].calculateDeliveryCost).toHaveBeenCalledWith(10); 
        expect(packageArr[1].calculateDeliveryCost).toHaveBeenCalledWith(10);
        expect(packageArr[0].eta).toBe(7);
        expect(packageArr[1].eta).toBe(7);
    });
});
