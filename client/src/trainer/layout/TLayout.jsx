/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from "react";
import THeader from "../THeader";
// import Footer from "../Footer";
import Helmet from 'helmet'

function TLayout({children}) {
  return (
    <div>
      <THeader style={{ zIndex:"9999"}}/>
      <div className="main " >
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
          <meta name="description" content="" />
          <meta name="keywords" content="" />
          <meta name="author" content="" />
          <title>
            title
          </title>
        </div>
      </Helmet>
    </div>
  );
}

export default TLayout;
