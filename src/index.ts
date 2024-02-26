import { Package } from './models/Package';
import { OfferCodes } from './models/OfferCodes';
import { Order } from './models/Order';
import { PackageList } from './models/PackageList';
import { DeliveryPartner } from './models/DeliveryPartner';
import { DELIVERY_PARTNER_ID_PREFIX } from './models/config';
import { Shipment } from './models/Shipment';

const generateDeliveryPartners = (noOfPartners:number, maxSpeed:number):DeliveryPartner[] => {
  const deliveryPartners:DeliveryPartner[] = [] 
  let currentPartnerNo = 0
  while(currentPartnerNo < noOfPartners) {
    deliveryPartners.push(new DeliveryPartner(`${DELIVERY_PARTNER_ID_PREFIX}${noOfPartners+1}`, maxSpeed))
    currentPartnerNo++;
  }
  return deliveryPartners;
}

const createPackagesAndShipments = (input: any[], numberOfPackages: number, vehicleMaxWeight: number, offerCodes:OfferCodes):{packages:Map<string, Package>, shipments:Shipment[]} => {
  let packageList = new PackageList();
  const packages = new Map<string, Package>();

  if(input.length/4 !== numberOfPackages) {
    throw new Error(`Invalid package input. Missing package details`);
  }

  for (let i = 0; i < Number(numberOfPackages); i++) {
    const [id, weightStr, distanceStr, offerCode] = input.splice(0, 4);
    try {
      if (id === '') {
          throw new Error(`Invalid or empty package id for package:${i + 1}`);
      }
      if ([...packages.keys()].includes(id)) {
          throw new Error(`Package id ${id} already exists.`);
      }
      const weight = parseFloat(weightStr);
      if (weight <= 0 || weight > vehicleMaxWeight) {
          throw new Error(`Invalid weight: ${weight}. Weight must be greater than 0 and less than or equal to max vehicle weight.`);
      }
      const distance = parseFloat(distanceStr);
      if (distance <= 0) {
        throw new Error(`Invalid distance: ${distance}. Distance must be greater than 0.`);
      }
      if (offerCode === '') {
          throw new Error(`Invalid or empty offercode for package:${i + 1}`);
      }
      const pkg = new Package(id, weight, distance, offerCodes.getOfferCodeByName(offerCode));
      packages.set(pkg.id, pkg);
      packageList.insertPackage(pkg);
    } catch (error: any) {
        throw new Error(`Error on ${i}th package input: ${error.message}`);
    }
  }
  const shipments = packageList.generateShipments(Number(vehicleMaxWeight));
  return {
      packages: packages,
      shipments: shipments
  };
};

const parseInput = (input: string[], offerCodes:OfferCodes): Order => {
  try {
    const [baseDeliveryCostStr, numberOfPackagesStr, ...rest] = input.map((item) => item.split(' ')[0]);
    const baseDeliveryCost = parseFloat(baseDeliveryCostStr)
    if(isNaN(baseDeliveryCost)) {
      throw new Error("Invalid baseDelivery cost. Must be a number");
    }
    const numberOfPackages = parseInt(numberOfPackagesStr);
    if(isNaN(numberOfPackages) || numberOfPackages <= 0) {
      throw new Error("Invalid number of packages. Must be a number greater than zero");
    }
    const [countStr, maxSpeedStr, maxWeightStr] = rest.splice(-3);  
    const count = parseInt(countStr)
    if(isNaN(count) || count <= 0) {
      throw new Error("Invalid number of vehicles. Must be a number greater than zero");
    }
    const maxSpeed = parseFloat(maxSpeedStr);
    if(isNaN(maxSpeed) || maxSpeed <= 0) {
      throw new Error("Invalid number for max speed. Must be a number greater than zero");
    }
    const maxWeight = parseFloat(maxWeightStr);
    if(isNaN(maxWeight) || maxWeight <= 0) {
      throw new Error("Invalid number for max weight. Must be a number greater than zero");
    }
    const { packages, shipments} = createPackagesAndShipments(rest, numberOfPackages, maxWeight, offerCodes); 
    const deliveryPartners:DeliveryPartner[] = generateDeliveryPartners(count, maxSpeed);
    const order = new Order(baseDeliveryCost, packages, shipments, deliveryPartners);
    return order;
  } catch(error:any) {
    throw new Error(error.message);
  }
};

const main = (input: string[]) => {
  try {
    const offerCodes = new OfferCodes();
    const order = parseInput(input, offerCodes);
    order.printDeliveryCostAndETA();
  } catch (error:any) {
    console.log(error.message);
  }

  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  readline.question('Enter next set of input: ', (nextInput:string) => {
      main(nextInput.split(' '));
      readline.close();
  });
}

const initialInput = process.argv.slice(2);
main(initialInput);