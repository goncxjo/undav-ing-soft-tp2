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
        return this.totalPotentialCustomers() + this.totalNotPotentialCustomers()
    }

    totalPotentialCustomers(): number {
        return this.potentialCustomers.length;
    }

    totalNotPotentialCustomers(): number {
        return this.notPotentialCustomers.length;
    }
}