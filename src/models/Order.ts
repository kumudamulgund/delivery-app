import { DeliveryPartner } from "./DeliveryPartner";
import { Package } from "./Package";
import { Shipment } from "./Shipment";

export class Order {
    private _baseDeliveryCost:number;
    private _packages: Map<string, Package>;
    private _shipments: Shipment[];
    private _deliveryPartners: DeliveryPartner[];

    constructor(baseDeliveryCost:number, packages:Map<string, Package>, shipments:Shipment[], deliveryPartners:DeliveryPartner[]) {
        this._baseDeliveryCost = baseDeliveryCost;
        this._packages = packages;
        this._deliveryPartners = deliveryPartners;
        this._shipments = this.arrageShipmentsByPriority(shipments)
    }

    private arrageShipmentsByPriority(shipments:Shipment[]):Shipment[] {
        return shipments.sort((a,b) => b.weight - a.weight)
    }

    get packages():Package[] {
       return  Array.from(this._packages.values());
    }

    private calculateDeliveryCostsAndETA(packages: Package[], deliveryPartner:DeliveryPartner):void {
        packages.map((pkg) => {
            pkg.calculateDeliveryCost(this._baseDeliveryCost);
            pkg.eta = deliveryPartner.elapsedTime + deliveryPartner.arrivalTimeBy(pkg.distance);
            this._packages.set(pkg.id, pkg);
        })
    }

    private earliestAvailablePartner():number {
        const minElapsedTime = Math.min(...this._deliveryPartners.map(partner => partner.elapsedTime));
        const index = this._deliveryPartners.findIndex(partner => partner.elapsedTime === minElapsedTime);
        return index;
    }

    calculateShipmentCostAndETA():void {
        let currentShipment = 0;
        while (currentShipment < this._shipments.length) {
            const shipment = this._shipments[currentShipment];
            const availablePartnerIndex = this.earliestAvailablePartner();
            this.calculateDeliveryCostsAndETA(shipment.packages, this._deliveryPartners[availablePartnerIndex]);
            const maxDeliveryTime = this._deliveryPartners[availablePartnerIndex].arrivalTimeBy(shipment.distance);
            const totalDeliveryPartnerEngagedTime = maxDeliveryTime * 2;
            this._deliveryPartners[availablePartnerIndex].elapsedTime = totalDeliveryPartnerEngagedTime;
            currentShipment++;
        } 
    }


}