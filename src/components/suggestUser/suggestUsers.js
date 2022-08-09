import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllUser } from "../../redux/asyncThunk/userThunk";
import { UserCard } from "./userCard";
const SuggestUser = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const otherUser = users.filter(
    (currUser) => currUser.username !== user.username
  );
  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);
  return (
    <div>
      {otherUser.length > 0 ? (
        <div className="post-card padding-sm mg-xl bd-radius-sm">
          <h2>you might like also</h2>
          {[...otherUser].map((userData) => (
            <UserCard key={userData._id} userData={userData} />
          ))}
        </div>
      ) : (
        <div className="post-card padding-sm mg-xl bd-radius-sm">
          <h2>your following all users</h2>
        </div>
      )}
    </div>
  );
};
export { SuggestUser };
