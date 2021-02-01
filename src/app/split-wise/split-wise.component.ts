import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { title } from 'process';

@Component({
  selector: 'app-split-wise',
  templateUrl: './split-wise.component.html',
  styleUrls: ['./split-wise.component.scss']
})
export class SplitWiseComponent implements OnInit {

  transactionList:any[]=[];
  userList:string[]=[];
  useramount:number[]=[];

  displayForm:boolean=false;
  displayUnequalForm=false;

  displaySave:boolean=true;
  displayUpdate:boolean=false;

  discription:string;
  amount:number;
  invalidForm:boolean=true;
  payer:string;
  lenter:string;

  summaryList:any[]=[];
  currentIndex:number;

  oldLenterIndex:number;

  constructor() { }

  ngOnInit(): void {
  }
  emptySummaryList(){
    var i:number;
    for(i=0;i<this.summaryList.length;i++){
      this.summaryList[i].paid=0;
      this.summaryList[i].owes=0;
      this.summaryList[i].toGetBack=0;
    }
  }
  updateSummaryList(){
    var i:number;
    this.emptySummaryList();
    for(i=0;i<this.transactionList.length;i++){
      var payerIndex= this.userindex(this.transactionList[i].payerVar);
      this.summaryList[payerIndex].paid+=this.transactionList[i].titleamount;
      var lenterIndividual: string[]=this.transactionList[i].lenterVar.split(',');
      var j:number;
      this.summaryList[payerIndex].toGetBack+=this.transactionList[i].titleamount-(this.transactionList[i].titleamount)/(lenterIndividual.length+1);
      for(j=0;j<lenterIndividual.length;j++){
        var lenterindex=this.userindex(lenterIndividual[j]);
        this.summaryList[lenterindex].owes+=(this.transactionList[i].titleamount)/(lenterIndividual.length+1);
      }


      //  var lenterindex=
    }
    console.log(this.transactionList),
      console.log(this.summaryList);
  }

  addUserifNotExist(variable:string){
    if(this.userindex(variable)==-1){
      this.userList.push(variable);      //ading user
      var Var:number=0;
      this.summaryList.push({             // adding user in user list simultaneously
        paid:Var,
        owes:Var,
        toGetBack:Var
      });
      // console.log(this.summaryList);
    this.useramount.push(0);
    }
  }

  userindex(variable:string): number{
    var i:number;
    for(i=0;i<this.userList.length;i++){

      if(this.userList[i]==variable){

        return i;
      }
    }
    return -1;

  }

  openForm(){
    this.displayForm=true;
  }

  openFormUnequal(){
    this.displayUnequalForm=true;
  }

  closeForm(){
    this.displayForm=false;
    this.displayUnequalForm=false;
    this.clearForm();

  }


  // addAmountPayer(index:number){
  //   var adding= this.useramount[index];
  //   console.log(adding);
  //   var amt=this.amount;
  //   this.useramount[index]= adding-amt/2;
  // }
  addAmountLenter(index:number,person:number){

    var adding:number= this.useramount[index];
    var amt=this.amount;

   this.useramount[index]= adding+amt/(person+1);

  }

  findIndex(lenterName:string):number{
    var i:number;
    for(i=0;i<this.userList.length;i++){
      if(this.userList[i]==lenterName)
      return i;
    }
  }
  clearForm(){
    this.discription="";
      this.amount=null;
      this.payer="";
      this.lenter="";
  }
  add(){
      this.transactionList.push({
         title:this.discription,
         titleamount:this.amount,
         payerVar:this.payer,
         lenterVar:this.lenter
      });
      this.invalidForm=true;

      this.addUserifNotExist(this.payer);
      var payerindex=this.userindex(this.payer);
      // console.log(payerindex);
      // this.addAmountPayer(payerindex);
      var i:number;
      var lenterIndividual: string[]=this.lenter.split(',');
      // console.log(lenterIndividual);
      for(i=0;i<lenterIndividual.length;i++){
        this.addUserifNotExist(lenterIndividual[i]);
        var lenterindex=this.userindex(lenterIndividual[i]);

      // this.addAmountLenter(lenterindex,this.lenterIndividual.length);
      }
      this.updateSummaryList();
      this.clearForm();
  }


  formValidation(){
    if(this.discription.length>=3 ){
      if(this.amount!=null && this.payer!=null && this.lenter!=null){
      this.invalidForm=false;
      }
  }
    else
    this.invalidForm=true;
  }

  clear(index:number){
    this.transactionList.splice(index,1);
    this.updateSummaryList();
  }

  edit(index:number){
    this.discription=this.transactionList[index].title,
      this.amount=this.transactionList[index].titleamount,
      this.payer=this.transactionList[index].payerVar,
      this.lenter=this.transactionList[index].lenterVar
      this.currentIndex=index;
      this.displayUpdate=true;
      this.displaySave=false;
      this.oldLenterIndex=this.findIndex(this.lenter);
      console
  }

  update(){


    this.transactionList[this.currentIndex].title=this.discription;
    this.transactionList[this.currentIndex].titleamount=this.amount;
    this.transactionList[this.currentIndex].payerVar=this.payer;
    this.transactionList[this.currentIndex].lenterVar=this.lenter;

    this.userList[this.currentIndex]=this.payer; //updating userlist
    this.userList[this.oldLenterIndex]=this.lenter;
    this.displayUpdate=false;
    this.displaySave=true;
    console.log(this.transactionList);
    this.updateSummaryList();
    this.clearForm();

  }





}
