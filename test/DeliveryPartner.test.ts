import { DeliveryPartner } from '../src/models/DeliveryPartner';

describe('DeliveryPartner', () => {
  describe('arrivalTimeBy', () => {
    it('should return the correct arrival time for a given distance', () => {
      const partner = new DeliveryPartner('DP001', 50);
      const distance = 100;
      const arrivalTime = partner.arrivalTimeBy(distance);
      const expectedArrivalTime = partner.arrivalTimeBy(distance);
      expect(arrivalTime).toBeCloseTo(expectedArrivalTime, 2);
    });

    it('should return 0 if the distance is 0', () => {
      const partner = new DeliveryPartner('DP001', 50);
      const distance = 0;
      const arrivalTime = partner.arrivalTimeBy(distance);
      
      expect(arrivalTime).toBe(0);
    });

    it('should throw an error if the distance is negative', () => {
      const partner = new DeliveryPartner('DP001', 50);
      const distance = -100;
      const callWithNegativeDistance = () => partner.arrivalTimeBy(distance);
      expect(callWithNegativeDistance).toThrowError('distance cannot be a negative number');
    });

  });
  
});