import { Survey } from "./survey";

export class Report {
    count: number;
    potentialCustomers: Survey[];
    notPotentialCustomers: Survey[];
    
    constructor() {
        this.potentialCustomers = [];
        this.notPotentialCustomers = [];
    }

    total(): number {
        return this.potentialCustomers.length + this.notPotentialCustomers.length;
    }    
}