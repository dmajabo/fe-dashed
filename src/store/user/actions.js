import {
  SET_USER,
  SET_USERS,
  SET_IS_PROCESS
} from "./actionTypes";

import { supabase } from "supabaseClient";

const actions = {
  setUser: data => ({
    type: SET_USER,
    payload: data,
  }),
  setUsers: data => ({
    type: SET_USERS,
    payload: data,
  }),
  setIsProcess: data => ({
    type: SET_IS_PROCESS,
    payload: data,
  })
}

export const getAppUser = () => (dispatch) => {

  const user = supabase.auth.user()

  if (user?.id) {

    supabase
      .from("users")
      .select("*")
      .eq("id", user?.id)
      .then(({ data, error, status }) => {
        if (status == 200) {
          if (data.length) dispatch(actions.setUser(data[0]))
        } else {
          if (error) console.log(error.message);
        }
      });
  }
};

export const getAllUsers = () => (dispatch) => {

  const user = supabase.auth.user()

  if (user?.id) {
    supabase
      .from("users")
      .select("*")
      .then(({ data, error, status }) => {
        if (status == 200) {
          if (data.length) dispatch(actions.setUsers(data.filter((u) => u.email != user.email)))
        } else {
          if (error) console.log(error.message);
        }
      });
  }
};

export const setAppUser = (user) => (dispatch) => {
  dispatch(actions.setUser(user))
};

export const updateUser = (data) => (dispatch) => {

  const user = supabase.auth.user()
  dispatch(actions.setIsProcess(true))

  supabase
    .from("users")
    .update(data)
    .match({ id: user?.id })
    .then(({ data, error, status }) => {
      dispatch(actions.setIsProcess(false))

      if (status == 200) {
      } else {
        if (error) console.log(error.message);
      }
    });
}