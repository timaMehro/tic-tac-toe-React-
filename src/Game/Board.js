import React,{Component} from 'react';
import { connect } from 'react-redux';
import { gameActions } from '../_actions/game.action';


let count=0;
class Board extends Component {

    componentDidMount() {
       let InitialGame = JSON.parse(localStorage.getItem('game'));
       let userTwo = JSON.parse(localStorage.getItem('userTwo'));
       this.setState({
         usertwo :userTwo ,
         update: {
             id:InitialGame.id ,
             domain:InitialGame.domain ,
             opponentUsername: InitialGame.opponentUsername,
             creatorUsername:InitialGame.creatorUsername, 
             state:''
         }
      })
    }
    componentWillMount() {
    if(this.setState.result===true){
      this.UpdateGameResult();

    }

    }

  constructor(props) {
    super(props);
    this.state = {
    boxItem :Array(9).fill(null),
    symbol :'X' ,
  
    user: '',
    draw:'',
    result:false,
    showPopup: false,
    update: {
         id :'',
         domain: 'timamehro',
         creatorUsername: '',
         opponentUsername: '',
         state:''
          }
      }  

    this.RestartGame = this.RestartGame.bind(this);
    this.onBoxclick = this.onBoxclick.bind(this);
    this.isArrayFull = this.isArrayFull.bind(this);   
    this.routeChange = this.routeChange.bind(this);
    this.UpdateGameResult = this.UpdateGameResult.bind(this);
    this.getIndex=this.getIndex.bind(this);
    

    
  }



  RestartGame() {
       this.setState({boxItem: Array(9).fill(null)}); 
       const { update } = this.state;

       if(update.state === undefined || update.state === null){
         alert('please click on the box for starting ')
       } 
       const { dispatch } = this.props;
       console.log(dispatch);

        if(count > 1) {         
         dispatch(gameActions.postGame(update))
           this.setState({
                  update:{ 
                      state: ''
                  },
                  result:false
             })
        }
        else {
         dispatch(gameActions.updateGame(update))
             this.setState({
                  update:{ 
                      state: ''
                  },
                  result:false
             })
       }

  }


UpdateGameResult(){

       const { update } = this.state;
       alert(update);
       const { dispatch } = this.props;
       dispatch(gameActions.updatetGame(update))

}



onBoxclick(index){
       if(this.state.update.state ==='') {
          if (this.state.usertwo!=="" ) {
            let panelContent = this.state.boxItem;
            let symbolTurn=this.state.symbol ==="x"?"o":"x";
            
            if(this.state.boxItem[index]===null ) {          
              this.getIndex();
              panelContent[index]=symbolTurn;
              this.setState({
                    boxItem: panelContent ,
                    symbol: symbolTurn
                });
           }
         }

          if(this.state.draw!=='' || this.isArrayFull(this.state.boxItem) ) {
              alert('Oooops ! draw');
              this.setState({
                  update:{ 
                      state: 'draw' ,
                      domain: this.state.update.domain,
                      creatorUsername:this.state.update.creatorUsername,
                      opponentUsername:this.state.update.opponentUsername,
                  },
                  result:true                  
              })
               count=count+1;
          }

      }
   
  }


  isArrayFull( arr ) {
    for ( var i = 0, l = arr.length; i < l; i++ ) {
      if ( 'undefined' == typeof arr[i] || null === arr[i] ) {
        return false
      }
    }
    return true;
  }

  getIndex(){
    let winArray=[
       ['0','1','2'],
       ['3','4','5'],
       ['6','7','8'],
       ['0','3','6'],
       ['1','4','7'],
       ['2','5','8'],
       ['0','4','8'],
       ['2','4','6'],
    ]

    for(var i = 0; i < winArray.length; i++) {
      const [a,b,c]=winArray[i];

      if ( this.state.boxItem[a] && this.state.boxItem[a] === 'x'  && 
          this.state.boxItem[b]  === 'x'  && 
          this.state.boxItem[c]  === 'x') {
          alert(`PLAYER X IS WIN `);
        
          this.setState({
              update:{
                 state:'creatorUserWin' ,
                  domain: this.state.update.domain,
                  creatorUsername:this.state.update.creatorUsername,
                  opponentUsername:this.state.update.opponentUsername,
              },
              result:true,                         
          })
          count=count+1;
              
  
      }
      else if ( this.state.boxItem[a] && this.state.boxItem[a] === 'o' && 
                this.state.boxItem[b] === 'o' &&
                this.state.boxItem[c] === 'o') {
                alert(`PLAYER O IS WIN `);
                this.setState({
                    update:{
                       state:'opponentUserWin',
                       domain: this.state.update.domain,
                       creatorUsername:this.state.update.creatorUsername,
                       opponentUsername:this.state.update.opponentUsername,
                    },
                    result:true ,
                                        
               })
               count=count+1;
             
           }    
 
    };

  }

 routeChange(){
    let path = `/game`;
    this.props.history.push(path);





    }
 

  render(){

    const { user  } = this.props;
    const Boxes=this.state.boxItem.map((item, index) =>
                   <div 
                     className='case'
                     key={index} 
                     onClick={()=> this.onBoxclick(index)}>
                      {item} 
                    </div>
                )
    return (
        <div>
          <span className='Name '> PlayerX:</span> <span className='value marginten'>{user.username}</span>
          <span className='Name marginten'>PlayerO: </span> <span className='value '>{this.state.usertwo}</span>
          <div className="container">      
              <div className="mainCase">
                 {Boxes}             
            </div>
          </div>

          <button className="btn btn-primary marginten"  onClick={()=> this.RestartGame()}>AGAIN</button>
          <button className="btn btn-primary" onClick={()=> this.routeChange()}>FINISH</button>
          
        </div>   
    
    )
   }
 }

function mapStateToProps(state) {
      const { users, authentication } = state;
      const { user } = authentication;
      return {
          user,
          users
      };
  }

const connectedBoard = connect(mapStateToProps)(Board);
export { connectedBoard as Board };