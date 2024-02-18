import { PackageList } from '../src/models/PackageList';
import { Package } from '../src/models/Package';
import { Shipment } from '../src/models/Shipment';

describe('PackageList class', () => {
    describe('generateBatch', () => {
        it('should generate a batch of packages within the weight limit', () => {
        const packageList = new PackageList();
        packageList.insertPackage(new Package('1', 10, 100, 'NA'));
        packageList.insertPackage(new Package('2', 20, 200, 'OFR001'));
        packageList.insertPackage(new Package('3', 30, 100, 'OFR002'));
        const batch = packageList['generateBatch'](40, [], packageList.head);
        expect(batch).toHaveLength(2);
        expect(batch.map(pkg => pkg.id)).toEqual(['3', '1']);
        });

        it('should stop generating batch if weight limit is reached', () => {
        const packageList = new PackageList();
        packageList.insertPackage(new Package('2', 20, 200, 'OFR001'));
        packageList.insertPackage(new Package('3', 30, 100, 'OFR002'));
        const batch = packageList['generateBatch'](30, [], packageList.head);
        expect(batch).toHaveLength(1);
        expect(batch[0].id).toBe('3');
        });

        it('should skip packages that have already been picked for shipment', () => {
        const packageList = new PackageList();
        const pkg = new Package('1', 10, 100, 'OFR001');
        pkg.isPickedForShipment = true;
        packageList.insertPackage(pkg);
        packageList.insertPackage(new Package('2', 20, 200, 'OFR001'));

        const batch = packageList['generateBatch'](30, [], packageList.head);
        expect(batch).toHaveLength(1);
        expect(batch[0].id).toBe('2');
        });
    });

    describe('generateShipments', () => {
        it('should generate shipments based on the weight limit', () => {

            const packageList = new PackageList();

            packageList.insertPackage(new Package('1', 10, 100, 'OFR001'));
            packageList.insertPackage(new Package('2', 20, 200, 'OFR002'));
            packageList.insertPackage(new Package('3', 30, 300, 'OFR002'));
            const shipments = packageList.generateShipments(40);

            expect(shipments).toHaveLength(2);
            expect(shipments[0].packages.map(pkg => pkg.id)).toEqual(['3', '1']);
            expect(shipments[1].packages.map(pkg => pkg.id)).toEqual(['2']);
        });

    });

});