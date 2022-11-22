import { Navbar, Sidebar, PostCard } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPosts } from "../../redux/asyncThunk/postThunk";
import { SuggestUser } from "../../components/suggestUser/suggestUsers";
import { useNavigate } from "react-router-dom";
const BookmarkPage = () => {
  const dispatch = useDispatch();
  const { bookmarks } = useSelector((state) => state.posts);
  const navigate=useNavigate()
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
          <section className="content flex-col gap">
            <h2>My Bookmarks!</h2>
            <hr />
            <div className="flex-col gap mg-top-xl">
              {bookmarks.length > 0 ? (
                bookmarks.reverse().map((post) => <PostCard key={post._id} post={post} />)
              ) : (
                <div className="flex-col flex-center gap">
                  <h2>Start bookmark posts</h2>
                  <h2>or</h2>
                  <button
                    className="start-btn"
                    onClick={() => navigate("/explore")}
                  >
                    Explore now
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
export { BookmarkPage };
