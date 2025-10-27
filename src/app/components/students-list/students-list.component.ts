import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.scss'
})
export class StudentsListComponent {

  constructor(
    private router: Router,
    private helper: HelperService,
    private studentServices: StudentsService) {
    this.fetchAll()
  }

  studentList: any = []
  fetchAll() {
    this.studentServices.getAllStudent().subscribe({
      next: (res: any) => {
        if (res["status"] === "success") {
          this.studentList = res["data"];
        }
      },
      error: (err: any) => console.log(err)
    })
  }

  edit(data: any) {
    this.helper.confirm("Do you want to edit student?").then((res: any) => {
      if (res.isConfirmed) {
        this.router.navigate(["/update-student"], { queryParams: { id: data._id } });
      }
    })
  }

  delete(data: any) {
    this.helper.confirm("Do you want to delete student?").then((res: any) => {
      if (res.isConfirmed) {
        let obj: any = { id: data._id }
        this.studentServices.deleteStudent(obj).subscribe({
          next: (res: any) => {
            if (res["status"] === "success") {
              this.fetchAll();
            }
          },
          error: (err: any) => console.log(err)
        })
      }
    })
  }
}
