import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) { }

  showSuccess(message: string, title: string, options?: IndividualConfig) {
      this.toastr.success(message, title, options)
  }
  showError(message: string, title: string, options?: IndividualConfig) {
      this.toastr.error(message, title, options)
  }
}
