import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "@/components/Layout";
import ProtectedRoute from '@/components/ProtectedRoute';
import MyNavbar from '../components/MyNavbar';

function DemoPage() {
  useEffect(() => {
    // Set up the event listener to handle the token from the child window
    const handleTokenMessage = (event) => {
    
    // console.log("Hii");
    // console.log(event.data.jwtToken)
            
      if (event.data.jwtToken) {
        localStorage.setItem('jwtTokenDemo', event.data.jwtToken);
        setTimeout(() => {
          alert("You've been successfully logged in - ");
          alert("Your JWT token set in broswer is - " + localStorage.getItem("jwtTokenDemo"));
        }, 2000); // Wait for 2 seconds before showing the second alert
       
      }
     
    };
    
    window.addEventListener('message', handleTokenMessage);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('message', handleTokenMessage);
    };
  }, []);

  const handleButtonClick = () => {
    const loginWindow = window.open('/singlesignon?clientId=demoClient', '_blank', 'width=500,height=500');
  };

  return (
    <Layout>
      <ProtectedRoute>
        <MyNavbar />
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <button className="btn btn-primary" onClick={handleButtonClick}>
            Single Sign On Button
          </button>
        </div>
      </ProtectedRoute>
    </Layout>
  );
}

export default DemoPage;
