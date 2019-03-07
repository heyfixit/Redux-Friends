import axios from 'axios';

export const FETCH_FRIENDS = 'FETCH_FRIENDS';
export const FETCH_FRIENDS_SUCCESS = 'FETCH_FRIENDS_SUCCESS';
export const REQUEST_ERROR = 'REQUEST_ERROR';
export const SAVE_FRIEND = 'SAVE_FRIEND';
export const SAVE_FRIEND_SUCCESS = 'SAVE_FRIEND_SUCCESS';
export const UPDATE_FRIEND = 'UPDATE_FRIEND';
export const UPDATE_FRIEND_SUCCESS = 'UPDATE_FRIEND_SUCCESS';
export const DELETE_FRIEND = 'DELETE_FRIEND';
export const DELETE_FRIEND_SUCCESS = 'DELETE_FRIEND_SUCCESS';
export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const login = credentials => dispatch => {
  dispatch({ type: LOGIN });
  return axios
    .post('http://localhost:5000/api/login', credentials)
    .then(res => {
      console.log(res);
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.payload });
    });
};

export const fetchFriends = () => (dispatch, getState) => {
  dispatch({ type: FETCH_FRIENDS });
  return axios
    .get('http://localhost:5000/api/friends', {
      headers: { authorization: getState().friends.token }
    })
    .then(({ data }) =>
      dispatch({ type: FETCH_FRIENDS_SUCCESS, payload: data })
    )
    .catch(err => dispatch({ type: REQUEST_ERROR, payload: err }));
};

export const saveFriend = friend => (dispatch, getState) => {
  dispatch({ type: SAVE_FRIEND });
  return axios
    .post('http://localhost:5000/api/friends', friend, {
      headers: { authorization: getState().friends.token }
    })
    .then(({ data }) => dispatch({ type: SAVE_FRIEND_SUCCESS, payload: data }))
    .catch(err => dispatch({ type: REQUEST_ERROR, payload: err }));
};

export const updateFriend = friend => dispatch => {
  dispatch({ type: UPDATE_FRIEND });
  return axios
    .put(`http://localhost:5000/friends/${friend.id}`, friend)
    .then(({ data }) =>
      dispatch({ type: UPDATE_FRIEND_SUCCESS, payload: data })
    )
    .catch(err => dispatch({ type: REQUEST_ERROR, payload: err }));
};

export const deleteFriend = friend => dispatch => {
  dispatch({ type: DELETE_FRIEND });
  return axios
    .delete(`http://localhost:5000/friends/${friend.id}`)
    .then(({ data }) =>
      dispatch({ type: DELETE_FRIEND_SUCCESS, payload: data })
    )
    .catch(err => dispatch({ type: REQUEST_ERROR, payload: err }));
};
