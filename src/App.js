import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import Layout from "./layout/Layout";
import LayoutNoSidebar from "./layout/LayoutNoSidebar"
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./contexts/UserContext";
import { SearchContextProvider } from "./contexts/SearchContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import Tech from "./pages/Tech";
import Science from "./pages/Science";
import Reviews from "./pages/Reviews";
import Entertainment from "./pages/Entertainment";
import Search from "./pages/Search";
import Dashboard from "./pages/Dashboard";
import EmailVerify from "./pages/EmailVerify";
import RecoverUsername from "./pages/RecoverUsername";
import RecoverPassword from "./pages/RecoverPassword";
import ChangePassword from "./pages/ChangePassword";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <SearchContextProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="posts/:id" element={<PostPage />} />
              <Route path="tech" element={<Tech />} />
              <Route path="science" element={<Science />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="entertainment" element={<Entertainment />} />
              <Route path="search" element={<Search />} />
            </Route>
            <Route path="/" element={<LayoutNoSidebar />}>
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<Register />} />
              <Route path="recover-username" element={<RecoverUsername />} />
              <Route path="recover-password" element={<RecoverPassword />} />
              <Route path="recover/password/:userid/:token" element={<ChangePassword />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="create" element={<CreatePost />} />
              <Route path="edit/:id" element={<EditPost />} />
              <Route path=":userid/verify/:token" element={<EmailVerify />}/>
              {/* <Route path="*" element={<NotFound />} /> */}
            </Route>
          </Routes>
        </SearchContextProvider>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
