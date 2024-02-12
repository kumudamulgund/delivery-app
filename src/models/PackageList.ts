import { Package } from "./Package";

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

    insertPackage(pkg:Package) {
        const newPkgNode = new PackageNode(pkg);
        if(!this.head) {
            this.head = newPkgNode;
            this.size++;
            return;
        }
        let current:PackageNode | null = this.head;
        let prev: PackageNode | null = null;
        while (current && (current.value.weight > pkg.weight || 
            (current.value.weight === pkg.weight && current.value.distance < pkg.distance)
        )) {
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

    generateShipmentBatches (weightLimit:number):Package[][] {
        const shipmentLineups: Package[][] = [];
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
            shipmentLineups.push(currentLineup);
            currentLineup = [];
            currentPackageNode = currentPackageNode.next;
        }
        return shipmentLineups;
    }

    
    search(weight: number): Package | null {
        if (!this.head) {
            return null;
        }
        if(!this.head.next) {
            return this.head.value;
        }
        let current: PackageNode | null = this.head;
        let closestMatch: Package | null = null;

        while (current) {
            if(!current) {
                break;
            }
            if (!current.value.isPickedForShipment && current.value.weight <= weight) {
                if (!closestMatch || current.value.weight > closestMatch.weight) {
                    closestMatch = current.value;
                } else if (current.value.weight === closestMatch.weight && current.value.distance < closestMatch.distance) {
                    closestMatch = current.value;
                }
            }
            current = current.next;
        }
        return closestMatch;
    }
}