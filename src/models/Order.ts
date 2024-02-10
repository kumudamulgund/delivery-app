import { Vehicle } from "../interfaces";
import { Package } from "./Package";

export class Order {
    private _baseDeliveryCost:number;
    private _packages: Package[];
    private _vehicles: Vehicle

    constructor(baseDeliveryCost:number, packages:Package[], vehicles:Vehicle) {
        this._baseDeliveryCost = baseDeliveryCost;
        this._packages = packages;
        this._vehicles = vehicles;
    }

    get baseDeliveryCost(): number {
        return this._baseDeliveryCost;
    }

    get packages(): Package[] {
        return this._packages;
    }

    get vehicles(): Vehicle {
        return this._vehicles;
    }

    private calculateDeliveryCosts():void {
        this._packages.map((pkg) => {
            pkg.calculateDeliveryCostAndDiscount(this._baseDeliveryCost);
        })
    }

    printInvoice():void {
        this.calculateDeliveryCosts();
        const invoice = this.packages.reduce((invoice, currentPackage, currentIndex) => {
            const packageInvoice =  currentPackage.printDeliveryCost();
            if(currentIndex === 0) {
                return `${packageInvoice} \n`;
            } else {
                return `${invoice}${packageInvoice} \n`  
            }
        },'')

        console.log(invoice);
    }
}