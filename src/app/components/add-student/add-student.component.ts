import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { StudentsService } from '../../services/students.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.sass'
})
export class AddStudentComponent {
  myform: any = this.initform()
  isEditMode:boolean=false;
  editableIds:any;
  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private fb: FormBuilder, 
    private helper:HelperService,
    private studentServices:StudentsService) {
      this.route.queryParams.subscribe((res:any)=>{
        if(res.id){
          this.editableIds = res["id"];
          this.isEditMode=true;
          this.getStudentById(res.id);
        } else this.isEditMode = false;
      })
     }

  submit(data: any) {
    let msg:any = 'Do you want to add new student?'
    if (this.isEditMode) msg = 'Do you want to update student?'
    this.helper.confirm(msg).then((res: any) => {
      if (res.isConfirmed) {
    if (this.isEditMode) this.updateStudent(data);
    else this.addStudent(data);
      }
    })
  
  }

  addStudent(data:any){   
    this.studentServices.addStudent(data).subscribe({
      next: (res: any) => {
        this.router.navigate(["/student-list"]);
      }
    })
  }

  updateStudent(data:any){
    data["id"] = this.editableIds;
    this.studentServices.updateStudent(data).subscribe({
      next: (res: any) => {
        this.router.navigate(["/student-list"]);
      }
    })
  }


studentDetails:any={}
  getStudentById(ids:any){
      this.studentServices.getStudentById({id:ids}).subscribe({
        next:(res:any)=>{
          if(res["status"]==="success"){
            let data = res["data"];
            this.myform.patchValue({
              name:data.name,
              age:data.age,
              program:data.program
            })
          }
        },
        error:(err:any)=> console.log(err)
      })
  }

  reset(){
    if(this.isEditMode){
      this.router.navigate(["student-list"])
    }else{
      this.myform.patchValue({
        name:"",
        age:null,
        program:""
      })
    }
  }

  initform() {
    return this.fb.group({
      name: [""],
      age: [],
      program: [""]
    })
  }

}
