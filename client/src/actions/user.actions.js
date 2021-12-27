import axios from "axios";
import cookie from "js-cookie";

export const GET_USER = "GET_USER";

export const UPLOAD_PICTURE = "UPLOAD_PICTURE";

export const UPDATE_BIO = "UPDATE_BIO";

export const FOLLOW_USER = "FOLLOW_USER";

export const UNFOLLOW_USER = "UNFOLLOW_USER";

export const LOGOUT = "LOGOUT";

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`, {withCredentials: true})
      .then((res) => {
        dispatch({
          type: GET_USER,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload` , data, {withCredentials: true})
      .then((res) => {
        return axios
          .get(`${process.env.REACT_APP_API_URL}api/user/${id}`, {withCredentials: true})
          .then((res) => {
            dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const updateBio = (userId, bio) => {
  return (dispatch) => {
    return axios
      .put(`${process.env.REACT_APP_API_URL}api/user/${userId}`, {
        bio: bio,
      }, {withCredentials: true})
      .then((res) => {
        dispatch({ type: UPDATE_BIO, payload: bio });
      })
      .catch((err) => console.log(err));
  };
};

export const followUser = (followerId, idToFollow) => {
  return (dispatch) => {
    return axios
      .patch(`${process.env.REACT_APP_API_URL}api/user/follow/${followerId}`, {
        idToFollow: idToFollow,
      }, {withCredentials: true})
      .then((res) => {
        dispatch({ type: FOLLOW_USER, payload: idToFollow });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const unfollowUser = (followerId, idToUnfollow) => {
  return (dispatch) => {
    return axios
      .patch(
        `${process.env.REACT_APP_API_URL}api/user/unfollow/${followerId}`,
        {
          idToUnfollow: idToUnfollow,
        },{withCredentials: true}
      )
      .then((res) => {
        dispatch({ type: UNFOLLOW_USER, payload: idToUnfollow });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
const removeCookie = (key) => {
  if (window != "undefined") {
    console.log("removing cookies...");
    try {
      cookie.remove(key, { expires: 1 });
    } catch (err) {
      console.log(err);
    }
  }
};

export const logout = () => {
  return (dispatch) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}api/user/logout`, {
        withCredentials: true,
      })
      .then((res) => {
        removeCookie("jwt");
        dispatch({ type: LOGOUT, payload: null });
      })
      .catch((err) => {});
  };
};
