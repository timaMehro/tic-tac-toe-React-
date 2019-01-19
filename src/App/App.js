import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import {Game} from '../Game/Game';
import {Board} from '../Game/Board';


class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        return (
            
                <div >



 <header class="masthead d-flex">
      <div class="container text-center my-auto">  
         <div className="col-sm-12 ">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <Route exact path="/" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                 <Route path="/Game" component={Game} />
                                 <Route path="/Board" component={Board} />
                            </div>
                        </Router>
                    </div>
      </div>
      <div class="overlay"></div>
    </header>







                   
                </div>
            
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 

 