
import { authHeader } from '../_helpers';
export const gameService = {
  
    postGame ,
    handleResponse ,
    logout ,
    updateGame

   
};




function postGame(game) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(game)
    };

    return fetch(`https://uk5iapwoil.execute-api.ap-southeast-2.amazonaws.com/techtest/games`, requestOptions)
    .then(handleResponse)
    .then(game => {
            // login successful if there's a jwt token in the response

            if (game.id) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('game', JSON.stringify(game)); 

            }

            return game;
               
        })
    
}




function updateGame(update) {
    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(update)
    };

    return fetch(`https://uk5iapwoil.execute-api.ap-southeast-2.amazonaws.com/techtest/games`, requestOptions).then(handleResponse);
  
    
}





function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}


function logout() {
    // remove user from local storage to log user out
   localStorage.removeItem('user');
}