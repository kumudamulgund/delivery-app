import { OfferCodes } from '../src/models/OfferCodes';
import { OfferCode } from '../src/models/OfferCode';
import { Package } from '../src/models/Package';


describe('Package class', () => {
 
  it('should calculate delivery cost and discount correctly with valid offer code', () => {
    const offerCodes = new OfferCodes();
    const packageInstance = new Package('PKG1', 100, 100, offerCodes.getOfferCodeByName('OFR001'));
    const baseDeliveryCost = 100;
    packageInstance.calculateDeliveryCost(baseDeliveryCost);
    expect(packageInstance.offerCode).toBe(offerCodes.getOfferCodeByName('OFR001'))
    expect(packageInstance.deliveryCost).toBeCloseTo(1440);
    expect(packageInstance.discount).toBeCloseTo(160);
  });

  it('should calculate delivery cost and discount correctly without offer code', () => {
    const offerCodes = new OfferCodes();
    const packageInstance = new Package('PKG1', 100, 100, offerCodes.getOfferCodeByName('NA') );
    const baseDeliveryCost = 100;
    packageInstance.calculateDeliveryCost(baseDeliveryCost);
    expect(packageInstance.offerCode).toBe(undefined);
    expect(packageInstance.deliveryCost).toBe(1600);
    expect(packageInstance.discount).toBe(0);
  });

  it('should calculate delivery cost and discount correctly with invalid offer code', () => {
    const offerCodes = new OfferCodes();
    const packageInstance = new Package('PKG1', 100, 200, offerCodes.getOfferCodeByName('OFR001'));
    const baseDeliveryCost = 100;
    packageInstance.calculateDeliveryCost(baseDeliveryCost);
    expect(packageInstance.offerCode).toBe(offerCodes.getOfferCodeByName('OFR001'));
    expect(packageInstance.deliveryCost).toBe(2100);
    expect(packageInstance.discount).toBe(0);
  });

});