import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Survey } from "src/app/models/survey";
import { SurveysService } from "./surveys.service";

@Injectable()
export class GetSurveyResolver implements Resolve<Observable<Survey>> {

    constructor(
        private service: SurveysService
    ) { }

    resolve(
        route: ActivatedRouteSnapshot
      ): Observable<Survey> {
        return this.service.getById(route.paramMap.get('id'));
    }
}
