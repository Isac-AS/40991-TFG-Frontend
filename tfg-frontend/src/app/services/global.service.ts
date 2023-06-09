import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GlobalService {
    public pageName = new BehaviorSubject<any>({
        currentPageName: 'Página principal'
    });

    public loggedInfo = new BehaviorSubject<any>({
        isLoggedIn: false,
        username: '',
        role: '0',
        is_admin: false,
    });

    public darkThemeActive = new BehaviorSubject<any>({
        isDarkThemeActive: true,
    });

    public debug = new BehaviorSubject<boolean>(false);
}