import React from "react";
import NavBar from "./NavBar";
import SideNav from "./SideNav";
import Footer from "./Footer";
import MainContent from "./MainContent";

const Layout = ({ children }) => {
  
  return (
    <React.Fragment>
      <div className="wrapper">
        <SideNav />
        
        <MainContent>
          <NavBar />
          
          <div className="main-content">
           {children}
          </div>
          
          <Footer />
         </MainContent>
      
      </div>
    </React.Fragment>
  );
};

export default Layout;
