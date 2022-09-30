import "./post.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePost,
  likePost,
  dislikePost,
  addBookmark,
  removeBookmark,
  commentPost,
  deleteComment,
  UpVoteComment,
  downVoteComment
} from "../../redux/asyncThunk/postThunk";
import { openEditPost, openModal } from "../../redux/slices/modalSlice";
import { useState } from "react";
import { getAllUser } from "../../redux/asyncThunk/userThunk";
import { useEffect } from "react";
import { dummyAvatar } from "../../assets";
const PostCard = ({ post }) => {
  const { _id, username, content, likes, comments, postImg } = post;
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const [openPost, setOpenPost] = useState(false);
  const { bookmarks } = useSelector((state) => state.posts);
  const [addComment, setAddComment] = useState("");
  const { username: currentUser } = user;
  const [showComments, setShowComments] = useState(false);

  const openEditPostHandler = () => {
    dispatch(openModal());
    dispatch(openEditPost(post));
  };
  const deletePostHandler = () => {
    dispatch(deletePost({ _id, token }));
  };
  const likePostHandler = () => {
    dispatch(likePost({ _id, token }));
  };
  const unlikePostHandler = () => {
    dispatch(dislikePost({ _id, token }));
  };
  const isPostBookmarked = bookmarks.some((postId) => postId._id === _id);
  const bookmarkHandler = () => {
    if (isPostBookmarked) {
      dispatch(removeBookmark({ _id, token }));
    } else {
      dispatch(addBookmark({ _id, token }));
    }
  };
  const toggleComment = () => {
    setShowComments((visible) => !visible);
  };
  const commentHandler = () => {
    if (addComment !== "") {
      dispatch(commentPost({ _id, token, commentData: addComment }));
      setAddComment("");
    }
  };
  const removeCommentHandler = (commentId) => {
    dispatch(deleteComment({ postId: _id, commentId, token }));
  };
  const upVoteCommentHandler = (commentId) => {
    dispatch(UpVoteComment({ postId: _id, commentId, token }));
  };
  const downVoteCommentHandler = (commentId) => {
    dispatch(downVoteComment({ postId: _id, commentId, token }));
  };
  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);
  return (
    <div className="flex-col gap">
      <div>
        {users
          .filter((user) => user.username === username)
          .map(({ _id, avatar, firstName, lastName }) => (
            <div key={_id} className="post-card padding-xl bd-radius-sm">
              <div className="flex-row gap flex-space-between ">
                <div className="flex-row gap">
                  <img
                    className="user-avatar avatar-sm"
                    src={avatar ? avatar : dummyAvatar}
                    alt="profile"
                  />
                  <div className="mg-top-xl">
                    <div className="flex-row gap flex-center">
                      <h4>
                        {firstName} {lastName}
                      </h4>
                      <span>{post.createdAt.slice(0, 10)}</span>
                    </div>
                    <span className="cursor-pointer">@{username}</span>
                  </div>
                </div>
                {username === currentUser ? (
                  <div className="flex-row">
                    <div
                      onClick={() => setOpenPost((open) => !open)}
                      className="position-relative cursor-pointer mg-top-xl"
                    >
                      <i className="fa fa-ellipsis-h cursor-pointer"></i>
                    </div>
                    {openPost && (
                      <div className="toggle-box bd-sm mg-top-xl add-post bd-radius-sm">
                        <div className="square-box">
                          <div className="flex-col">
                            <span
                              className="cursor-pointer"
                              onClick={openEditPostHandler}
                            >
                              <i className="fa fa-edit"></i>edit
                            </span>
                            <span
                              className="cursor-pointer"
                              onClick={deletePostHandler}
                            >
                              <i className="fa fa-trash"></i>delete
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
              <div className="mg-xl flex-col gap">
                <span>{content}</span>
                <img className="post-img flex-center" src={postImg} alt="" />
              </div>
              {showComments && (
                <div className="flex-col gap padding-md">
                  {comments.map(
                    ({ _id, firstName, commentData, username, avatar }) => {
                      return (
                        <div
                          key={_id}
                          className="padding-md flex-col cursor-pointer bd-radius-sm comment-container"
                        >
                          <div className="flex-row gap align-item-center">
                            <img
                              className="user-avatar avatar-sm"
                              src={avatar}
                              alt="avatar"
                            />
                            <h3>{firstName}</h3>
                          </div>
                          <div className="flex-row gap margin-left">
                            <p className="padding-md mg-left-xl">
                              {commentData}
                            </p>
                            <span className="close-btn">
                              <i
                                className="fa fa-thumbs-up"
                                onClick={() => upVoteCommentHandler(_id)}
                              ></i>
                            </span>
                            <span className="close-btn">
                              <i
                                className="fa fa-thumbs-down"
                                onClick={() => downVoteCommentHandler(_id)}
                              ></i>
                            </span>
                            {username === user.username ? (
                              <div className="close-btn preview-close-btn">
                                <i
                                  onClick={() => removeCommentHandler(_id)}
                                  className="fa fa-trash align-end"
                                ></i>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      );
                    }
                  )}
                  <div className="flex-row flex-center gap mg-xl">
                    <div>
                      <img
                        className="user-avatar avatar-sm"
                        src={user.avatar}
                        alt="your-profile"
                      />
                    </div>
                    <div className="flex-row gap bd-btn width-lg bd-radius-sm">
                      <input
                        className="bd-remove padding-xl width-lg input-bg"
                        type="text"
                        placeholder="add new comment"
                        value={addComment}
                        onChange={(e) => setAddComment(e.target.value)}
                      />
                      <button
                        className="bd-remove padding-xl"
                        onClick={commentHandler}
                      >
                        POST
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex-row flex-space-between mg-xl cursor-pointer">
                <span>
                  {likes?.likedBy.find(
                    (postLiked) => postLiked.username === user.username
                  ) ? (
                    <i className="fa fa-heart" onClick={unlikePostHandler}></i>
                  ) : (
                    <i className="fa fa-heart-o" onClick={likePostHandler}></i>
                  )}
                  {post?.likes?.likedBy?.length}
                </span>
                <span onClick={toggleComment}>
                  <i className="fa fa-comment-o"></i>
                  {post?.comments?.length > 0 ? comments.length : 0}
                </span>
                {isPostBookmarked ? (
                  <i onClick={bookmarkHandler} className="fa fa-bookmark"></i>
                ) : (
                  <i onClick={bookmarkHandler} className="fa fa-bookmark-o"></i>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export { PostCard };
