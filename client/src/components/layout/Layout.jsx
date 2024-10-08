/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from "react";
import Header from "../Header";
// import Footer from "../Footer";
import Helmet from 'helmet'

function Layout({children}) {
  return (
    <div>
      <Header style={{ zIndex:"auto"}}/>
      <div className="main overflow-y-hidden" >
        {children}
      </div>
      {/* <Footer /> */}
      <Helmet>
        <div>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          
        </div>
      </Helmet>
    </div>
  );
}

export default Layout;
