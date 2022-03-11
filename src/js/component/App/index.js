import React, {useCallback,useEffect} from "react";
import Header from "../Header";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Content from "../Content";
import Footer from "../Footer";
function App() {
  return (
    <>
      <Header />
      <Content />
      <Footer />
    </>
  );
}

export default App;
