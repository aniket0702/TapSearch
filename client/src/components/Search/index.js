import React, { Component } from "react";
import request from "request";
import { AutoComplete, Button, Col, Row } from "antd";
import Paragraph from "../../components/Paragraph";
import api from "../../utils/api";

class Search extends Component {
  state = {
    dataSource: [],
    dataDisplayed: [],
    value: null,
    paragraphs: null,
    isRendering: false
  };
  componentWillMount = () => {
    var refThis = this;
    request.get(
      {
        url: api + "getallwords",
        headers: {
          "content-type": "application/json"
        }
      },
      function(error, response, body) {
        if (error === null) {
          body = JSON.parse(body);
          console.log(body);
          if (body["success"] === true) {
            refThis.setState(
              {
                dataSource: body["body"]["words"],
                dataDisplayed: body["body"]["words"]
              },
              () => {
                console.log(refThis.state.dataSource);
              }
            );
          }
        }
      }
    );
  };

  onSearch = searchText => {
    let dataDisplayed = [];
    let dataSource = this.state.dataSource;
    for (let i = 0; i < dataSource.length; i++) {
      if (dataSource[i].includes(searchText)) {
        dataDisplayed.push(dataSource[i]);
      }
    }
    this.setState({
      dataDisplayed: dataDisplayed
    });
  };

  onChange = value => {
    this.setState({ value });
  };

  handleClick = () => {
    console.log(this.state.value);
    const value = this.state.value;
    const refThis = this;
    this.setState({
      isRendering: true
    });
    request.get(
      {
        url: api + "search",
        headers: {
          "content-type": "application/json"
        },
        qs: {
          search: value
        }
      },
      function(error, response, body) {
        refThis.setState({
          isRendering: false
        });
        if (error === null) {
          body = JSON.parse(body);
          if (body["success"] === true) {
            const paragraphs = body["body"];
            if (paragraphs !== null) {
              refThis.setState({
                paragraphs
              });
            }
          }
        }
      }
    );
  };

  render() {
    const { dataDisplayed, value } = this.state;
    console.log(dataDisplayed);
    return (
      <React.Fragment>
        <Row style={{ marginLeft: 40, marginRight: 40 }}>
          <Col span={4}>Enter the word to be searched</Col>
          <Col span={8} align="right">
            <AutoComplete
              dataSource={dataDisplayed}
              style={{ width: 200 }}
              onSearch={this.onSearch}
              onChange={this.onChange}
              placeholder="input here"
              value={value}
            />
          </Col>
          <Col span={1}></Col>
          <Col span={7}>
            {this.state.isRendering === true && (
              <Button
                htmlType="submit"
                type="primary"
                onClick={this.handleClick}
                disabled="true"
              >
                Search
              </Button>
            )}

            {this.state.isRendering === false && (
              <Button
                htmlType="submit"
                type="primary"
                onClick={this.handleClick}
              >
                Search
              </Button>
            )}
          </Col>

          <Col span={4}></Col>
        </Row>
        <br />
        <br />
        <Paragraph paragraph={this.state.paragraphs} />
      </React.Fragment>
    );
  }
}

export default Search;
