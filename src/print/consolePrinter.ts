import { Package } from "../models/Package";
import { Printable } from "./printable";

export class ConsolePrinter implements Printable {

    print(packages: Package[]): void {
        packages.forEach(pkg => {
            console.log(`${pkg.id} ${pkg.discount} ${pkg.deliveryCost} ${pkg.eta}`)
        });
    }
    
}