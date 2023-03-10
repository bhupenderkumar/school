import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { INote } from '../note.model';
import { NoteService } from '../service/note.service';

@Injectable({ providedIn: 'root' })
export class NoteRoutingResolveService implements Resolve<INote | null> {
  constructor(protected service: NoteService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<INote | null | never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((note: HttpResponse<INote>) => {
          if (note.body) {
            return of(note.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(null);
  }
}
