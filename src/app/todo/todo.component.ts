import { style } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Todo } from 'shared/todo.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  todo:Todo;


  TaskList:any[]=[];
  displayForm:boolean=false;
  displayUpdate:boolean=false;
  displaySave:boolean=true;
  invalidForm:boolean=true;
  task:string;
  taskDiscription:string;


  currentIndex=null;
  taskreflen:any;

  add(){
    this.TaskList.push({
      title:this.task,
      discription:this.taskDiscription
    });
    console.log(this.todo.title);
    this.task="";
    this.taskDiscription="";


  }

  formValidatiom(){
    console.log(this.task);
    console.log(this.invalidForm);
    if(this.task.length>=3){
      this.invalidForm=false;
    }
    else
    this.invalidForm=true;

    console.log(this.task);
    console.log(this.invalidForm);
  }

  clear(i:number){
    this.TaskList.splice(i,1);


  }

  edit(i:number){

    this.task=this.TaskList[i].title;
    this.taskDiscription=this.TaskList[i].discription;
    this.currentIndex=i;
    this.displayUpdate=true;
    this.displaySave=false;
  }

  update(){
    this.TaskList[this.currentIndex].title=this.task;
    this.TaskList[this.currentIndex].discription=this.taskDiscription;
    this.currentIndex=null;

    this.displaySave=true;
    this.displayUpdate=false;

    this.task="";
    this.taskDiscription=""
  }

  openForm(){
    this.displayForm=true;
  }

  closeForm(){
    this.displayForm=false;
  }


  constructor() { }
  ngOnInit(): void {
    this.todo= new Todo();
  }



}
