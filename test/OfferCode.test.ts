import { OfferCode } from '../src/models/OfferCode';

describe('OfferCode class', () => {
  describe('isOfferValid', () => {
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
  describe('calculateDiscountOn', () => {
    it('should return 0 discount if the offer is not valid', () => {
      const offer = new OfferCode('OFR001', 50, 100, 10, 50, 10);
      const cost = 200;
      const weight = 120;
      const distance = 60;

      const discount = offer.calculateDiscountOn(cost, weight, distance);
      
      expect(discount).toBe(0);
    });

    it('should return the correct discount if the offer is valid', () => {
      const offer = new OfferCode('OFR001', 50, 100, 10, 50, 10);
      const cost = 200;
      const weight = 80;
      const distance = 30;

      const discount = offer.calculateDiscountOn(cost, weight, distance);
      
      expect(discount).toBeCloseTo(20, 2); // Adjust the expected value based on your calculation
    });

    it('should return 0 discount if the offer is valid but cost is zero', () => {
      const offer = new OfferCode('OFR001', 50, 100, 10, 50, 10);
      const cost = 0;
      const weight = 80;
      const distance = 30;

      const discount = offer.calculateDiscountOn(cost, weight, distance);
      
      expect(discount).toBe(0);
    });
  });
});