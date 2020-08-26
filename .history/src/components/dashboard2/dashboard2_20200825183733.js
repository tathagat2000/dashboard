import React, { Component } from "react";
import axios from "axios";
import { reactLocalStorage } from "reactjs-localstorage";
import { Link } from "react-router-dom";
import {
  Table,
  Row,
  Col,
  Dropdown,
  DropdownButton,
  Accordion,
  Card,
  Form,
  Button,
  Image,
  Badge,
} from "react-bootstrap";

import "./Dashboard2Style.css";
import logo from "../images/QCAlphaLogoTrans.png";
import saveKey from "../images/userInfoTrans.png";

class Dashboard2 extends Component {

  state = {
    accessToken: "",
    apiKey: "",

    strategyName: "Strategy",
    tickerValue: "Ticker",
    expiryValue: "",
    expiryListData: "",
    strikeDistanceValue: "",
    totContractsValue: "",

    straddleMultiplier: "",
    strangleMultiplier: "",
    ironFlyMultiplier:"", 
    putButterflyMultiplier:"",
    callButterflyMultiplier:"", 
    putSpreadMultiplier:"", 
    callSpreadMultiplier:"", 
    putRatioMultiplier:"",
    putRatioNumerator:"",
    putRatioDenominator:"",
    callRatioMultiplier:"",
    callRatioNumerator:"",
    callRatioDenominator:"",

    columnListData:{"straddle":[],"strangle":[],"ironFly":[],"putButterfly":[],"callButterfly":[],"putSpread":[],"callSpread":[],"putRatio":[],"callRatio":[]},

    tableData: "",
    tableStructure: "",
    table: "",
    responseData: "",
    flag: true,
  }

  // -----------------------AfterMount---------------------------

