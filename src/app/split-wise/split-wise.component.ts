import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { UrlSegment } from '@angular/router';
import { title } from 'process';

@Component({
  selector: 'app-split-wise',
  templateUrl: './split-wise.component.html',
  styleUrls: ['./split-wise.component.scss']
})
export class SplitWiseComponent implements OnInit {

  transactionList:any[]=[];
  userList:string[]=[];
  groupList: string [] =[];

  displayForm:boolean=false;
  displayUnequalForm=false;

  displaySave:boolean=true;
  displayUpdate:boolean=false;

  individualGroupNameList:any[]=[];
  groupName:any;
  discription:string;
  amount:number;
  invalidForm:boolean=true;
  payer:any;
  lenter:string;

  DisplayGroupDetails:boolean=false;
  lentersUnequally: any[]=[];
  lenterAmountUnequally:number=0;

  summaryList:any[]=[];
  currentIndex:number;

  oldLenterIndex:number;

  constructor() { }

  ngOnInit(): void {

  }
  addGroupTransaction(variable:number){
    this.groupName=this.groupList[variable];

  }

  groupDetails(variable:number){
    this.DisplayGroupDetails=true;
    this.individualGroupNameList=[];

    for(var i=0;i< this.transactionList.length;i++){

        if(this.transactionList[i].groupNameVar==variable){

          this.individualGroupNameList.push(this.transactionList[i]);

        }




    }

  }

  updateUnequally(){
    this.displayUpdate=false;
      this.displaySave=true;
    if(this.lentersUnequally==null){
      alert("add Lenter First");
      return;
    }


    this.addUserifNotExist(this.payer);
    this.payer=this.userindex(this.payer);
    var i:number;
    for(i=0;i<this.lentersUnequally.length;i++){
      this.addUserifNotExist(this.lentersUnequally[i].lenterIndex);
      this.lentersUnequally[i].lenterIndex=this.userindex(this.lentersUnequally[i].lenterIndex);
    }


    this.transactionList[this.currentIndex].title=this.discription;
    this.transactionList[this.currentIndex].groupNameVar=this.groupIndex(this.groupName);
    this.transactionList[this.currentIndex].titleamount=this.amount;
    this.transactionList[this.currentIndex].payerVar=this.payer;
    this.transactionList[this.currentIndex].lenterVar=this.lentersUnequally;


    this.updateSummaryListUnequally();
    this.individualGroupNameList=[];
    this.clearForm();
  }

  addUnequalTransaction(){
    if(this.lenter!=""){
      alert("add Lenter First");
      return;
    }

    this.addGroupifNotExist(this.groupName);
    this.addUserifNotExist(this.payer);
    var i:number;
    for(i=0;i<this.lentersUnequally.length;i++){
      this.addUserifNotExist(this.lentersUnequally[i].lenterIndex);
      this.lentersUnequally[i].lenterIndex=this.userindex(this.lentersUnequally[i].lenterIndex);
    }
    // this.groupName=this.groupIndex(this.groupName);  // problem groupName number
    this.transactionList.push({
      title:this.discription,
      groupNameVar:this.groupIndex(this.groupName),
      titleamount:this.amount,
      payerVar:this.userindex(this.payer),
      lenterVar:this.lentersUnequally
   });

   this.groupName="";
   this.discription="";
   this.amount=0;
   this.lenter="";
   this.payer="";
   this.lentersUnequally=[];
   this.individualGroupNameList=[];


  this.updateSummaryListUnequally();



  }
  removeLenterUnequally(index:number){
    this.lentersUnequally.splice(index,1);
  }

  addLenterUnequally(){
    var i:number;
    if(this.lenter==null || this.lenter==""){
      alert("Lenter cannot be empty");
      return 0;
    }
    if(this.lentersUnequally.length>0){
      var sumLenterAmount=this.lenterAmountUnequally;
      for(i=0;i<this.lentersUnequally.length;i++){
        if(this.lenter== this.userList[this.lentersUnequally[i].lenterIndex] ){
          alert("cannot add double");
          return ;
         }

        sumLenterAmount+=this.lentersUnequally[i].lenterAmount;

         if(this.amount<sumLenterAmount){
           alert("amount should be grater or equal to total lenter amount");

           this.lenterAmountUnequally=0;
           return ;
         }
       }
      }
    // this.addUserifNotExist(this.lenter);
    // var index= this.userindex(this.lenter);
    this.lentersUnequally.push({
      lenterIndex:this.lenter,
      lenterAmount:this.lenterAmountUnequally
    });
    this.lenter="";
    this.lenterAmountUnequally=0;


  }
  resetSummaryList(){
    var i:number;
    for(i=0;i<this.summaryList.length;i++){
      this.summaryList[i].paid=0;
      this.summaryList[i].owes=0;
      this.summaryList[i].toGetBack=0;
    }
  }

