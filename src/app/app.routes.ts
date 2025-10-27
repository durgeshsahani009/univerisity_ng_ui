import { RouterModule, Routes } from '@angular/router';
import { StudentsListComponent } from './components/students-list/students-list.component';
import { AddStudentComponent } from './components/add-student/add-student.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: "", redirectTo:"/student-list", pathMatch:"full"},
  {path:"student-list", component:StudentsListComponent},
  {path:"student-list", component:StudentsListComponent},
  {path:"add-student", component:AddStudentComponent},
  {path: "update-student", component: AddStudentComponent }
];

