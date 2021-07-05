import { Injectable } from "@angular/core";
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Survey } from "../models/survey";
import { SurveysService } from './surveys.service';

@Injectable()
export class GetNewSurveyResolver implements Resolve<Observable<Survey>> {

    constructor(
        private service: SurveysService
    ) { }

    resolve(): Observable<Survey> {
        return this.service.getNewSurvey();
    }
}
