import React, { Component } from 'react';
import { Link } from "react-router-dom";

import "./HomeStyle.css";
import saveKey from "./images/userInfoTrans.png";

class Home extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark sticky-top">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <Image src={logo} className="NavbarImage"/>{" "}QCAlpha
            </Link>
            
            <Dropdown>
              <Dropdown.Toggle style={{borderRadius: '10%', padding: '3px', background: '#eee', border: '0px'}}>
                <Image src={saveKey} className="NavbarImage"/>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {this.tokenKeyForm()}
              </Dropdown.Menu>
            </Dropdown>
          </div> 
        </nav>

        <div>
            <div  className="PrimaryButton">
              Dashboard 1
              <Link to="/dashboard1"
                    className="stretched-link"
              />
            </div>

            <div  className="PrimaryButton">
              Dashboard 2
              <Link to="/dashboard2"
                    className="stretched-link"
              />
            </div>

        </div>
      </div>
    )
  }
}

export default Home;