  updateSummaryListUnequally(){
    var i:number;
    this.resetSummaryList();

    for(i=0;i<this.transactionList.length;i++){
      // var payerIndex= this.userindex(this.transactionList[i].payerVar);
      this.summaryList[this.transactionList[i].payerVar].paid+=this.transactionList[i].titleamount;
      // var lenterIndividuals: string[]=this.transactionList[i].lenterVar.split(',');
      var sum:number=0;
      var j:number;

      this.summaryList[this.transactionList[i].payerVar].toGetBack+=sum;
      for(j=0;j<this.transactionList[i].lenterVar.length;j++){
          this.summaryList[this.transactionList[i].lenterVar[j].lenterIndex].owes+=this.transactionList[i].lenterVar[j].lenterAmount;

    }
  }
}


  updateSummaryList(){
    var i:number;
    this.resetSummaryList();
    for(i=0;i<this.transactionList.length;i++){
      var payerIndex= this.userindex(this.transactionList[i].payerVar);
      this.summaryList[payerIndex].paid+=this.transactionList[i].titleamount;
      var lenterIndividuals: string[]=this.transactionList[i].lenterVar.split(',');
      var j:number;
      this.summaryList[payerIndex].toGetBack+=this.transactionList[i].titleamount-(this.transactionList[i].titleamount)/(lenterIndividuals.length+1);
      for(j=0;j<lenterIndividuals.length;j++){
        var lenterindex=this.userindex(lenterIndividuals[j]);
        this.summaryList[lenterindex].owes+=(this.transactionList[i].titleamount)/(lenterIndividuals.length+1);
      }
      //  var lenterindex=
    }

  }
  addGroupifNotExist(variable:string){
    if(this.groupIndex(variable)==-1){
      this.groupList.push(variable);
  }
}
  groupIndex(variable:string): number{
    var i:number;
    for(i=0;i<this.groupList.length;i++){

      if(this.groupList[i]==variable){

        return i;
      }
    }
    return -1;
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



  clearForm(){
    this.discription="";
      this.amount=null;
      this.payer="";
      this.lenter="";
      this.lentersUnequally=[];
      this.groupName="";
  }

  add(){
      this.transactionList.push({
         title:this.discription,
         titleamount:this.amount,
         payerVar:this.payer,
         lenterVar:this.lenter
      });
      this.invalidForm=true;

      this.onTransactionListModification();

      this.updateSummaryList();
      this.clearForm();


  }
  onTransactionListModification(){
    this.addUserifNotExist(this.payer);

      // console.log(payerindex);
      // this.addAmountPayer(payerindex);
      var i:number;
      var lenterIndividual: string[]=this.lenter.split(',');
      // console.log(lenterIndividual);
      for(i=0;i<lenterIndividual.length;i++){
        this.addUserifNotExist(lenterIndividual[i]);
        // var lenterindex=this.userindex(lenterIndividual[i]);

      // this.addAmountLenter(lenterindex,this.lenterIndividual.length);
      }
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
    this.updateSummaryListUnequally();

  }

  editUnequally(index:number){
    var NameList = [];
    this.groupName=this.groupList[this.transactionList[index].groupNameVar];
    this.discription=this.transactionList[index].title,
    this.amount=this.transactionList[index].titleamount,
    this.payer=this.userList[this.transactionList[index].payerVar],
    this.currentIndex=index;
    for(var i=0;i<this.transactionList[index].lenterVar.length;i++){
      NameList.push({lenterIndex:this.userList[this.transactionList[index].lenterVar[i].lenterIndex],
        lenterAmount: this.transactionList[index].lenterVar[i].lenterAmount
      });

    }
    this.groupName=this.groupList[index];
    this.lentersUnequally=NameList;

    this.displayUpdate=true;
      this.displaySave=false;
  }

  edit(index:number){
    this.discription=this.transactionList[index].title,
      this.amount=this.transactionList[index].titleamount,
      this.payer=this.transactionList[index].payerVar,
      this.lenter=this.transactionList[index].lenterVar
      this.currentIndex=index;
      this.displayUpdate=true;
      this.displaySave=false;
      this.oldLenterIndex=this.userindex(this.lenter);

  }

  update(){
    this.transactionList[this.currentIndex].title=this.discription;
    this.transactionList[this.currentIndex].titleamount=this.amount;
    this.transactionList[this.currentIndex].payerVar=this.payer;
    this.transactionList[this.currentIndex].lenterVar=this.lenter;

    // this.userList[this.currentIndex]=this.payer; //updating userlist
    // this.userList[this.oldLenterIndex]=this.lenter;
    this.onTransactionListModification();
    this.displayUpdate=false;
    this.displaySave=true;

    this.updateSummaryList();
    this.clearForm();
    // this.currentIndex=-1;
    // this.oldLenterIndex=-1;
  }

}
