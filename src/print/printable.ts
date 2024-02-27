import { Package } from "../models/Package";

export interface Printable {
    print(packages:Package[]):void;
}