import { Package } from "./models/Package";

export interface Vehicle {
    count: number;
    maxSpeed: number;
    maxWeight: number;
}


export interface InputData {
    baseDeliveryCost: number;
    numberOfPackages: number;
    packages: Package[];
    vehicles: Vehicle;
}
  
