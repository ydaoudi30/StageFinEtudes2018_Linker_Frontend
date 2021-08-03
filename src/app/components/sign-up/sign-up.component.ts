import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '../../../../node_modules/@angular/forms';
import { AccountService } from '../../services/account.service';
import { AccountDetails } from '../../models/account';
import { MessageService } from '../../../../node_modules/primeng/components/common/messageservice';
import { LoginService } from '../../services/login.service';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { ConnectedState } from '../../redux/states/connected.state';
import { Store } from '../../../../node_modules/@ngrx/store';
import * as connectAction from '../../redux/actions/connect.action';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

    form: FormGroup;

    display: boolean = false;
    guestEmail: string;
    fromCart: boolean = false;

    constructor(private storeConnect: Store<ConnectedState>, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private loginService: LoginService, private accountService: AccountService, private messageService: MessageService) { }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.fromCart = params.get('fromCart') == "true" ? true : false;
        });


        this.form = this.formBuilder.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, Validators.required],
            firstName: [null, Validators.required],
            lastName: [null, Validators.required],
            phone: [null, Validators.required],
            company: [null, Validators.required]
        });

        if (this.fromCart) {
            let user = this.loginService.getAuthenticatedUser();
            console.log(user);
            var jsonUser = JSON.parse(user.sub);
            this.guestEmail = jsonUser.user;
            console.log(jsonUser);
        }
    }


    signUp() {
        this.touchForm();

        if (this.form.valid) {
            console.log(this.form.value);
            let accoutDetails: AccountDetails = {
                credentials: {
                    email: this.form.value.email,
                    password: this.form.value.password,
                    roles: []
                },
                firstName: this.form.value.firstName,
                lastName: this.form.value.lastName,
                phone: this.form.value.phone,
                company: this.form.value.company
            }
            this.accountService.createCustomerAccount(accoutDetails).subscribe(
                (response) => {
                    if (this.fromCart) {
                        this.loginService.authenticateCustomer(accoutDetails.credentials.email, accoutDetails.credentials.password).subscribe(
                            response => {
                                if (response) {
                                    this.storeConnect.dispatch(new connectAction.ChangeState(true));
                                }
                            });
                        this.display = true;
                    } else {
                        this.router.navigate(['/']);
                    }
                },
                error => this.messageService.add({ severity: 'error', summary: 'User Already Exist', detail: 'User duplicated' })
            );
        }
    }

    get email() { return this.form.get('email'); }
    get password() { return this.form.get('password'); }
    get firstName() { return this.form.get('firstName'); }
    get lastName() { return this.form.get('lastName'); }
    get phone() { return this.form.get('phone'); }
    get company() { return this.form.get('company'); }

    touchForm() {
        this.form.controls['email'].markAsTouched();
        this.form.controls['password'].markAsTouched();
        this.form.controls['firstName'].markAsTouched();
        this.form.controls['lastName'].markAsTouched();
        this.form.controls['phone'].markAsTouched();
        this.form.controls['company'].markAsTouched();
    }
}
