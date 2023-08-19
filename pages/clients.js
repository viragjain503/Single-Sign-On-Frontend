"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import Clients from '../components/Clients'
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ClienDetails() {
  return (
    <>
      <ProtectedRoute>
        <Clients/>
      </ProtectedRoute>
    </>
  )
}
