import "./navbar.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {
  const { user,token } = useSelector((state) => state.auth);
  const {users}=useSelector((state)=>state.users)
  const navigate=useNavigate()
  const [isOpen, setIsOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
   const searchUserHandler = (e, data) => {
    let text = e.target.value.toLowerCase().trim();
    let textLength = text.length;
    let result = data.filter((user) =>
      user.username.toLowerCase().substring(0, textLength).includes(text)
    );
    if (textLength > 0) {
      result.length > 0
        ? setFilteredData(result)
        : setFilteredData([{ id: 0, username: "user not Found" }]);
    } else setFilteredData([]);
  };
  const follwerDataToggle = () => {
    setIsOpen((open) => !open);
  };
  const themeFromLocal = JSON.parse(localStorage.getItem("darkMode"));
  const [darkMode, setDarkMode] = useState(themeFromLocal || false);
  const toggleDarkMode = () => {
    setDarkMode((toggle) => !toggle);
  };
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    darkMode
      ? document.body.classList.add("dark-mode")
      : document.body.classList.remove("dark-mode");
  }, [darkMode,user,token]);
  return (
    <div className={`navbar padding-sm flex-row flex-space-between`}>
      <div className="decoration-none">
        <Link to="/">
          <h2 className="cursor-pointer main-heading"> ✦꙳ Social Explore </h2>
        </Link>
      </div>
      <div className="flex-row gap flex-wrap left-nav">
        <label className="search-bar flex-row">
          <div className="position-relative">
          <input type="search" 
          className="search-input"
          placeholder="serach user..."
          value={searchValue}
          onChange={(e)=>{
            searchUserHandler(e,users)
            setSearchValue(e.target.value)
          }}
          />
          </div>
          {filteredData.map((findUser)=>findUser.username==="Not Found"?(
            "no user found"
          ):(
            <div key={Math.random()}
            className="toggle-box mg-top-xl bd-sm bd-radius-sm padding-sm post-card cursor-pointer"
            onClick={()=>navigate(`/profile/${findUser.username}`)}>
              {findUser.username}
            </div>
          ))}
          <span>
            <i className="fa fa-search search-icon cursor-pointer"></i>
          </span>
        </label>
        <label
          className="toggle-switch cursor-pointer"
          onClick={toggleDarkMode}
        >
          <input className="toggle-switch_input" type="checkbox" />
          <span
            className="toggle-switch_slider"
            onClick={toggleDarkMode}
          ></span>
        </label>
        <i
          className="fa fa-bars fa-2x cursor-pointer"
          onClick={follwerDataToggle}
        ></i>
        <div
          className={`bd-sm toggle-sidebar ${isOpen === true ? "active" : ""}`}
        >
          <div className="padding-sm flex-col gap">
            <div className="flex-row flex-space-between">
              <h2>social explore</h2>
              <i
                className="fa fa-times cursor-pointer"
                onClick={follwerDataToggle}
              ></i>
            </div>
            <div className="margin-sm">
              {user ? (
                <div>
                <h3>hi,{user.firstName}</h3>
                <div className="mobile-sidebar width-fitContent">
                  user sidebar
                </div>
                </div>
              ) : (
                <span>kindly Login for more information </span>
              )}
            </div>
          </div>
        </div>
        <div
          className={`sidebar-overlay ${isOpen === true ? "active" : ""}`}
          onClick={follwerDataToggle}
        ></div>
      </div>
    </div>
  );
};
export { Navbar };
