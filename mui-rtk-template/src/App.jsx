import { Suspense, lazy } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import AppLayout from './layouts/AppLayout.jsx'

const HomePage = lazy(() => import('./pages/HomePage.jsx'))
const PostsPage = lazy(() => import('./pages/PostsPage.jsx'))
const UsersPage = lazy(() => import('./pages/UsersPage.jsx'))

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route
          index
          element={
            <Suspense fallback={null}>
              <HomePage />
            </Suspense>
          }
        />
        <Route
          path="posts"
          element={
            <Suspense fallback={null}>
              <PostsPage />
            </Suspense>
          }
        />
        <Route
          path="users"
          element={
            <Suspense fallback={null}>
              <UsersPage />
            </Suspense>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
