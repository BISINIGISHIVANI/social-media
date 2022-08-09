import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeProfileModal } from "../../redux/slices/modalSlice";
import { editProfile } from "../../redux/asyncThunk/userThunk";
import { imageupload } from "../../assets/postImges";
import { dummyAvatar } from "../../assets";
const ProfileModal = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { showProfileModal } = useSelector((state) => state.modal);
  const [userData, setUserData] = useState({ ...user });
  const { firstName, avatar, username, bio } = userData;
  const updateProfileHandler = () => {
    dispatch(editProfile({ token, userData }));
    dispatch(closeProfileModal());
  };
  const nameChangeHandler = (e) => {
    setUserData({ ...userData, firstName: e.target.value });
  };
  const fileToURL = (event) => {
    const reader = new FileReader();
    reader.onload = () => {
      let imgUrl = reader.result;
      setUserData({
        ...userData,
        avatar: imgUrl
      });
    };
    reader.readAsDataURL(event.target.files[0]);
  };
  return (
    <div>
      {showProfileModal && (
        <div className="post-card z-12 post-center bd-sm bd-radius-sm padding-sm">
          <div className="flex-row gap align-end">
            <i
              className="fa fa-close cursor-pointer close-btn"
              onClick={() => dispatch(closeProfileModal())}
            ></i>
          </div>
          <h3 className="padding-sm ">Edit profile</h3>

          <div className="flex-col gap padding-sm login form login-form">
            <div className="flex-row gap align-end paddimg-sm">
              <div>
                <label htmlFor="img-file">
                  <img
                    className="cursor-pointer avatar-sm "
                    src={imageupload}
                    alt="IMG"
                  />
                  <img
                    className="avatar-sm"
                    src={avatar || dummyAvatar}
                    alt="avatar"
                  />
                  <input
                    id="img-file"
                    className="file-input"
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    onChange={(e) => fileToURL(e)}
                  />
                </label>
                <h3>+upload </h3>
              </div>
            </div>
            <label className="flex-col gap" htmlFor="firstName">
              firstName
              <input
                className="border-none login-input"
                type="text"
                name="firstName"
                id="firstName"
                value={firstName}
                onChange={nameChangeHandler}
              />
            </label>

            <label htmlFor="username">username</label>
            <input
              className="border-none login-input"
              type="text"
              id="username"
              value={username}
              onChange={(e) => {
                setUserData({ ...userData, username: e.target.value });
              }}
            />
            <label htmlFor="bio">Biography</label>
            <input
              className="border-none login-input"
              type="text"
              id="bio"
              value={bio}
              onChange={(e) => {
                setUserData({ ...userData, bio: e.target.value });
              }}
            />
          </div>
          <div className="flex-row gap align-end padding-sm">
            <button
              className="post-modal-btn btn-secondary"
              onClick={() => dispatch(closeProfileModal())}
            >
              Cancel
            </button>
            <button
              className="post-modal-btn post-btn"
              onClick={updateProfileHandler}
            >
              update
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export { ProfileModal };
