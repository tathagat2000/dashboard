import React, { Component } from 'react';
import { Link } from "react-router-dom";

import "./HomeStyle.css";

class Home extends Component {
  render() {
    return (
      <div>
        <div>
            <div  className="PrimaryButton">
              Create New CV
              <Link to="/templatelist"
                    className="stretched-link"
                    data-testid="createNewCVLinkTestId" 
              />
            </div>

            <div  className="PrimaryButton">
              Create New CV
              <Link to="/templatelist"
                    className="stretched-link"
                    data-testid="createNewCVLinkTestId" 
              />
            </div>

        </div>
      </div>
    )
  }
}

export default Home;
