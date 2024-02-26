import { OfferCodes } from '../src/models/OfferCodes';
import { OfferCode } from '../src/models/OfferCode';

describe('OfferCodes', () => {
  let offerCodes: OfferCodes;

  beforeEach(() => {
    offerCodes = new OfferCodes();
  });

  describe('add', () => {
    it('should add a new offer code', () => {
      const offerCode = new OfferCode('OFR004', 50, 100, 20, 80, 3);
      offerCodes.add(offerCode);
      expect(offerCodes.getOfferCodeByName('OFR004')).toEqual(offerCode);
    });

    it('should throw an error if the offer code already exists', () => {
      const offerCode = new OfferCode('OFR001', 70, 200, 0.01, 199.99, 10);
      expect(() => offerCodes.add(offerCode)).toThrowError('Offer code already exists.');
    });
  });

  describe('delete', () => {
    it('should delete an existing offer code', () => {
      offerCodes.delete('OFR001');
      expect(offerCodes.getOfferCodeByName('OFR001')).toBeUndefined();
    });

    it('should throw an error if the offer code does not exist', () => {
      expect(() => offerCodes.delete('OFR004')).toThrowError('Offer code does not exist.');
    });
  });

  describe('getOfferCodeByName', () => {
    it('should return the offer code if it exists', () => {
      const offerCode = offerCodes.getOfferCodeByName('OFR002');
      expect(offerCode).toBeDefined();
      expect(offerCode!.name).toEqual('OFR002');
    });

    it('should return undefined if the offer code does not exist', () => {
      const offerCode = offerCodes.getOfferCodeByName('OFR004');
      expect(offerCode).toBeUndefined();
    });
  });
  
});
