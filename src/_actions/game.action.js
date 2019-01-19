import { gameConstants } from '../_constants';
import { gameService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const gameActions = {
    postGame ,
    updateGame  
};


function postGame(game) {
   return dispatch => {
        dispatch(request(game));

        gameService.postGame(game)
            .then(
                game => { 
                    dispatch(success());
                    history.push('/Board');
                    dispatch(alertActions.success('post shod'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(game)      { return { type: gameConstants.REGISTER_REQUEST, game } }
    function success(game)      { return { type: gameConstants.REGISTER_SUCCESS, game } }
    function failure(error)     { return { type: gameConstants.REGISTER_FAILURE, error } }
}



function updateGame(update) {
   return dispatch => {
        dispatch(request(update));

        gameService.updateGame(update)
            .then(
                update => { 
                    dispatch(success());
                    history.push('/Board');
                    dispatch(alertActions.success('update shod'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(update)      { return { type: gameConstants.UPDATE_REQUEST, update } }
    function success(update)      { return { type: gameConstants.UPDATE_SUCCESS, update } }
    function failure(error)     { return { type: gameConstants.UPDATE_FAILURE, error } }
}