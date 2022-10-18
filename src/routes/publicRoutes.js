import { Routes, Route } from "react-router-dom";
import {
  LandingPage,
  ErrorPage,
  HomePage,
  LoginPage,
  SignUpPage,
  ProfilePage,
  ExplorePage,
  BookmarkPage,
  FavouritePage
} from "../pages";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PrivateRoute } from "./privateRoute";
import { AddPost, PostModal } from "../components";
import { useSelector } from "react-redux";

const PublicRoutes = () => {
  const {showPostModal}=useSelector((state)=>state.modal)
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/explore"
          element={
            <PrivateRoute>
              <ExplorePage/>
            </PrivateRoute>
          }
        />
        <Route
          path="/bookmark"
          element={
            <PrivateRoute>
              <BookmarkPage/>
            </PrivateRoute>
          }
        />
        <Route
          path="/favourite"
          element={
            <PrivateRoute>
              <FavouritePage/>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/:username"
          element={
            <PrivateRoute>
              <ProfilePage/>
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {showPostModal && <AddPost/>}
      <PostModal/>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
export { PublicRoutes };
