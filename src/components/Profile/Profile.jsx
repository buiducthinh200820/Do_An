import React, { useEffect } from "react";
import { Col, Nav, Row, Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Articlesection from "../Articlesection/Articlesection";

import { setTabs, setArticlesData } from "../../Store/slices/articles.slice";
import SettingsIcon from "@mui/icons-material/Settings";
import styles from "./styles.module.css";
import { getProfile } from "../../Store/actions/auth.action";
import Follow from "../Like and Follow/Follow";

const Profile = () => {
  const { userName } = useParams();
  useEffect(() => {
    dispatch(getProfile(userName));
    dispatch(setTabs("MyArticles"));
  }, [userName]);
  const user = useSelector((state) => state.auth.profile);
 
  const userLogin = useSelector((state) => state.auth.user);
  const isMyProfile = user?.username == userLogin?.username;
  const dispatch = useDispatch();
  const handleTabChange = (tab) => {
    dispatch(setTabs(tab));
  };

  return (
    <>
      <Row className={styles.userInfro}>
        <Container>
          <Row>
            <Col className="col-xs-12 col-md-10 offset-md-1">
              <img className={styles.userImg} src={user?.image} />
              <h3>{user.username}</h3>
              <p className={styles.textBio}>{user?.bio}</p>
              {isMyProfile ? (
                <Link
                  className={`btn btn-sm btn-outline-secondary action-btn ${styles.buttonEditeProfile}`}
                  to="../settings"
                >
                  <span>
                    <SettingsIcon fontSize="small" className={styles.icon} />
                  </span>{" "}
                  Edit Profile Settings
                </Link>
              ) : (
                <Follow author={user}/>
              )}
            </Col>
          </Row>
        </Container>
      </Row>
      <Container>
        <Row className="justify-content-center">
          <Col md={9} className="mt-3">
            <Nav variant="tabs" defaultActiveKey="MyArticles">
              <Nav.Item>
                <Nav.Link
                  eventKey="MyArticles"
                  onClick={() => handleTabChange("MyArticles")}
                >
                  My article
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="Favorited"
                  onClick={() => handleTabChange("Favorited")}
                >
                  Favorited Article
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Articlesection />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
