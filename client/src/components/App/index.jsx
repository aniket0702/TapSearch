import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Layout, Menu, Button, Row, Col } from "antd";
import request from "request";
import Index from "../../components/Index";
import Search from "../../components/Search";
import api from "../../utils/api";
import PDFIndex from "../PDFIndex";

const { Header, Content, Footer } = Layout;

class App extends Component {
  state = {};
  handleClick = () => {
    request.delete(
      {
        url: api + "clear",
        headers: {
          "content-type": "application/json"
        }
      },
      function(error, response, body) {
        if (error === null) {
          console.log("Cleared");
        }
      }
    );
  };
  render() {
    return (
      <Layout>
        <Router>
          <Header style={{ position: "fixed", zIndex: 5, width: "100%" }}>
            <div className="logo" />

            <Menu
              theme="dark"
              mode="horizontal"
              // defaultSelectedKeys={["1"]}
              style={{ lineHeight: "64px" }}
            >
              <Menu.Item key="1">
                <Link to="/">Index</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/search">Search</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/index_pdf">Index PDF</Link>
              </Menu.Item>
            </Menu>
          </Header>
          <br />
          <br />
          <Content style={{ marginTop: 64 }}>
            <div style={{ background: "#fff", padding: 30, minHeight: 560 }}>
              <h1 textAlign="center">TapSearch</h1>
              <Switch>
                <Route path="/search">
                  <Search />
                </Route>
                <Route path="/index_pdf">
                  <PDFIndex></PDFIndex>
                </Route>
                <Route path="/">
                  <Index />
                </Route>
              </Switch>
              <br />
              <Row align="center" style={{ marginBottom: 10 }}>
                <Col align="center">
                  <Button type="danger" onClick={this.handleClick}>
                    Clear
                  </Button>
                </Col>
              </Row>
            </div>
          </Content>
        </Router>

        <Footer style={{ textAlign: "center" }}>TapSearch</Footer>
      </Layout>
    );
  }
}

export default App;
