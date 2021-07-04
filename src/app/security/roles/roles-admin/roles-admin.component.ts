import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/api/models/role';
import { RolesService } from 'src/app/api/services/roles.service';
import { NgbModalYesNoComponent } from 'src/app/shared/ngb-modal-yes-no/ngb-modal-yes-no.component';

@Component({
  selector: 'app-roles-admin',
  templateUrl: './roles-admin.component.html',
  styleUrls: ['./roles-admin.component.sass']
})
export class RolesAdminComponent implements OnInit {
  private subscription: Subscription;
  ENTITIES: Role[]
  // pagination
  entities: Role[]
  page = 1;
  pageSize = 5;
  collectionSize: number;

  constructor(
    private route: ActivatedRoute,
    private service: RolesService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.subscription = this.route.data.subscribe((data: { entity: Role[] }) => {
      this.ENTITIES = data.entity;
      this.collectionSize = this.ENTITIES.length;
      this.refreshEntities();
    })
  }

  get noData() {
    return this.ENTITIES.length === 0
  }

  refreshEntities() {
    this.entities = _
      .map(this.ENTITIES, (entity, i) => ({ id: i + 1, ...entity }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  deleteEntity(id) {
    const title = 'Eliminar';
    const question = `¿Desea eliminar el rol ${id}?`;
    this.confirm(title, question).then((ok: string) => {
      if(ok == 'yes') {
        this.service.delete(id)
        .then(() => this.onSuccess())
        .catch((msg) => this.onError(msg));
      }
    });
  }

  onSuccess() {
    this.toastr.success('Rol eliminado', 'Operación exitosa');
    // TODO: ver porque no funciona esto
    // this.refreshEntities();
    this.refresh();
  }

  onError(msg) {
    this.toastr.error(msg, 'Operación fallida');
  }

  confirm(title, question): Promise<any> {
    const modalRef = this.modalService.open(NgbModalYesNoComponent);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.question = question;
    return modalRef.result;
  }

  refresh(): void {
    window.location.reload();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
