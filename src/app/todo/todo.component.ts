import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  TaskList=[];



  add(listData:string){
    this.TaskList.push(listData);
  }

  constructor() { }
  ngOnInit(): void {

  }



}
