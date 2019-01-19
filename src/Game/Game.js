import React,{Component} from 'react';
import { connect } from 'react-redux';
import { userActions } from '../_actions';
//import { Link } from 'react-router-dom';
import {Popup} from '../_helpers/popoUp';
import { gameActions } from '../_actions';



 class Game extends Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAll());
    }

    constructor(props) {
        super(props);
        this.state = {
          boxItem :Array(9).fill(null),
          player :"X",
          usertwo: '',
          user: '',
          showPopup: false,
          gameStatus: 'startgame',
          domain: 'timamehro',
          game: {
                domain: '',
                creatorUsername: '',
                opponentUsername: '',
                state:''
                }

         }

         this.onShowStart = this.onShowStart.bind(this);
         this.onBoxclick = this.onBoxclick.bind(this);
         this.togglePopup = this.togglePopup.bind(this);
        
         

    }

    togglePopup() {  
       const { game } = this.state;
       console.log(game);
       const { dispatch } = this.props;
       console.log(dispatch);
       dispatch(gameActions.postGame(game));
       
       this.setState({ showPopup: !this.state.showPopup});

    }


   onShowStart(usertwo) {
      this.setState({usertwo :usertwo});
      localStorage.setItem('userTwo', JSON.stringify(usertwo)); 
      const { user } = this.props;
      this.setState({
             game: {
                domain: 'timamehro',
                state:'startgame',
                opponentUsername: usertwo,
                creatorUsername:user.username
              }
       })
       this.setState({ showPopup: !this.state.showPopup});
   }




    onBoxclick(index){
      if (this.state.usertwo!=="" && !this.state.showPopup ){
        let panelContent=this.state.boxItem;
        let playerTurn=this.state.player ==="x"?"o":"x";

        if(this.state.boxItem[index]===null){
            panelContent[index]=playerTurn;
            this.setState({
                boxItem: panelContent ,
                player: playerTurn
            });
       }
     }
    }


 // <p> <Link to="/login">Logout</Link> </p>
    render(){
       
        const { users } = this.props;
        return (     
            <div >         
               <div className='showPopup'>
                      {this.state.showPopup ?<Popup text=''  closePopup={this.togglePopup.bind(this)}  /> : null }
                </div>

                <h1 class="mb-1">Getting start !!</h1>
                  <h3 class="mb-5">
                        <em>PLease select your opponent from below list :</em>
                </h3>
         
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                  <ul  className="classic">
                    {users.items.map((usertwo, index) =>
                        <li key={usertwo.id} >     
                           <h5  className="btn btn-link" 
                                onClick={(e) => 
                                this.onShowStart(usertwo.username)}  >
                                {usertwo.username}
                           </h5>                        
                        </li>
                    )}
                  </ul>
                }


             <div>
               
             </div>
            </div>
        );


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

const connectedGame = connect(mapStateToProps)(Game);
export { connectedGame as Game };