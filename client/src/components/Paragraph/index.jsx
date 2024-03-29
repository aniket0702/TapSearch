import React, { Component } from "react";
import { Card, Empty } from "antd";

class Paragraph extends Component {
  state = {};
  render() {
    if (this.props.paragraph !== null && this.props.paragraph.length > 0) {
      const paragraph = this.props.paragraph;
      console.log(paragraph);
      return this.props.paragraph.map((item, index) => (
        <React.Fragment>
          <Card>{item}</Card>
          <br />
        </React.Fragment>
      ));
    } else {
      return <Empty />;
    }
  }
}

export default Paragraph;
