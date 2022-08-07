import { Navbar,Sidebar,PostCard } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPosts } from "../../redux/asyncThunk/postThunk";
import { trendingPosts ,latestPosts} from "../../redux/slices/postSlice";
const ExplorePage = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);
  return (
    <div>
      <Navbar />
      <div className="flex-row">
        <div>
          <Sidebar/>
        </div>
        <section className="flex-row main-content">
          <section className="content flex-col gap">
            <div className="flex-col gap">
              <div className="flex-row align-end flex-wrap gap">
                <button className="post-modal-btn btn-secondary"onClick={()=>dispatch(trendingPosts())}>trending Posts</button>
                <button className="post-modal-btn post-btn"onClick={()=>dispatch(latestPosts())}>latest Posts</button>
              </div>
              {[...posts].reverse().map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </section>
          <aside className="padding-edges aside">
           {/* suggetUser  */}
          </aside>
        </section>
      </div>
    </div>
  );
};
export { ExplorePage };
