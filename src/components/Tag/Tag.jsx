import React from "react";
import { Col } from "react-bootstrap";
import { fetchAllTag } from "../../Store/actions/tag.actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import styles from "./styles.module.css";
import { setCurrentTag } from "../../Store/slices/articles.slice";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function Tag(props) {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tag.allTagData);
  if (!tags) {
    return  <Skeleton count={5}/>;
  }
  useEffect(() => {
    dispatch(fetchAllTag());
  }, [dispatch]);
  const handleTagchange = (tag) => {
    dispatch(setCurrentTag(tag));
  };
  return (
    <Col md={3} sm = {12} className={`${styles.tagsComponent} tagsComponent`}>
      <h5 className={styles.popularTags}>Tags</h5>
      <div className={styles.tagWrapper}>
        {tags?tags?.map((tag) => {
          return (
            <div
              key={tag}
              onClick={() => handleTagchange(tag)}
              className={styles.tag}
            >
              {tag}
            </div>
          );
        }):<Skeleton count={5}/>}
      </div>
    </Col>
  );
}

export default Tag;
