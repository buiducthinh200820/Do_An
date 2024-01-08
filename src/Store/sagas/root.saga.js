import {
  fetchUser,
  getCurrentUser,
  updateUser,
  getProfile,
  follow,
  unFollow,
} from "../actions/auth.action";
import {
  checkCurrentUser,
  checkLoginSaga,
  registerUserSaga,
  updateUserSaga,
  getProfileSaga,
  followUser,
  unfollowUser,
} from "../sagas/auth.sage";
import { createUser } from "../actions/auth.action";

import {
  createArticleSaga,
  fetchDetailArticlesSaga,
  fetchCommentsSaga,
  addCommentsSaga,
  fetchArticlesByTypeSaga,
  deleteArticlesSaga,
  favoritedArticlesSaga,
  unFavoritedArticlesSaga,
  updateArticleSaga,
  deleteCommentsSaga,
} from "./articles.saga";
import { all, takeEvery, takeLatest } from "redux-saga/effects";
import {
  createArticles,
  fetchDetailArticles,
  fetchAllComments,
  addComments,
  fetchArticlesByType,
  deleteArticles,
  favoritedArticles,
  unfavoritedArticles,
  updateArticle,
  deleteComment,
} from "../actions/articles.action";
import { fetchTagSaga } from "./tag.saga";
import { fetchAllTag } from "../actions/tag.actions";
export function* rootSaga() {
  yield all([
    takeEvery(fetchUser, checkLoginSaga),
    takeEvery(getCurrentUser, checkCurrentUser),
    takeEvery(updateUser, updateUserSaga),
    takeEvery(createUser, registerUserSaga),
    takeEvery(createArticles, createArticleSaga),
    takeEvery(fetchAllTag, fetchTagSaga),
    takeEvery(fetchDetailArticles, fetchDetailArticlesSaga),
    takeEvery(fetchAllComments, fetchCommentsSaga),
    takeEvery(addComments, addCommentsSaga),
    takeLatest(fetchArticlesByType, fetchArticlesByTypeSaga),
    takeEvery(deleteArticles, deleteArticlesSaga),
    takeEvery(favoritedArticles, favoritedArticlesSaga),
    takeEvery(unfavoritedArticles, unFavoritedArticlesSaga),
    takeEvery(updateArticle, updateArticleSaga),
    takeEvery(getProfile, getProfileSaga),
    takeEvery(follow, followUser),
    takeEvery(unFollow, unfollowUser),
    takeEvery(deleteComment, deleteCommentsSaga),
  ]);
}
