import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    
    private modalData = new BehaviorSubject<any>(null);

    constructor() { }

    showModal(data: any, type: string): void {
        this.modalData.next({message: data.detail, type: type});
    }

    getModal(): Observable<any> {
        return this.modalData.asObservable();
    } 
}    