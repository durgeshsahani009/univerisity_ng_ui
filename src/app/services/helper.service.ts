import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class HelperService {
  constructor() { }

alert(){
  Swal.fire({
    title: 'Success!',
    text: 'Student added successfully.',
    icon: 'success',
    confirmButtonText: 'OK'
  });
}

  confirm(msg:any, subMsg?:any){
   return  Swal.fire({
      title: msg,
      text: subMsg,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }) 
  }

errorMsg(){
  Swal.fire({
    title: 'Error!',
    text: 'Something went wrong.',
    icon: 'error',
    confirmButtonText: 'Retry'
  });
}

}
