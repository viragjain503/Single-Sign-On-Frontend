"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import ClientDetails from "../components/ClientDetails";
import ProtectedRoute from "@/components/ProtectedRoute";
import Layout from "@/components/Layout";

export default function ClienDetails() {
  return (
    <>
      <Layout>
        <ProtectedRoute>
          <ClientDetails />
        </ProtectedRoute>
      </Layout>
    </>
  );
}
