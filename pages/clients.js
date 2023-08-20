"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import Clients from '../components/Clients'
import ProtectedRoute from '@/components/ProtectedRoute';
import MyNavbar from '../components/MyNavbar';
import Layout from '@/components/Layout';

export default function ClienDetails() {
  return (
    <>
    <Layout>
      <ProtectedRoute>
        <MyNavbar/>
        <Clients/>
      </ProtectedRoute>
      </Layout>
    </>
  )
}
