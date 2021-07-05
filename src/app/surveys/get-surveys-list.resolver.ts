import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Survey } from "src/app/models/survey";
import { SurveysService } from "./surveys.service";

@Injectable()
export class GetSurveysListResolver implements Resolve<Observable<Survey[]>> {

    constructor(
        private service: SurveysService
    ) { }

    resolve() {
        return this.service.getSurveys();
    }
}
