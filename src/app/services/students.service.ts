import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { students } from '../core/api/students';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  constructor(private http:HttpClient) { }
  baseUrl = "http://localhost:3000"

  getAllStudent(){
    return this.http.post(this.baseUrl +  students.getAllStudent, {});
  }

  getStudentById(data:any) {
    return this.http.post(this.baseUrl + students.getStudentById, data);
  }

  addStudent(data:any){
    return this.http.post(this.baseUrl + students.addStudent, data);
  }

  updateStudent(data: any) {
    return this.http.post(this.baseUrl + students.updateStudent, data);
  }

  deleteStudent(data: any) {
    return this.http.post(this.baseUrl + students.deleteStudent, data);
  }



}
