import { Vehicle } from "./vehicle";

export class Survey {

    constructor(rawSurvey: any) {
        this.id = rawSurvey.id;
        this.name = rawSurvey.name;
        this.surname = rawSurvey.surname;
        this.age = rawSurvey.age;
        this.phone = rawSurvey.phone;
        this.email = rawSurvey.email;
        this.otherPhone = rawSurvey.otherPhone;
        this.vehicles = rawSurvey.vehicles;
        this.createdDate = rawSurvey.createdDate;
        this.modifiedDate = rawSurvey.modifiedDate;
    }

    id: 1;
    name: string;
    surname: string;
    age: number;
    phone: string;
    email: string;
    otherPhone: string;
    vehicles: [Vehicle];
    createdDate: Date;
    modifiedDate: Date;

    hasVehicle(): boolean {
        return this.vehicles.length > 0;   
    }

    hasRequiredAge(): boolean {
        return 25 <= this.age && this.age <= 50;
    }

    isPotentialCustomer(): boolean {
        return this.hasVehicle() && this.hasRequiredAge();
    }
}