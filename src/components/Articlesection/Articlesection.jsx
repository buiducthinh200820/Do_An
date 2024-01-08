import React, { useEffect, useState } from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "../Home/styles.module.css";
import { fetchArticlesByType } from "../../Store/actions/articles.action";
import Like from "../Like and Follow/Like";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
function Articlesection(props) {
  const profile = useSelector((state) => state.auth.profile);
  const user = profile.username;
  const articles = useSelector(
    (state) => state.articles.allArticlesData?.articles
  );
  const articlesCount = useSelector(
    (state) => state.articles.allArticlesData?.articlesCount
  );
  const tab = useSelector((state) => state.articles.tab);
  const tag = useSelector((state) => state.articles.currentTag);

  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 10;
  const totalPages = Math.ceil(articlesCount / articlesPerPage);
  let offset = (currentPage - 1) * articlesPerPage;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(
      fetchArticlesByType({
        type: tab,
        offset,
        articlesPerPage,
        user,
        tag,
      })
    );
  }, [tab, currentPage, dispatch, articlesPerPage, user, tag]);

  const handleProfileClick = (author) => {
    navigate(`/profile/${author}`);
  };
  if (!articles) {
    return  <Skeleton count={50}/>;
  }

  if (articles.length === 0) {
    return <p>No articles found.</p>;
  }

  return (
    <>
      <Container className={styles.articleSectionContainer}>
        <Col md={12}>
          {articles.map((article) => (
            <div key={article.slug}>
              <Row className="article-preview border-bottom p-4">
                <Row className={styles.authorInfo}>
                  <Row>
                    <Col sm={6} md={6}>
                      <Row className="d-flex">
                        <Col xs={1} className="my-auto">
                          <img
                            src={article?.author?.image}
                            className={styles.avatar}
                            alt="avatar"
                          />
                        </Col>
                        <Col className={styles.authorDateName}>
                          <div
                            className={styles.authorName}
                            onClick={() =>
                              handleProfileClick(article.author?.username)
                            }
                          >
                            {article?.author?.username}
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
                    <Col md={6} sm={4} className={styles.favorites}>
                      <Like article={article}></Like>
                    </Col>
                  </Row>
                </Row>
                <Row>
                  <div className={styles.contentArticle}>
                    <Link
                      to={`../articles/${article.slug}`}
                      className={styles.text}
                    >

                     { <h3 className={styles.articleTitle}
                      >{article?.title?.length > 70
                        ? article.title.slice(0, 70) + "..."
                        : article.title}
                      </h3>||<Skeleton count={10}/> }
                      {/* <h3 className={styles.articleTitle}>
                        {article.title}
                        </h3> */}

                      <p className={styles.articleDescription}>
                        {article?.description?.length > 70
                          ? article.description.slice(0, 70) + "..."
                          : article.description}
                      </p>
                      <div className={styles.articleFooter}>
                        <span className={styles.readMore}>Read more...</span>
                        <div className={styles.tagList}>
                          {article?.tagList.map((tag, index) => (
                            <span key={index} className={styles.tags}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </div>
                </Row>
              </Row>
            </div>
          ))}
        </Col>
        {totalPages > 1 ? (
          <Col className="d-flex justify-content-center" md={9}>
            <ul className={`pagination ${styles.pagin}`}>
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <button className="page-link">Previous</button>
              </li>
              {/* Render page numbers */}
              {Array.from({ length: totalPages }, (_, index) => {
                if (
                  index + 1 === 1 ||
                  index + 1 === currentPage ||
                  index + 1 === currentPage - 1 ||
                  index + 1 === currentPage + 1 ||
                  index + 1 === totalPages
                ) {
                  // Render current, adjacent, first, and last page numbers
                  return (
                    <li
                      key={index + 1}
                      className={`page-item ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      <button className="page-link">{index + 1}</button>
                    </li>
                  );
                } else if (
                  (index + 1 === currentPage - 2 && currentPage > 3) ||
                  (index + 1 === currentPage + 2 &&
                    currentPage < totalPages - 2)
                ) {
                  // Render ellipsis before and after the current page
                  return (
                    <li key={index + 1} className="page-item disabled">
                      <button className="page-link">...</button>
                    </li>
                  );
                }
                return null;
              })}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <button className="page-link">Next</button>
              </li>
            </ul>
          </Col>
        ) : null}
      </Container>
    </>
  );
}

export default Articlesection;
