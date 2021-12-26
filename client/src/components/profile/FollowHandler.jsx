import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../utils";
import { followUser, unfollowUser } from "../../actions/user.actions";
import { Button } from "@mui/material";

const FollowHandler = (props) => {
  const idToFollow = props.idToFollow;
  const userData = useSelector((state) => state.userReducer);
  const [isFollowed, setisFollowed] = useState(false);
  const dispatch = useDispatch();
  const handleFollow = () => {
    setisFollowed(false);
    dispatch(followUser(userData._id, idToFollow));
  };
  const handleUnfollow = () => {
    dispatch(unfollowUser(userData._id, idToFollow));
  };

  useEffect(() => {
    if (!isEmpty(userData.following)) {
      if (userData.following.includes(idToFollow)) {
        setisFollowed(true);
      } else setisFollowed(false);
    }
  }, [userData]);
  return (
    <div>
      {isFollowed && !isEmpty(userData) && (
        <span onClick={handleUnfollow}>
          <Button color={"secondary"} variant={"contained"}>
            Se désabonner
          </Button>
        </span>
      )}
      {!isFollowed && !isEmpty(userData) && (
        <span onClick={handleFollow}>
          <Button variant={"contained"} size={"small"}>
            Suivre
          </Button>
        </span>
      )}
    </div>
  );
};

export default FollowHandler;
