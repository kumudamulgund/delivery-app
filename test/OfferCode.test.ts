import { OfferCode } from '../src/models/OfferCode';

describe('OfferCode class', () => {
 
  it('should return true when weight and distance are within the offer range', () => {
    const offer = new OfferCode('OFR001', 50, 100, 10, 200, 10);
    const result = offer.isOfferValid(75, 150);
    expect(result).toBe(true);
  });

  it('should return false when weight is below the minimum weight', () => {
    const offer = new OfferCode('OFR001', 50, 100, 10, 200, 10);
    const result = offer.isOfferValid(40, 150);
    expect(result).toBe(false);
  });

  it('should return false when weight is above the maximum weight', () => {
    const offer = new OfferCode('OFR001', 50, 100, 10, 200, 10);
    const result = offer.isOfferValid(110, 150);
    expect(result).toBe(false);
  });

  it('should return false when distance is below the minimum distance', () => {
    const offer = new OfferCode('OFR001', 50, 100, 10, 200, 10);
    const result = offer.isOfferValid(75, 5);
    expect(result).toBe(false);
  });

  it('should return false when distance is above the maximum distance', () => {
    const offer = new OfferCode('OFR001', 50, 100, 10, 200, 10);
    const result = offer.isOfferValid(75, 250);
    expect(result).toBe(false);
  });
});