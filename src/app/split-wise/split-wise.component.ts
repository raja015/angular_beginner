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


  displayForm:boolean=false;
  displayUnequalForm=false;

  displaySave:boolean=true;
  displayUpdate:boolean=false;

  discription:string;
  amount:number;
  invalidForm:boolean=true;
  payer:string;
  lenter:string;

  numberOfLenterUnequally:number=0;
  lentersUnequally: any[]=[];
  lenterAmountUnequally:number=0;

  summaryList:any[]=[];
  currentIndex:number;

  oldLenterIndex:number;

  constructor() { }

  ngOnInit(): void {

  }

  addUnequal(){
    this.addUserifNotExist(this.payer);

    if(this.lenter!=""){
      this.addUserifNotExist(this.lenter);
    }
    this.transactionList.push({
      title:this.discription,
      titleamount:this.amount,
      payerVar:this.payer,
      lenterVar:this.lentersUnequally
   });
   console.log(this.lentersUnequally);
   this.discription="";
   this.amount=0;
   this.lenter="";
   this.payer="";
   this.lentersUnequally=null;
   console.log(this.transactionList);

  this.updateSummaryListUnequally();
  console.log(this.summaryList);
  }


  clearLenterUnequally(index:number){
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
        if(this.lenter== this.userList[this.lentersUnequally[i].lenterindex] ){
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
    this.addUserifNotExist(this.lenter);
    var index= this.userindex(this.lenter);
    this.lentersUnequally.push({
      lenterIndex:index,
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
      var payerIndex= this.userindex(this.transactionList[i].payerVar);
      this.summaryList[payerIndex].paid+=this.transactionList[i].titleamount;
      // var lenterIndividuals: string[]=this.transactionList[i].lenterVar.split(',');
      var sum:number=0;
      var countNotZeroLenter=0;
      var j:number;
      for(j=0;j<this.transactionList[i].lenterVar.length;j++){
        sum+=this.transactionList[i].lenterVar[j].lenterAmount;
        if(this.transactionList[i].lenterVar[j].lenterAmount!=0){
          countNotZeroLenter++;
        }
      }
      var newSum=this.transactionList[i].titleamount - sum;

      this.summaryList[payerIndex].toGetBack+=newSum-(newSum)/(countNotZeroLenter+1);
      for(j=0;j<this.transactionList[i].lenterVar.length;j++){
        if(this.transactionList[i].lenterVar[j].lenterAmount==0){
        this.summaryList[this.transactionList[i].lenterVar[j].lenterIndex].owes+=(newSum)/(countNotZeroLenter+1);
        }
        else{
          this.summaryList[this.transactionList[i].lenterVar[j].lenterIndex].owes+=this.transactionList[i].lenterVar[j].lenterAmount;
        }
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
    this.onTransactionListModification()
    this.displayUpdate=false;
    this.displaySave=true;
    console.log(this.transactionList);
    this.updateSummaryList();
    this.clearForm();
    // this.currentIndex=-1;
    // this.oldLenterIndex=-1;
  }





}
