import "./navbar.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.users);
  const navigate = useNavigate();
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
  }, [darkMode, user, token]);
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
            <input
              type="search"
              className="search-input"
              placeholder="serach user..."
              value={searchValue}
              onChange={(e) => {
                searchUserHandler(e, users);
                setSearchValue(e.target.value);
              }}
            />
          </div>
          {filteredData.map((findUser) =>
            findUser.username === "Not Found" ? (
              "no user found"
            ) : (
              <div
                key={Math.random()}
                className="toggle-box mg-top-xl bd-sm bd-radius-sm padding-sm post-card cursor-pointer"
                onClick={() => navigate(`/profile/${findUser.username}`)}
              >
                {findUser.username}
              </div>
            )
          )}
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
      </div>
    </div>
  );
};
export { Navbar };
