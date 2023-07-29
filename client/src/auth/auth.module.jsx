import { Route, Routes } from 'react-router-dom';
import { LoginPage } from '@/auth/pages/login.page';

export function AuthModule () {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
    </Routes>
  )
}