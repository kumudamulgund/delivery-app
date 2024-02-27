import { Package } from "./models/Package";

export const generateInvoice = (packages: Package[]): string => {
    return packages.reduce((invoice, currentPackage, currentIndex) => {
        const packageInvoice = `${currentPackage.id} ${currentPackage.discount} ${currentPackage.deliveryCost} ${currentPackage.eta}`;
        if(currentIndex === 0) {
            return `${packageInvoice} \n`;
        } else {
            return `${invoice}${packageInvoice} \n`  
        }
    },'');
}