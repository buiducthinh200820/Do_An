import React, { useEffect, useState } from "react";
import { Col, FormGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchAllComments,
  addComments,
  deleteComment,
} from "../../Store/actions/articles.action";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { Card } from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "./styles.module.css";

function Comment(props) {
  const slug = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const comments = useSelector((state) => state.articles.allCommentsData);
  const [input, setInput] = useState("");

  const handdleAddComment = (e) => {
    e.preventDefault();
    dispatch(addComments({ slug, input }));
    setInput("");
  };
  useEffect(() => {
    dispatch(fetchAllComments(slug));
  }, []);
  const handdleDelete = (id) => {
    dispatch(deleteComment({ slug, id }));
  };
  return (
    <div>
      <Row>
        <Col xs={9} md={6} className="mx-auto">
          <Form className="card bg-light">
            <Form.Control
              className="p-3"
              placeholder="Write a comment..."
              as="textarea"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="With textarea"
            />
            <Row
              className="p-3 d-flex align-item-center  card-footer"
              style={{ width: "100%", marginLeft: "0px" }}
            >
              <Col>
                <img src={user.image} alt="" className={styles.avatar} />
              </Col>
              <Col className="d-flex justify-content-end">
                <Button
                  className="text-end"
                  type="submit"
                  onClick={(e) => handdleAddComment(e)}
                >
                  submit
                </Button>
              </Col>
            </Row>
          </Form>

          <Col xs={12} style={{ marginBottom: "100px" }}>
            {comments?.map((comment) => {
              return (
                <Form
                  className="card p-0"
                  key={comment.id}
                  style={{ marginTop: "15px" }}
                >
                  <Card.Text className="p-3 mb-0">{comment.body}</Card.Text>
                  <Row
                    className="p-3 d-flex align-item-center bg-light card-footer"
                    style={{ width: "100%", marginLeft: "0px" }}
                  >
                    <Col className={styles.footerComment}>
                      <Link
                        className={styles.userInfoComment}
                        to={`/profile/${comment.author?.username}`}
                      >
                        <img
                          src={user.image}
                          alt="avatar"
                          className={styles.avatar}
                        />
                        <span className={styles.userNameComment}>
                          {user.username}
                        </span>
                      </Link>
                      <span className={styles.dateComment}>
                        {comment?.createdAt
                          ? new Date(comment?.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              }
                            )
                          : ""}
                      </span>
                    </Col>
                    <Col
                      xs={3}
                      className="d-flex justify-content-end"
                      onClick={() => handdleDelete(comment.id)}
                    >
                      <span>
                        <DeleteIcon fontSize="small" />
                      </span>
                    </Col>
                  </Row>
                </Form>
              );
            })}
          </Col>
        </Col>
      </Row>
    </div>
  );
}

export default Comment;
