import { createAction } from "@reduxjs/toolkit";
export const fetchDetailArticles = createAction("FETCH_DETAIL_ARTICLES");

export const createArticles = createAction("CREATE_ARTICLES");
export const addComments = createAction("ADD_COMMENTS");
export const fetchAllComments = createAction("FETCH_ALL_COMMENTS");

export const fetchMyArticles = createAction("FETCH_MY_ARTICLES");
export const fetchArticlesByType = createAction("FETCH_ARTICLES_BY_TYPE");

export const deleteArticles = createAction("DELETE_ARTICLES");
export const favoritedArticles = createAction("FAVORITED_ARTICLES");
export const unfavoritedArticles = createAction("UNFAVORITED_ARTICLES");
export const updateArticle = createAction("UPDATE_ARTICLES");
export const deleteComment = createAction("DELETE_COMMENT");
