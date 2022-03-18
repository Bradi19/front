import React, {useCallback,useEffect} from "react";
import Header from "../Header";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import Content from "../Content";
import Footer from "../Footer";
import { connect, useDispatch, useSelector } from "react-redux";
import * as pageActions from "../../../store/actions/actions";
import { bindActionCreators } from "redux";
function App(props) {
  useEffect(() => {
    props.pageActions.loads();
    props.pageActions.projects();
    props.pageActions.news();
  },[])

  return (
    <>
    <Header pageActions={props.pageActions} />
    {props.data.data ?
     (<Content data={props.data} news={props.news} infoUser={props.infoUser}  projects={props.projects} pageActions={props.pageActions} />)
     : (<div className="loader"></div>)
    }
    <Footer props={props} />
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    data: state.like.data,
    projects: state.like.projects,
    news: state.like.news,
    status: state.status,
    infoUser: state.like.infoUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    pageActions: bindActionCreators(pageActions, dispatch),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
