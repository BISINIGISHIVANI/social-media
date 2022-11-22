import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navbar, PostCard, Sidebar } from "../../components";
import { SuggestUser } from "../../components/suggestUser/suggestUsers";
import { getAllPosts } from "../../redux/asyncThunk/postThunk";
import "./home.css";
const HomePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);
  const myPosts = posts.filter((post) => post.username === user.username);
  const userPosts = [...myPosts];
  const navigate = useNavigate();
  useEffect(() => {
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
          <section className=" content flex-col gap">
            <div className="flex-col gap">
              <h2>Welcome back!</h2>
              <hr />
              {userPosts.length > 0 ? (
                userPosts.reverse().map((post) => <PostCard key={post._id} post={post} />)
              ) : (
                <div className="flex-col flex-center gap">
                  <h2>Start creating posts...</h2>
                  <h2>or</h2>
                  <button
                    className="start-btn"
                    onClick={() => navigate("/explore")}
                  >
                    Explore
                  </button>
                </div>
              )}
            </div>
          </section>
          <aside className="padding-edges aside">
            <SuggestUser />
          </aside>
        </section>
      </div>
    </div>
  );
};
export { HomePage };
