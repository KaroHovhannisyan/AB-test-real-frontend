import * as types from "./types";

const getUsers = () => ({
  type: types.GET_USERS,
});

const getUsersSuccess = (data) => ({
  type: types.GET_USERS_SUCCESS,
  payload: data ,
});

const getUsersError = (id) => ({
  type: types.GET_USERS_ERROR,
  payload: id,
});

const saveUsers = (data) => ({
  type: types.SAVE_USERS,
  payload: data
});

const saveUsersSuccess = (data) => ({
  type: types.SAVE_USERS_SUCCESS,
  payload: data ,
});

const saveUsersError = (id) => ({
  type: types.SAVE_USERS_ERROR,
  payload: id,
});

const deleteFromDB = (data) => ({
  type: types.DELETE_FROM_DB,
  payload: data
});

const deleteFromDBSuccess = (data) => ({
  type: types.DELETE_FROM_DB_SUCCESS,
  payload: data ,
});

const deleteFromDBError = (id) => ({
  type: types.DELETE_FROM_DB_ERROR,
  payload: id,
});

const saveAllUsers = (data) => ({
  type: types.SAVE_ALL_USERS,
  payload: data
});

const saveAllUsersSuccess = (data) => ({
  type: types.SAVE_ALL_USERS_SUCCESS,
  payload: data ,
});

const saveAllUsersError = (id) => ({
  type: types.SAVE_ALL_USERS_ERROR,
  payload: id,
});


const getCalculate = (data) => ({
  type: types.GET_CALCULATE,
  payload: data
});

const getCalculateSuccess = (data) => ({
  type: types.GET_CALCULATE_SUCCESS,
  payload: data ,
});

const getCalculateError = (id) => ({
  type: types.GET_CALCULATE_ERROR,
  payload: id,
});


const addUser = (data) => ({
  type: types.ADD_USER,
  payload: data ,
});

const deleteUser = (data) => ({
  type: types.DELETE_USER,
  payload: data ,
});

const deleteAllNewUsers = () => ({
  type: types.DELETE_ALL_USER,
});

const clearNewUsers = (id) => ({
  type: types.CLEAR_NEW_USERS,
  payload: id
});

export {
    getUsersError,
    getUsersSuccess,
    getUsers,

    addUser,
    deleteUser,
    deleteAllNewUsers,

    saveUsers,
    saveUsersSuccess,
    saveUsersError,

    saveAllUsers,
    saveAllUsersError,
    saveAllUsersSuccess,

    getCalculate,
    getCalculateSuccess,
    getCalculateError,

    deleteFromDB,
    deleteFromDBError,
    deleteFromDBSuccess,
    clearNewUsers
};