  componentDidMount = () => {
    document.title = "QCAlpha";
  
    if (reactLocalStorage.get("accessToken") && reactLocalStorage.get("API_Key")) {
      axios
        .get(
          `http://localhost:5000/expiry?accessToken=${reactLocalStorage.get("accessToken")}&
                                        API_Key=${reactLocalStorage.get("API_Key")}`
        )
        .then((res) => {
          //console.log(res);

          let expiryList = [];
          res.data.map((val, index) =>
            expiryList.push(
              <Dropdown.Item key={index + 1} eventKey={val}>
                {val}
              </Dropdown.Item>
            )
          );

          this.setState({
            expiryListData: expiryList,
          });

          //console.log(this.state.expiryListData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  // -----------------------Keys and Tokens----------------------

  updateAccessToken = (event) => {
    this.setState({
      accessToken: event.target.value,
    });
  };

  updateAPIKey = (event) => {
    this.setState({
      apiKey: event.target.value,
    })
  };

  saveAccessToken = () => {
    reactLocalStorage.set("accessToken", this.state.accessToken);
    //console.log(reactLocalStorage.get("accessToken"))
    if (reactLocalStorage.get("accessToken") && reactLocalStorage.get("API_Key")) {
      axios
        .get(
          `http://localhost:5000/expiry?accessToken=${reactLocalStorage.get("accessToken")}&
                                        API_Key=${reactLocalStorage.get("API_Key")}`
        )
        .then((res) => {
          //console.log(res);

          let expiryList = [];

          res.data.map((val, index) =>
            expiryList.push(
              <Dropdown.Item key={index + 1} eventKey={val}>
                {val}
              </Dropdown.Item>
            )
          );

          this.setState({
            expiryListData: expiryList,
          });

          //console.log(this.state.expiryListData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  saveAPIKeys = () => {
    reactLocalStorage.set("API_Key", this.state.apiKey);

    //console.log(reactLocalStorage.get("API_Key"))

    if (reactLocalStorage.get("accessToken") && reactLocalStorage.get("API_Key")) {
      axios
        .get(
          `http://localhost:5000/expiry?accessToken=${reactLocalStorage.get("accessToken")}&
                                        API_Key=${reactLocalStorage.get("API_Key")}`
        )
        .then((res) => {
          //console.log(res);

          let expiryList = [];

          res.data.map((val, index) =>
            expiryList.push(
              <Dropdown.Item key={index + 1} eventKey={val}>
                {val}
              </Dropdown.Item>
            )
          );

          this.setState({
            expiryListData: expiryList,
          });

          //console.log(this.state.expiryListData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };


  tokenKeyForm = () => {
    return (
      <Form style={{width: 'max-content', margin: '20px'}}>
        
        <Form.Group controlId="formAccessToken">
          <Form.Label>Access Token</Form.Label>
          <Form.Control placeholder="Enter Access Token" onChange={this.updateAccessToken}/>
          <Form.Text className="text-muted">
            Save Access Token once in a Day...
          </Form.Text>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 12, offset: 3 }}>
            <Button variant="success" onClick={this.saveAccessToken}>
              Save Access Token!!
            </Button>
          </Col>
        </Form.Group>
        
        <Form.Group as={Col} controlId="formAPIKey">
          <Form.Label>API Key</Form.Label>
          <Form.Control type="text" placeholder="Enter API Key" onChange={this.updateAPIKey}/>
          <Form.Text className="text-muted">
            Save API Key only once!!
            *Re-enter when browser cache is cleared
          </Form.Text>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 12, offset: 4 }}>
            <Button variant="success" onClick={this.saveAPIKeys}>
              Save API Key
            </Button>
          </Col>
        </Form.Group>

      </Form>
    );
  };

  // ------------------------------------------------------------
  updateStrategyNameLabel = (event) => {
    this.setState({
      strategyName: event,
    })
    console.log(event);
    console.log(this.state.strategyName);
  };

  updateTickerLabel = (event) => {
    //console.log(event);
    this.setState({
      tickerValue: event,
    });
  };

  updateExpiryLabel = (event) => {
    this.setState({
      expiryValue: event,
    });
  };

  updateStrikeDistanceLabel = (event) => {
    this.setState({
      strikeDistanceValue: event,
    });
  };

  updateTotContractsLabel = (event) => {
    this.setState({
      totContractsValue: event,
    });
  };

  contractNumbersList = () => {
    const contractNumbers = [5, 10, 15, 20];
    return (
      <div>
        {contractNumbers.map((val, index) => (
          <Dropdown.Item key={index + 1} eventKey={val}>
            {val}
          </Dropdown.Item>
        ))}
      </div>
    );
  }; 

  // --------------------------------------------Strategies---------------------------------------------

  addColumnListData = (strategyType, multiplier, numerator, denominator) => {

    let newStrategyData;

    if(strategyType === "callRatio" || strategyType === "putRatio") {
      newStrategyData = [
        Date.now(),
        numerator,
        denominator,
        multiplier,
      ]
    }
    else if(strategyType === 'straddle') {
      newStrategyData = [Date.now()]
    }
    else {
      newStrategyData = [
        Date.now(),
        multiplier,
      ]
    }
    
    let newColumnListData = this.state.columnListData;
    //console.log(strategyType);
    //console.log(newColumnListData['straddle']);
    //console.log(newColumnListData.straddle);
    newColumnListData[strategyType].push(newStrategyData);

    this.setState({
      columnListData: newColumnListData,
    })

    console.log(this.state.columnListData)
  }

  // -------------------------Straddle---------------------------
  straddleStructure = () => {
    return (
      <div>
        <Form.Group as={Row}>
          <Form.Label> Multiplier </Form.Label>
          <Col>
            <Form.Control type="number" onChange={this.updateStraddleMultiplierValue}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 12, offset: 4 }}>
            <Button variant="primary" 
                    onClick={() => {this.addColumnListData("straddle","", "", "")}}
            >
              Add
            </Button>
          </Col>
        </Form.Group>
      </div>
    );
  }

  // -------------------------Strangle---------------------------

  updateStrangleMultiplierValue = (event) => {
    this.setState({
      strangleMultiplier: event.target.value,
    })
  }

  strangleStructure = () => {
    return (
      <div>
        <Form.Group as={Row}>
          <Form.Label> Multiplier </Form.Label>
          <Col>
            <Form.Control type="number" onChange={this.updateStrangleMultiplierValue}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 12, offset: 4 }}>
            <Button variant="primary" 
                    onClick={() => {this.addColumnListData("strangle", this.state.strangleMultiplier, "", "")}}
            >
              Add
            </Button>
          </Col>
        </Form.Group>

      </div>
    );
  }

  // -------------------------------IronFly------------------------

  updateIronFlyMultiplierValue = (event) => {
    this.setState({
      ironFlyMultiplier: event.target.value,
    })
  }

  ironFlyStructure = () => {
    return (
      <div>
        <Form.Group as={Row}>
          <Form.Label> Multiplier </Form.Label>
          <Col>
            <Form.Control type="number" onChange={this.updateIronFlyMultiplierValue}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 12, offset: 4 }}>
            <Button variant="primary" 
                    onClick={() => {this.addColumnListData("ironFly", this.state.ironFlyMultiplier, "", "")}}
            >
              Add
            </Button>
          </Col>
        </Form.Group>
      </div>
    );
  }

  // ----------------------------PutButterfly---------------------------------

  updatePutButterflyMultiplierValue = (event) => {
    this.setState({
      putButterflyMultiplier: event.target.value,
    })
  }
  putButterflyStructure = () => {
    return (
      <div>
        <Form.Group as={Row}>
          <Form.Label> Multiplier </Form.Label>
          <Col>
            <Form.Control type="number" onChange={this.updatePutButterflyMultiplierValue}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 12, offset: 4 }}>
            <Button variant="primary" 
                    onClick={() => {this.addColumnListData("putButterfly", this.state.putButterflyMultiplier, "", "")}}
            >
              Add
            </Button>
          </Col>
        </Form.Group>
      </div>
    );
  }

  // ----------------------------CallButterfly---------------------------------

  updateCallButterflyMultiplierValue = (event) => {
    this.setState({
      callButterflyMultiplier: event.target.value,
    })
  }

  callButterflyStructure = () => {
    return (
      <div>
        <Form.Group as={Row}>
          <Form.Label> Multiplier </Form.Label>
          <Col>
            <Form.Control type="number" onChange={this.updateCallButterflyMultiplierValue}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 12, offset: 4 }}>
            <Button variant="primary" 
                    onClick={() => {this.addColumnListData("callButterfly", this.state.callButterflyMultiplier, "", "")}}
            >
              Add
            </Button>
          </Col>
        </Form.Group>
      </div>
    );
  }

  // ----------------------------PutSpread---------------------------------

  updatePutSpreadMultiplierValue = (event) => {
    this.setState({
      putSpreadMultiplier: event.target.value,
    })
  }

  putSpreadStructure = () => {
    return (
      <div>
        <Form.Group as={Row}>
          <Form.Label> Multiplier </Form.Label>
          <Col>
            <Form.Control type="number" onChange={this.updatePutSpreadMultiplierValue}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 12, offset: 4 }}>
            <Button variant="primary" 
                    onClick={() => {this.addColumnListData("putSpread", this.state.putSpreadMultiplier, "", "")}}
            >
              Add
            </Button>
          </Col>
        </Form.Group>
      </div>
    );
  }

  // ----------------------------CallSpread---------------------------------

  updateCallSpreadMultiplierValue = (event) => {
    this.setState({
      callSpreadMultiplier: event.target.value,
    })
  }
  
  callSpreadStructure = () => {
    return (
      <div>
        <Form.Group as={Row}>
          <Form.Label> Multiplier </Form.Label>
          <Col>
            <Form.Control type="number" onChange={this.updateCallSpreadMultiplierValue}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 12, offset: 4 }}>
            <Button variant="primary" 
                    onClick={() => {this.addColumnListData("callSpread", this.state.callSpreadMultiplier, "", "")}}
            >
              Add
            </Button>
          </Col>
        </Form.Group>
      </div>
    );
  }

  // ----------------------------PutRatio---------------------------------

  updatePutRatioNumeratorValue = (event) => {
    this.setState({
      putRatioNumerator: event.target.value,
    })
  }

  updatePutRatioDenominatorValue = (event) => {
    this.setState({
      putRatioDenominator: event.target.value,
    })
  }

  updatePutRatioMultiplierValue = (event) => {
    this.setState({
      putRatioMultiplier: event.target.value,
    })
  }
  
  putRatioStructure = () => {
    return (
      <div>
        <Form.Group as={Row}>
          <Form.Label> Numerator </Form.Label>
          <Col>
            <Form.Control type="number" onChange={this.updatePutRatioNumeratorValue}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label> Denominator </Form.Label>
          <Col>
            <Form.Control type="number" onChange={this.updatePutRatioDenominatorValue}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label> Multiplier </Form.Label>
          <Col>
            <Form.Control type="number" onChange={this.updatePutRatioMultiplierValue}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 12, offset: 4 }}>
            <Button variant="primary" 
                    onClick={() => {
                      this.addColumnListData("putRatio", 
                                              this.state.putRatioMultiplier, 
                                              this.state.putRatioNumerator,
                                              this.state.putRatioDenominator) 
                    }}
            >
              Add
            </Button>
          </Col>
        </Form.Group>
      </div>
    );
  }

  // ----------------------------CallRatio---------------------------------

  updateCallRatioNumeratorValue = (event) => {
    this.setState({
      callRatioNumerator: event.target.value,
    })
  }

  updateCallRatioDenominatorValue = (event) => {
    this.setState({
      callRatioDenominator: event.target.value,
    })
  }

  updateCallRatioMultiplierValue = (event) => {
    this.setState({
      callRatioMultiplier: event.target.value,
    })
  }
  
  callRatioStructure = () => {
    return (
      <div>
        <Form.Group as={Row}>
          <Form.Label> Numerator </Form.Label>
          <Col>
            <Form.Control type="number" onChange={this.updateCallRatioNumeratorValue}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label> Denominator </Form.Label>
          <Col>
            <Form.Control type="number" onChange={this.updateCallRatioDenominatorValue}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label> Multiplier </Form.Label>
          <Col>
            <Form.Control type="number" onChange={this.updateCallRatioMultiplierValue}/>
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 12, offset: 4 }}>
            <Button variant="primary" 
                    onClick={() => {
                      this.addColumnListData("callRatio", 
                                              this.state.callRatioMultiplier, 
                                              this.state.callRatioNumerator,
                                              this.state.callRatioDenominator) 
                    }}
            >
              Add
            </Button>
          </Col>
        </Form.Group>
      </div>
    );
  }

  // Straddle, Strangle , IronFly , PutButterfly,CallButterfly , PutSpread , CallSpread, PutRatio, CallRatio
  strategyNameList = () => {
    return (
      <div style={{minWidth: "300px"}}>
        <Accordion defaultActiveKey="">
          <Card body>
            
              Straddle
              <Button variant="primary" 
                      onClick={() => {this.addColumnListData("straddle","", "", "")}}
                      style={{float: "right"}}
              >
                Add
              </Button>

          </Card>

          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="2">
              Strangle
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <Card.Body>{this.strangleStructure()}</Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="3">
              IronFly
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="3">
              <Card.Body>{this.ironFlyStructure()}</Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="4">
              PutButterfly
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="4">
              <Card.Body>{this.putButterflyStructure()}</Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="5">
              CallButterfly
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="5">
              <Card.Body>{this.callButterflyStructure()}</Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="6">
              PutSpread
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="6">
              <Card.Body>{this.putSpreadStructure()}</Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="7">
              CallSpread
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="7">
              <Card.Body>{this.callSpreadStructure()}</Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="8">
              PutRatio
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="8">
              <Card.Body>{this.putRatioStructure()}</Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="9">
              CallRatio
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="9">
              <Card.Body>{this.callRatioStructure()}</Card.Body>
            </Accordion.Collapse>
          </Card>

        </Accordion>
      </div>
    );
  }

  // ----------------------------- Table Structure --------------------------

  getTableStructure = (res) => {
    return (
      <>
      <thead>
        <tr>
          {res && res.data.length>0 && Object.keys(res.data[0]).map((val, index) => (
            <th key={index}
                style = {{
                  paddingTop: '5px',
                }}

            >
              <div  style={{float: 'right', cursor: 'pointer'}}
                    onClick={(event) => {this.deleteColumn(event, val)}}
              > 
                <Badge variant="danger">x</Badge>
              </div>

              {val}
            </th>
          ))}
        </tr>
      </thead>
      </>
    )
  };

  getTableData = (res) => {
    return (
      <>
      <tbody>
        {res && res.data.length>0 && Object.keys(res.data).map((outerVal, outerInd) => {
          return (
            <tr key={outerInd}>
              {Object.keys(res.data[outerVal]).map((innerVal, innerInd) => {
                return (
                  <th key={`${innerInd}-${outerInd}`}
                      style = {{
                      display: null,
                    }}
                    //className={(res.data.length-1)/2 !== outerInd ? `tableColumn-${innerInd+1}` : null }
                    //id={this.checkBorderID(outerInd+1,innerInd+1, res.data.length)}
                  >
                    {res.data[outerVal][innerVal]}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </tbody>
      </>
    )
  };

  getTable = (res) => {

    let newTableStructure = this.getTableStructure(res);
    let newTableData = this.getTableData(res);

    this.setState({
      tableStructure: newTableStructure,
      tableData: newTableData,
    })

    return(
      <Table striped bordered size="sm">
        {this.state.tableStructure}
        {this.state.tableData}
      </Table>
    )
  };

  // ---------------------------- Delete Column -------------------------------------

  deleteColumn = (event, dcol) => {
    
    console.log(this.state.responseData.data)
    //console.log(dcol);

    let newResponseData = Object.keys(this.state.responseData.data).map((rowInd) => {
      //console.log(row)
      return (
        Object.keys(this.state.responseData.data[rowInd]).filter((colName) => {
          return (
            this.state.responseData.data[rowInd][colName!==dcol]
          )
        })
      )
    })

    console.log(newResponseData)

    this.setState({
      responseData: newResponseData,
    })

    let newTable = this.getTable(this.state.responseData)

    console.log(newTable)

    this.setState({
      table: newTable,
    })

    this.forceUpdate();

  };

  // --------------- submitHandler and send requests after fix interval ----------------

  submitHandler = (event) => {
    event.preventDefault();

    clearInterval(this.interval);

    const reqData = {
      ticker: this.state.tickerValue,
      expiry: this.state.expiryValue,
      strikeDistance: this.state.strikeDistanceValue,
      totContracts: this.state.totContractsValue,
    };

    console.log("request:", reqData);

    this.interval = setInterval(() => {
      if ((this.state.flag === true) && ((this.state.tickerValue==='BANKNIFTY' && this.state.strikeDistanceValue==='50') === false) ) {
        this.setState({
          flag: false,
        });
        if (reactLocalStorage.get("accessToken")) {
          axios
            .get("http://localhost:5000/strategies",
                  { params: { ticker: this.state.tickerValue,
                              expiry: this.state.expiryValue,
                              strikeDistance: this.state.strikeDistanceValue,
                              totContracts: this.state.totContractsValue,
                              accessToken: reactLocalStorage.get("accessToken"),
                              API_Key: reactLocalStorage.get("API_Key"),
                              strategies: JSON.stringify(this.state.columnListData)
                            }
                  }
            )
            .then((response) => {
              console.log("url post:", response);
              this.setState({
                responseData: response,
              })
              let newTable = this.getTable(response);

              this.setState({
                table: newTable,
                flag: true,
              });
            })
            .catch((error) => {
              console.log(error);
              /*this.setState({
                flag: true,
              })*/
            });
        }
      }
    }, 1000);

    //console.log(this.state.dataBlocks);
  };

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

        <div className="container containerOption">
          <form onSubmit={this.submitHandler}>
            <Row>

              <Col >
                <DropdownButton
                  id="strategyDropdownMenu"
                  title={this.state.strategyName}
                  //onSelect={this.updateStrategyNameLabel}
                >
                  {this.strategyNameList()}
                </DropdownButton>
              </Col>

              <Col>
                <DropdownButton
                  id="tickerDropdownMenu"
                  title={this.state.tickerValue}
                  onSelect={this.updateTickerLabel}
                >
                  <Dropdown.Item eventKey="NIFTY">NIFTY</Dropdown.Item>
                  <Dropdown.Item eventKey="BANKNIFTY">BANKNIFTY</Dropdown.Item>
                </DropdownButton>
              </Col>

              <Col>
                <DropdownButton
                  id="expiryDropdownMenu"
                  title={`Expiry - ${this.state.expiryValue}`}
                  onSelect={this.updateExpiryLabel}
                >
                  {this.state.expiryListData}
                </DropdownButton>
              </Col>

              <Col>
                <DropdownButton
                  id="strikeDistanceDropdownMenu"
                  title={`Strike distance - ${this.state.strikeDistanceValue}`}
                  onSelect={this.updateStrikeDistanceLabel}
                >
                  <Dropdown.Item
                    eventKey="50"
                    //disabled={this.state.tickerValue==='BANKNIFTY'}
                    style={{
                      display:
                        this.state.tickerValue === "BANKNIFTY"
                          ? "none"
                          : "block",
                    }}
                  >
                    50
                  </Dropdown.Item>
                  <Dropdown.Item eventKey="100">100</Dropdown.Item>
                  <Dropdown.Item eventKey="500">500</Dropdown.Item>
                </DropdownButton>
              </Col>

              <Col>
                <DropdownButton
                  id="totContractsDropdownMenu"
                  title={`No. of Contracts - ${this.state.totContractsValue}`}
                  onSelect={this.updateTotContractsLabel}
                >
                  {this.contractNumbersList()}
                </DropdownButton>
              </Col>

              <Col>
                <Button type="submit" variant="success">
                  {" "}
                  Show!!{" "}
                </Button>
              </Col>
            </Row>
          </form>
        </div>

        <div className="container containerTable">
          <div className="table-responsive">
            {this.state.table}
          </div>
        </div>
        
      </div>
    )
  }
}

export default Dashboard2
