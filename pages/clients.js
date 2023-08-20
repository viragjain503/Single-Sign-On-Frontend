"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import Clients from '../components/Clients'
import ProtectedRoute from '@/components/ProtectedRoute';
import MyNavbar from '../components/MyNavbar';

export default function ClienDetails() {
  return (
    <>
      <ProtectedRoute>
        <MyNavbar/>
        <Clients/>
      </ProtectedRoute>
    </>
  )
}
