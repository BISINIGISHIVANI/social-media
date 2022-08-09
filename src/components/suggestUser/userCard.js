import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { followUser, unfollowUser } from "../../redux/asyncThunk/userThunk";
const UserCard = ({ userData }) => {
  const { _id, avatar, username, firstName, lastName, followers } = userData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const isFollowing = followers.some(
    (existUser) => existUser.username === user.username
  )
    ? true
    : false;
  const followHandler = () => {
    dispatch(followUser({ _id, token }));
  };
  const unFollowHandler = () => {
    dispatch(unfollowUser({ _id, token }));
  };
  return (
    <div className="flex-row gap flex-center flex-space-between post-card">
      <div
        onClick={() => navigate(`/profile/${username}`)}
        className="flex-row flex-center  gap mg-xl padding-md"
      >
        <img
          className="user-avatar avatar-sm"
          src={avatar}
          alt="suggested-user"
        />
      </div>
      <div
        className="width-xl "
        onClick={() => navigate(`/profile/${username}`)}
      >
        <h4>{`${firstName} ${lastName}`}</h4>
        <span>@{username}</span>
      </div>
      <div>
        <div className="width-xl">
          {isFollowing ? (
            <button
              className="post-modal-btn btn-secondary cursor-pointer"
              onClick={unFollowHandler}
            >
              following
            </button>
          ) : (
            <button
              className="post-modal-btn post-btn cursor-pointer"
              onClick={followHandler}
            >
              {" "}
              + follow
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export { UserCard };
