import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';


// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class AuthService {
    // Configure Auth0 lock
    lock = new Auth0Lock('1RKVElCxIXd2SXUrtFNVSplPqm10SOl5', 'zemarx.eu.auth0.com', {});

    userProfile: Object;

    constructor(private router: Router) {
        // Add callback for lock `authenticated` event
        this.lock.on('authenticated', (authResult: any) => {
            localStorage.setItem('id_token', authResult.idToken);

            this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
                if (error) {
                    alert(error);
                    return;
                }

                localStorage.setItem('profile', JSON.stringify(profile));
                this.userProfile = profile;
            });
        });
    }

    public login() {
        // Display the widget.
        this.lock.show();
    };

    public authenticated() {
        // Check if there's an unexpired JWT
        // This searches for an item in localStorage with key == 'id_token'
        return tokenNotExpired();
    };

    public logout() {
        // Remove token from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        this.userProfile = undefined;
        this.router.navigate(['/postlist']); // TODO: make it more slowly so user can apprehend what is happening
    };
}
