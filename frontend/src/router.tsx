import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Blog from "./pages/blog";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/blog" replace />} />
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:id" element={<Blog />} />
    </Routes>
  );
}
