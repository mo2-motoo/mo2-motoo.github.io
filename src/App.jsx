import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Category } from "./pages/Category";
import { Post } from "./pages/Post";
import { PostEditor } from "./pages/PostEditor";
import { Settings } from "./pages/Settings";
import { PostProvider } from "./contexts/PostContext";
import "./App.css";

function App() {
  return (
    <PostProvider>
      <Router>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:category" element={<Category />} />
              <Route path="/:category/:slug" element={<Post />} />
              <Route path="/editor" element={<PostEditor />} />
              <Route path="/editor/:id" element={<PostEditor />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </PostProvider>
  );
}

export default App;
