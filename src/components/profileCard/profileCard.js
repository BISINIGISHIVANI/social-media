import { useDispatch, useSelector } from "react-redux";
import { openProfileModal } from "../../redux/slices/modalSlice";
import { dummyAvatar } from "../../assets";
import { logoutUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
export const ProfileCard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const editProfileHandler = () => {
    dispatch(openProfileModal());
  };
  const logoutHandler = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  const { firstName, lastName, username, bio, avatar } = user;
  return (
    <div>
      <div className="post-card flex-col  gap padding-sm bd-radius-sm">
        <div
          className="flex-row gap align-end cursor-pointer"
          onClick={logoutHandler}
        >
          <i className="fa fa-sign-out fa-2x"></i>
        </div>
        <div className="flex-row gap">
          <img
            className="user-avatar avatar-sm"
            src={avatar === undefined ? dummyAvatar : avatar}
            alt="user-avatar"
          />
          <div>
            <h1>
              {firstName} {lastName}
            </h1>
            <p> @{username}</p>
          </div>
        </div>
        <div className="flex-center flex-col gap">
          <p>
            <span className="mg-xl avatar-sm">
              biography:{bio && bio.length > 0 ? bio : "nill"}
            </span>
          </p>
          <button
            className="start-btn cursor-pointer "
            onClick={editProfileHandler}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};
