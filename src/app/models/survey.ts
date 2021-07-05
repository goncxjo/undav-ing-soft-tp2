import { Vehicle } from "./vehicle";

export class Survey {

    constructor(rawSurvey: any) {
        if(rawSurvey) {
            this.id = rawSurvey.id || '';
            this.name = rawSurvey.name || '';
            this.surname = rawSurvey.surname || '';
            this.age = rawSurvey.age || '';
            this.phone = rawSurvey.phone || '';
            this.email = rawSurvey.email || '';
            this.otherPhone = rawSurvey.otherPhone || '';
            this.vehicles = rawSurvey.vehicles || [];
            this.createdDate = new Date(rawSurvey.createdDate || new Date());
            this.modifiedDate = new Date(rawSurvey.modifiedDate || new Date());
            this.alreadyBought = false;
        }
    }

    id: string;
    name: string;
    surname: string;
    age: number;
    phone: string;
    email: string;
    otherPhone: string;
    vehicles: [Vehicle];
    createdDate: Date;
    modifiedDate: Date;
    alreadyBought: boolean;

    hasVehicle(): boolean {
        return this.vehicles.length > 0;   
    }

    hasMotorcycle(): boolean {
        return this.vehicles.includes(Vehicle.Motorcycle);   
    }

    hasCar(): boolean {
        return this.vehicles.includes(Vehicle.Car);   
    }

    hasVan(): boolean {
        return this.vehicles.includes(Vehicle.Van);   
    }

    hasRequiredAge(): boolean {
        return 25 <= this.age && this.age <= 50;
    }

    isPotentialCustomer(): boolean {
        return this.hasVehicle() && this.hasRequiredAge();
    }
}