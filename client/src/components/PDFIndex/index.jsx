import React, { Component } from "react";
import { Icon, message, Upload, Button, Spin, Row, Col } from "antd";
import api from "../../utils/api";
import request from "request";

class PDFIndex extends Component {
  state = {
    isRendering: false,
    success: null
  };
  uploadVars = {
    name: "file",
    action: api + "upload_pdf",
    headers: {
      authorization: "authorization-text"
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("entered");
    this.setState({
      isRendering: true
    });

    const refThis = this;
    request.post(
      {
        url: api + "index_pdf",
        headers: {
          "content-type": "application/json"
        }
      },
      function(error, response, body) {
        refThis.setState({
          isRendering: false
        });
        if (error === null) {
          console.log(body);
          // body = JSON.parse(body);
          // console.log(body);
          // console.log(body);
          if (body["success"] === true) {
          }
        }
      }
    );
  };
  render() {
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    return (
      <React.Fragment>
        <Row>
          <Col align="center">
            <Upload {...this.uploadVars} accept="application/pdf">
              <Button>
                <Icon type="upload" /> Click to Upload
              </Button>
            </Upload>
          </Col>
        </Row>
        <br />
        <Row>
          <Col align="center">
            {this.state.isRendering === false && (
              <Button htmlType="submit" onClick={this.handleSubmit}>
                Done
              </Button>
            )}
            {this.state.isRendering === true && (
              <React.Fragment>
                <Button
                  htmlType="submit"
                  onclick={this.handleSubmit}
                  disabled={true}
                >
                  Done
                </Button>
                <Spin indicator={antIcon} />
              </React.Fragment>
            )}
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default PDFIndex;
