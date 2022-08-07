import { useDispatch, useSelector } from "react-redux";
import { AddPost } from "../addPost/addPost";
import { openEditPost,closeModal } from "../../redux/slices/modalSlice";
const PostModal = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.modal);
  const closePostModal = () => {
    dispatch(openEditPost({}));
    dispatch(closeModal());
  };
  return (
    <div>
      {isOpen ? (
        <div className="post-center post-bg bd-radius-sm padding-sm">
          <div className="flex-row gap align-end">
            <i
              className="fa fa-close cursor-pointer close-btn"
              onClick={closePostModal}
            ></i>
          </div>
          <h2 className="main-heading">Editing post</h2>
          <AddPost modal={true} />
        </div>
      ) : null}
    </div>
  );
};
export { PostModal };
