import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss']
})
export class SquareComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  title = 'tictactoe';
  tileChar=" ";
  tileData =[[this.tileChar,this.tileChar,this.tileChar],
             [this.tileChar,this.tileChar,this.tileChar],
             [this.tileChar,this.tileChar,this.tileChar]] ;

  current="O";
  player="player 1 turn";
  status="Status: playing";
  checked=false;


  toggleCurrent(){
    if(this.current=="O"){
      this.current="X";
      this.player="player 2 turn"
    }
    else{
    this.current="O";
    this.player="player 1 turn";
    }
  }


   check(){
    if(this.checkHorizontal() || this.checkVertical() || this.checkDiagonal()  ){
      console.log("Win");
      if(this.current=="O"){
        this.status="Status: player 2 Win";
        this.checked=true;
      }
      else{
      this.status="Status: player 1 Win";
      this.checked=true;
      }

    }

  }

  checkDiagonal(){
    if( this.tileData[0][0]!=this.tileChar &&
       this.tileData[0][0]==this.tileData[1][1] &&
        this.tileData[0][0]==this.tileData[2][2]){
      return true;
    }
    if( this.tileData[0][2]!=this.tileChar &&
      this.tileData[0][2]==this.tileData[1][1] &&
       this.tileData[0][2]==this.tileData[2][0]){
     return true;
   }

  }


  checkHorizontal(){
    if( this.tileData[0][0]!=this.tileChar&& this.tileData[0][0]==this.tileData[0][1] && this.tileData[0][1]==this.tileData[0][2]){
      return true;
    }
    if( this.tileData[1][0]!=this.tileChar && this.tileData[1][0]==this.tileData[1][1] && this.tileData[1][1]==this.tileData[1][2]){
      return true;
    }
    if( this.tileData[2][0]!=this.tileChar && this.tileData[2][0]==this.tileData[2][1] && this.tileData[2][1]==this.tileData[2][2]){
      return true;
    }
  }

  checkVertical(){
    if( this.tileData[0][0]!=this.tileChar && this.tileData[0][0]==this.tileData[1][0] && this.tileData[1][0]==this.tileData[2][0]){
      return true;
    }
    if( this.tileData[0][1]!=this.tileChar && this.tileData[0][1]==this.tileData[1][1] && this.tileData[1][1]==this.tileData[2][1]){
      return true;
    }
    if( this.tileData[0][2]!=this.tileChar && this.tileData[0][2]==this.tileData[1][2] && this.tileData[1][2]==this.tileData[2][2]){
      return true;
    }

  }


  tileClick(i:number , j:number){
    if(this.tileData[i][j]==this.tileChar){
    this.tileData[i][j]=this.current;
    this.toggleCurrent();
    this.check();
    }
  }

  reset(){
   var i: number;
    var j: number;
   for(i=0;i<3;i++){
    for(j=0;j<3;j++){
      this.tileData[i][j]=this.tileChar;
    }
   }
   this.current="O";
   this.status="Status: playing"
   this.checked=false;

  }

}
