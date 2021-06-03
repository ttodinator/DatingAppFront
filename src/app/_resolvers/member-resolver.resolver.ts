import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Member } from '../_models/member';
import { MembersService } from '../_services/members.service';

@Injectable({
  providedIn: 'root'
})
export class MemberResolverResolver implements Resolve<Member> {
  constructor(private memberservice:MembersService){}

  resolve(route: ActivatedRouteSnapshot, state):Observable<Member> {
      return this.memberservice.getMember(route.paramMap.get('username'));
  }
}
