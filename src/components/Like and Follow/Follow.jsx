import React from "react";
import { useDispatch } from "react-redux";
import styles from "../ArticleDetail/styles.module.css";
import AddIcon from "@mui/icons-material/Add";
import { follow, unFollow } from "../../Store/actions/auth.action";
import { toggleFollow } from "../../Store/slices/articles.slice";
import { useParams } from "react-router-dom";
function Follow(props) {
  const { slug } = useParams();
  const author = props.author;
 
  const dispatch = useDispatch();
  const handleClick = () => {
    if (author?.following == true) {
      dispatch(unFollow(author?.username));
      dispatch(toggleFollow({ slug, following: false }));
    } else {
      dispatch(follow(author?.username));
      dispatch(toggleFollow({ slug, following: true }));
    }
  };
  return (
    <button className="btn btn-outline-secondary" onClick={handleClick}>
      <span>
        <AddIcon fontSize="small" className={styles.spanIcon} />
      </span>
      {author?.following ? "unfollow" : "follow"} {author?.username}
    </button>
  );
}

export default Follow;
