import { Navbar,Sidebar,PostCard } from "../../components"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllPosts } from "../../redux/asyncThunk/postThunk";
const BookmarkPage=()=>{
  const dispatch = useDispatch();
  const { bookmarks } = useSelector((state) => state.posts);
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
            <div className="flex-col gap mg-top-xl">
              {bookmarks.length>0 ?
               bookmarks.map((post) => (
                <PostCard key={post._id} post={post} />)):
              <h2 className="mg-top-xl">No bookmark posts found</h2>}
            </div>
          </section>
        </section>
        </div>
    </div>
)
}
export {BookmarkPage}