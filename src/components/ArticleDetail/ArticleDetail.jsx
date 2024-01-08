import React from "react";
import { useEffect } from "react";
import { Col, Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteArticles,
  fetchDetailArticles,
} from "../../Store/actions/articles.action";
import Comment from "../Comment/Comment";
import styles from "./styles.module.css";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import Follow from "../Like and Follow/Follow";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getProfile } from "../../Store/actions/auth.action";
import Like from "../Like and Follow/Like";
function ArticleDetail(props) {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const { article } = useSelector((state) => state.articles.detailArticle);
  const author = article?.author?.username;
  const isEdited = user?.username === author;

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchDetailArticles(slug));
    if (author) {
      dispatch(getProfile(author));
    }
  }, [author]);
  const authorToRender = useSelector((state) => state.auth?.profile);
  
  const handleEdit = () => {
    navigate(`/new-article/${slug}`);
  };
  const handleDelete = () => {
    dispatch(deleteArticles(slug));
    navigate("/home");
  };
  const handleProfileClick = (author) => {
    navigate(`/profile/${author}`);
  };
  // if (!article) {
  //   return  <Skeleton count={50}/>;
  // }
  return (
    <>
      <div className={styles.articleDetailContainer}>
        <Container fluid className="bg-dark text-white">
          <Container>
            <Row>
              <Col xs={12} className={styles.articlDetaileHeader}>
                <h2 className="text-uppercase fs-1 fw-bold">
                  {article?.title || <Skeleton />}
                </h2>
                <Row>
                  <Col className="" xs={12}>
                    <Row className="p-2">
                      <Col className={styles.userInfo} sm={12} md={6}>
                        <Row
                          className="d-flex"
                          onClick={() =>
                            handleProfileClick(article?.author?.username)
                          }
                        >
                          <Col xs={1} className="my-auto">
                            {article?.author?.image ? (
                              <img
                                src={article?.author?.image}
                                className={styles.avatar}
                                alt="avatar"
                              />
                            ) : (
                              <Skeleton circle />
                            )}
                          </Col>
                          <Col className={styles.authorDateName}>
                            <div className={styles.authorName}>
                              {article?.author.username || <Skeleton />}
                            </div>
                            <p className={styles.date}>
                              {article?.createdAt ? (
                                new Date(article?.createdAt).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "long",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )
                              ) : (
                                <Skeleton />
                              )}
                            </p>
                          </Col>
                        </Row>
                      </Col>
                      {isEdited ? (
                        <Col
                          className={`${styles.buttonGroup} my-auto px-0 d-flex gap-3`}
                        >
                          <button
                            onClick={handleEdit}
                            className={`${styles.button} btn btn-outline-success`}
                          >
                            <span>
                              <EditIcon
                                fontSize="small"
                                className={styles.spanIcon}
                              />
                            </span>
                            Edit Article
                          </button>
                          <button
                            onClick={handleDelete}
                            className={`${styles.button} btn btn-outline-danger`}
                          >
                            <span>
                              <DeleteIcon
                                fontSize="small"
                                className={styles.spanIcon}
                              />
                            </span>
                            Delete Article
                          </button>
                        </Col>
                      ) : (
                        <Col
                          className={`${styles.buttonGroupFollow} my-auto px-0 d-flex gap-3 alig`}
                        >
                          <Follow
                            className={`${styles.buttonFollow} btn btn-outline-secondary`}
                            author={authorToRender}
                          />

                          <Like article={article} />
                        </Col>
                      )}
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Container>
        <Container xs={9} sm={12} className={styles.detailArticleContent}>
          <Row>
            <Row>
              <p>{article?.body ? article?.body : <Skeleton count={10} />}</p>
              <Row>
                <div className={styles.tagList}>
                  {article?.tagList.map((tag, index) => (
                    <span key={index} className={styles.tags}>
                      {tag}
                    </span>
                  ))}
                </div>
              </Row>
            </Row>
          </Row>
        </Container>
        <Row>
          <Col className=" d-flex py-5 justify-content-center mx-auto" xs={8}>
            <Row>
              <Col xs={12} md={4}>
                <Row className="d-flex">
                  <Col xs={1} className="my-auto">
                    {article?.author.image ? (
                      <img
                        src={article?.author.image}
                        className={styles.avatar}
                        alt="avatar"
                      />
                    ) : (
                      <Skeleton />
                    )}
                  </Col>
                  <Col
                    className={styles.authorDateName2}
                    onClick={() =>
                      handleProfileClick(article?.author?.username)
                    }
                  >
                    <div className={styles.authorName2}>
                      {article?.author.username}
                    </div>
                    <p className={styles.date}>
                      {article?.createdAt
                        ? new Date(article?.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            }
                          )
                        : ""}
                    </p>
                  </Col>
                </Row>
              </Col>
              {isEdited ? (
                <Col
                  className={`${styles.buttonGroup2} my-auto px-0 d-flex gap-3`}
                >
                  <button
                    onClick={handleEdit}
                    className={`${styles.button} btn btn-outline-success`}
                  >
                    <span>
                      <EditIcon fontSize="small" className={styles.spanIcon} />
                    </span>
                    Edit Article
                  </button>

                  <button
                    onClick={handleDelete}
                    className={`${styles.button} btn btn-outline-danger`}
                  >
                    <span>
                      <DeleteIcon
                        fontSize="small"
                        className={styles.spanIcon}
                      />
                    </span>
                    Delete Article
                  </button>
                </Col>
              ) : (
                <Col
                  className={`${styles.buttonGroupFollow2} my-auto px-0 d-flex gap-3`}
                >
                  <Follow
                    className={`${styles.buttonFollow} btn btn-outline-secondary`}
                    author={authorToRender}
                  />
                  <Like className={styles.favorites} article={article} />
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </div>
      {!user ? (
        <div className="text-center" style={{ marginBottom: "100px" }}>
          <Link to={"/login"}>Sign in</Link> or{" "}
          <Link to={"/register"}>sign up</Link> to add comments on this article.
        </div>
      ) : (
        <Comment />
      )}
    </>
  );
}

export default ArticleDetail;
