import { Package } from "./Package";
import { Shipment } from "./Shipment";

export class PackageNode {
    public value: Package;
    public next: PackageNode | null;

    constructor(value:Package) {
        this.value = value;
        this.next = null;
    }
}

export class PackageList {
    public head: PackageNode | null;
    public size: number;

    constructor() {
        this.head = null;
        this.size = 0;
    }
    
    private shouldMove(current:PackageNode, pkg:Package) {
        return (
            current.value.weight > pkg.weight ||
            (current.value.weight === pkg.weight && current.value.distance < pkg.distance)
        );
    }

    insertPackage(pkg:Package) {
        const newPkgNode = new PackageNode(pkg);
        if(!this.head) {
            this.head = newPkgNode;
            this.size++;
            return;
        }
        let current:PackageNode | null = this.head;
        let prev: PackageNode | null = null;
        while (current && this.shouldMove(current, pkg)) {
            prev = current;
            current = current.next;
        }

        if(!prev) {
            newPkgNode.next = this.head;
            this.head = newPkgNode;
        } else {
            prev.next = newPkgNode;
            newPkgNode.next = current;
        }
        this.size++
    }

    private generateBatch (weightLimit:number, shipmentLineup:Package[], current:PackageNode | null):Package[] {
        if(!current) {
            return shipmentLineup;
        }
        while (current) {
            if(!current.value.isPickedForShipment && current.value.weight <= weightLimit) {
                shipmentLineup.push(current.value);
                current.value.isPickedForShipment = true;
                weightLimit = weightLimit - current.value.weight;
                if(weightLimit > 0) {
                    current = current.next;
                } else {
                    break;
                }
            } else {
                current = current.next;
            }
        }
        return shipmentLineup;
    }

    generateShipments (weightLimit:number):Shipment[] {
        const shipments: Shipment[] = [];
        let currentLineup:Package[] = [];
        let currentPackageNode:PackageNode | null = this.head;
        while (currentPackageNode) {
            if(!currentPackageNode) {
                break;
            }
            currentLineup = this.generateBatch(weightLimit, currentLineup, currentPackageNode);
            if(currentLineup.length === 0) {
                break;
            }
            const shipment = new Shipment(currentLineup);
            shipments.push(shipment);
            currentLineup = [];
            currentPackageNode = currentPackageNode.next;
        }
        return shipments;
    }
}