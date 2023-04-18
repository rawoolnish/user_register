// import { USER_LOGIN_REQUEST } from "../constants/userConstants"

import axios from "axios";
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../constants/userConstants";


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const { data } = await axios.post(`/api/user/login`, { email, password }, config);

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data, success: true });

        localStorage.setItem("UserInfo", JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL, success: false,
            payload: error.response && error.response.data.message
                ? error.response.data.message : error.message
        })
    }
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem("UserInfo");
    dispatch({ type: USER_LOGOUT });
};

export const updateUser = (user) => async (dispatch, getState) => {

    try {
        dispatch({ type: USER_UPDATE_REQUEST })

        const { userLogin: { UserInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${UserInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/user/userUpdate`, user, config)

        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem("UserInfo", JSON.stringify(data));

    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};