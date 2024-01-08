import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  favoritedArticles,
  unfavoritedArticles,
} from "../../Store/actions/articles.action";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  toggleArticleFavorite,
  toggleDetailFavorited,
} from "../../Store/slices/articles.slice";
import { useNavigate } from "react-router-dom";
function Like({ article }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const handleLike = ({ slug, favorited }) => {
    if (isLoggedIn === true) {
      if (favorited === false) {
        dispatch(favoritedArticles({ slug }));
        dispatch(toggleArticleFavorite({ slug, favorited: !favorited }));
        dispatch(toggleDetailFavorited({ slug, favorited: !favorited }));
      } else if (favorited === true) {
        dispatch(unfavoritedArticles({ slug }));
        dispatch(toggleArticleFavorite({ slug, favorited: !favorited }));
        dispatch(toggleDetailFavorited({ slug, favorited: !favorited }));
      }
    } else {
      navigate("../login");
    }
  };
  
  return (
    <button
      onClick={() => handleLike(article)}
      className={`${article?.favorited ? "btn btn-success" : "btn  btn-light"}`}
    >
      <span>
        <FavoriteIcon />
      </span>
      {article?.favoritesCount}
    </button>
  );
}

export default Like;
