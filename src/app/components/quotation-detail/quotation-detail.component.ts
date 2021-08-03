import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { QuotationDetailService } from '../../services/quotation-detail.service';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { ActivatedRoute } from '@angular/router';
import { QuotationDetail } from '../../models/quotationDetail';
import { ProductDetail } from '../../models/productDetail';
import { DetailElement } from '../../models/detailElement';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { User } from '../../models/user';
import { LoginService } from '../../services/login.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { ScrollPanel } from 'primeng/scrollpanel';
import { Discussion } from '../../models/discussion';
import { Message } from '../../models/message';


@Component({
  selector: 'app-quotation-detail',
  templateUrl: './quotation-detail.component.html',
  styleUrls: ['./quotation-detail.component.css']
})
export class QuotationDetailComponent implements OnInit {


  loading: boolean;
  ref: string;
  quotationDetail: QuotationDetail;

  filled: boolean;

  discussion: Discussion;
  messageToSend: string;
  newDiscussion: Discussion;
  newMessages: Message[];
  messagesLength: number;
  showMessageSave: boolean;

  constructor(private detailService: QuotationDetailService, private route: ActivatedRoute, private router: Router, private loginService: LoginService, private messageService: MessageService) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.ref = params.get('reference')
      console.log(this.ref);
    });

    this.detailService.getDetail(this.ref).subscribe(
      (quoteDetail: QuotationDetail) => {

        if (!quoteDetail.quotationChecked) {
          this.router.navigate(['/quotation-list']);
          this.messageService.add({ severity: 'error', summary: 'Quotation Access Refused', detail: 'You are not authorized to access the quotation' });
        }
        else {
          this.quotationDetail = quoteDetail;

          this.messagesLength = this.quotationDetail.discussion.messages.length;
          this.filled = true;
          if (this.quotationDetail.discussion.messages.length == 0) {
            this.filled = false;
          }

          this.loading = false;
          console.log(this.quotationDetail);
        }
      },
      err => console.log(err),
      () => console.log('Request Complete'));

  }



  pushMessage() {
    if (this.messageToSend != undefined) {

      this.showMessageSave = true;

      var user = this.loginService.getAuthenticatedUser().sub;
      var jsonUser = JSON.parse(user);
      var sender;

      if (this.quotationDetail.discussion.customerEmail == jsonUser.user) {
        sender = this.quotationDetail.discussion.customerFullName;
      }
      else if (this.quotationDetail.discussion.commercialEmail == jsonUser.user) {
        sender = this.quotationDetail.discussion.commercialFullName;
      }

      this.newDiscussion = this.quotationDetail.discussion;
      this.newMessages = [];
      var newMessage = new Message(this.messageToSend, jsonUser.user, sender);
      this.newMessages.push(newMessage);
      console.log(this.newMessages);

      this.newDiscussion = new Discussion(this.quotationDetail.reference,
        this.quotationDetail.discussion.commercialEmail,
        this.quotationDetail.discussion.commercialFullName,
        this.quotationDetail.discussion.customerEmail,
        this.quotationDetail.discussion.customerFullName,
        this.newMessages);

      console.log(this.newDiscussion);

      this.detailService.addMessage(this.newDiscussion).subscribe(
        (conversation: Discussion) => {
          this.quotationDetail.discussion = conversation;
          console.log("this.quotationDetail");
          this.showMessageSave = false;
        }
      );

      this.messageToSend = '';

    } else {
      console.log('Enter your message !');
    }

  }


}
