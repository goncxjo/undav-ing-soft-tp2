import { Survey } from "./survey";

export class Report {
    count: number;
    potentialCustomers: Survey[];
    notPotentialCustomers: Survey[];
    potentialCustomersAlreadyBought: Survey[];
    
    constructor() {
        this.potentialCustomers = [];
        this.notPotentialCustomers = [];
        this.potentialCustomersAlreadyBought = [];
    }

    total(): number {
        return this.potentialCustomers.length + this.notPotentialCustomers.length;
    }    
}