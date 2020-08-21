import React, { Component } from 'react';
import { Link } from "react-router-dom";

import "./HomeStyle.css";

class Home extends Component {
  render() {
    return (
      <div>
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
