import { Navbar, Sidebar, PostCard } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllPosts } from "../../redux/asyncThunk/postThunk";
import { allPostsByFilter, latestPosts, trendingPosts } from "../../redux/slices/postSlice";
import { SuggestUser } from "../../components/suggestUser/suggestUsers";
import "./explore.css"
import { useNavigate } from "react-router-dom";
const ExplorePage = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const { posts } = useSelector((state) => state.posts);
  const [isLabel,setIsLabel]=useState("All");
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
            <div className="flex-col gap">
              <div className="flex-row gap position-sticky padding-sm cursor-pointer">
                <h3 
                onClick={()=>{setIsLabel("All");dispatch(allPostsByFilter())}}
                className={`${isLabel==="All"?"btn-active":""}`}>
                  For You</h3>
                <h3 className={`${isLabel==="Trending"?"btn-active":""}`}
                 onClick={() =>{dispatch(trendingPosts());setIsLabel("Trending")}}
                >Trending Posts</h3>
                <h3 className={`${isLabel==="Latest"?"btn-active":""}`}
                onClick={() => {setIsLabel("Latest");dispatch(latestPosts())}}
                >Latest Posts</h3>
              </div>
              { [...posts].reverse().map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
              <span className="flex-row align-end"onClick={()=>navigate("/")}>
              <i className="fa fa-chevron-circle-up fa-2x cursor-pointer" 
              aria-hidden="true"></i>
              </span>
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
export { ExplorePage };
