import  { Command } from 'commander';
import { Vehicle } from './interfaces';
 import { Package } from './models/Package';
import { OfferCodeManager } from './OfferCodeManager';
import { Order } from './models/Order';

const parseInput = (input: string[]): Order => {
    const [baseDeliveryCost, numberOfPackages, ...rest] = input.map((item) => item.split(' '));
    
    const packages: Package[] = [];
    for (let i = 0; i < Number(numberOfPackages); i++) {
      const [idArr, weightArr, distanceArr, offerCodeArr] = rest.splice(0, 4); 
      const id = idArr && idArr.length > 0 ? idArr[0] : '';
      const weight = weightArr && weightArr.length > 0 ? Number(weightArr[0]) : 0;
      const distance = distanceArr && distanceArr.length > 0 ? Number(distanceArr[0]) : 0;
      const offerCode = offerCodeArr && offerCodeArr.length > 0 ? offerCodeArr[0] : '';
      try {
        const pkg = new Package(id, weight, distance, offerCode);
        packages.push(pkg);
      } catch (error:any) {
        throw new Error (`Error on ${i}th package input: ${error.message}`);
      }
  }

  
  const [count, maxSpeed, maxWeight] = rest.splice(0, 3);
  const vehicles: Vehicle = { count: Number(count), maxSpeed: Number(maxSpeed), maxWeight: Number(maxWeight) };
  
  const order = new Order(Number(baseDeliveryCost), packages, vehicles);
  return order;
};

const main = (input: string[]) => {
  OfferCodeManager.initialiseOffercodes();
  try {
    const order:Order = parseInput(input);
    order.printInvoice();
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