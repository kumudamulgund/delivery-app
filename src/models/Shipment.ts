import { Package } from "./Package";

export class Shipment {
    private _packages:Package[];
    private _weight:number;
    private _distance:number;

    constructor(packages:Package[]) {
        this._packages = packages;
        this._weight = packages.reduce((weight, p) => weight + p.weight,0)
        this._distance = packages.reduce((acc, it) => Math.max(acc, it.distance), 0)
    }

    get packages():Package[] {
        return this._packages;
    }

    get weight() {
        return this._weight
    }

    get distance():number {
        return this._distance
    }
    
}