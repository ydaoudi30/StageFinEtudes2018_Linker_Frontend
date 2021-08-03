import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import { AccountService } from '../../services/account.service';
import { MessageService } from '../../../../node_modules/primeng/components/common/messageservice';
import { AccountDetails } from '../../models/account';
import { DOCUMENT } from '../../../../node_modules/@angular/platform-browser';
import { AppConfig } from '../../app-config';
import { ConnectedState } from '../../redux/states/connected.state';
import { Store } from '../../../../node_modules/@ngrx/store';

@Component({
    selector: 'app-sign-up-commercial',
    templateUrl: './sign-up-commercial.component.html',
    styleUrls: ['./sign-up-commercial.component.css']
})
export class SignUpCommercialComponent implements OnInit {
    private appConfig = new AppConfig();
    form: FormGroup;

    constructor(@Inject(DOCUMENT) private document: any, private formBuilder: FormBuilder, private accountService: AccountService, private messageService: MessageService) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, Validators.required],
            firstName: [null, Validators.required],
            lastName: [null, Validators.required],
            phone: [null, Validators.required],
            company: [null, Validators.required]
        });
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
            console.log(accoutDetails);
            this.accountService.createCommercialAccount(accoutDetails).subscribe(
                (response) => {
                    console.log(response);
                    this.document.location.href = this.appConfig.commercialUrl;
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
