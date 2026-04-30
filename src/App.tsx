import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout';
import AdminLayout from './components/layout/AdminLayout';
import RequireAuth from './components/admin/RequireAuth';
import HomePage from './pages/HomePage';
import BlogIndexPage from './pages/BlogIndexPage';
import BlogPostPage from './pages/BlogPostPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminPostsPage from './pages/AdminPostsPage';
import AdminPostFormPage from './pages/AdminPostFormPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogIndexPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Route>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminLoginPage />} />
        <Route
          path="posts"
          element={
            <RequireAuth>
              <AdminPostsPage />
            </RequireAuth>
          }
        />
        <Route
          path="posts/new"
          element={
            <RequireAuth>
              <AdminPostFormPage />
            </RequireAuth>
          }
        />
        <Route
          path="posts/:id/edit"
          element={
            <RequireAuth>
              <AdminPostFormPage mode="edit" />
            </RequireAuth>
          }
        />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;