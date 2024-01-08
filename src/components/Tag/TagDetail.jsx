import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function TagDetail(props) {
  const [data, setData] = useState();

 
  useEffect(() => {
    if (!data) {
      return  <Skeleton count={5}/>;
    }
    const fetchTestData = async () => {
      try {
        const res = await axios.get(
          "https://node-express-conduit.appspot.com/api/articles?tag=tets&limit=20&offset=0"
        );
        
        setData(res.data.articles);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTestData();
  }, []);

  return (
    <Container>
      <Col>
        <Row>Taglist</Row>
        <Row>
          <h1>tets</h1>
        </Row>
        <Row>
          <Button>Follow</Button>
        </Row>
        <Row>
          {data?.map((item, index) => {
            if (index < 2) {
              return (
                <>
                  <Col md={6}>
                    <Row>
                      <img src={item.author.image} alt="" />
                    </Row>
                    <Row>
                      <h2>{item.title}</h2>
                    </Row>
                    <Row>
                      <p>{item.description}</p>
                    </Row>
                  </Col>
                </>
              );
            } else
              return (
                <Col md={4}>
                  <Row>
                    <img src={item.author.image} alt="" />
                  </Row>
                  <Row>
                    <h2>{item.title}</h2>
                  </Row>
                  <Row><p>{item.description}</p></Row>
                </Col>
              );
          })}
        </Row>
      </Col>
    </Container>
  );
}

export default TagDetail;
