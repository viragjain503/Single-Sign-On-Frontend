"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import ClientDetails from '../components/ClientDetails'
import ProtectedRoute from '@/components/ProtectedRoute';

export default function ClienDetails() {
  return (
    <>
      <ProtectedRoute>
        <ClientDetails/>
      </ProtectedRoute>
    </>
  )
}
