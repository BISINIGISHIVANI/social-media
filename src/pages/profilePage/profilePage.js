import { Navbar, Sidebar } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getAllPosts } from "../../redux/asyncThunk/postThunk";
import { followUser, getAllUser, unfollowUser } from "../../redux/asyncThunk/userThunk";
import { PostCard } from "../../components";
import { ProfileModal } from "../../components/profileModal/profileModal";
import { SuggestUser } from "../../components/suggestUser/suggestUsers";
import { ProfileCard } from "../../components/profileCard/profileCard";
const ProfilePage = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const { user,token } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const { posts } = useSelector((state) => state.posts);
  const myposts = posts.filter((post) => post.username === username);
  const otherUsers = users.filter((currUser) => currUser.username === username);
  useEffect(() => {
    dispatch(getAllUser());
    dispatch(getAllPosts());
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <div className="flex-row">
        <div>
          <Sidebar />
        </div>
        <section className="flex-row main-content">
          <section className="content flex-col gap">
            <div className="bd-radius-sm flex-col flex-center align-center">
              {otherUsers.map(
                ({
                  _id,
                  avatar,
                  firstName,
                  lastName,
                  followers,
                  following
                }) => (
                  <div key={_id}>
                    {user.username !== username ? (
                      <div className="flex-row gap">
                        <img
                          className="user-avatar avatar-sm"
                          src={avatar}
                          alt="user-avatar"
                        />
                        <div>
                          <h1>
                            {firstName} {lastName}
                          </h1>
                          <p> @{username}</p>
                        </div>
                        {  !followers.some(
                        (existUser) => 
                        existUser.username === user.username)?
                           <span className="cursor-pointer"
                           onClick={()=>dispatch(followUser({_id,token}))}
                           >follow</span>:
                           <span className="cursor-pointer"
                           onClick={()=>dispatch(unfollowUser({_id,token}))}
                           >unfollow</span>
                        }
                      </div>
                    ) : (
                      <ProfileCard />
                    )}
                    <div className="flex-row  padding-xl">
                      <span>Followers {followers?.length} </span>
                      <div className="flex-row">
                        <span>
                          {" "}
                          | Following {following?.length} | Posts{" "}
                          {myposts?.length}{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              )}
              {user.username === username && <ProfileModal />}
            </div>
            <hr />
            <div className="flex-col gap">
              {myposts.length > 0 ? (
                myposts.reverse().map((post) => <PostCard key={post._id} post={post} />)
              ) : (
                <h2>No posts yet,start writing posts..</h2>
              )}
            </div>
          </section>
          <aside className="padding-edges aside cursor-pointer">
            <SuggestUser />
          </aside>
        </section>
      </div>
    </div>
  );
};
export { ProfilePage };
