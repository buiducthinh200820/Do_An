import { call, put } from "redux-saga/effects";
import { fetchAllComments } from "../actions/articles.action";
import {
  setArticlesData,
  setDetailArticle,
  setCommentsData,
  setCreateArticles,
  setRedirect,
} from "../slices/articles.slice";
import articlesService from "../../http/services/articles.service";

export function* createArticleSaga(action) {
  const response = yield call(articlesService.createArticles, action.payload);
  console.log(response)
  const url = `../articles/${response.article.slug}`;

  yield put(setCreateArticles(response));
  yield put(setRedirect(url));
}

export function* fetchDetailArticlesSaga(action) {
  
  const article = yield call(
    articlesService.fetchDetailArticles,
    action.payload
  );
  yield put(setDetailArticle(article));
}

export function* fetchCommentsSaga(action) {
  const response = yield call(articlesService.fetchAllComment, action.payload);

  yield put(setCommentsData(response.comments));
}

export function* addCommentsSaga(action) {
  yield call(articlesService.addNewComment, action.payload);
  yield put(fetchAllComments(action.payload.slug));
}

export function* fetchArticlesByTypeSaga(action) {
  let type = action.payload.type;
 
  let response;
  
  if (type === "all") {
    response = yield call(articlesService.fetchAllArticles, action.payload);
  } else if (type === "follow") {
    response = yield call(articlesService.fetchArticlesFollow, action.payload);
  } else if (type === "MyArticles") {
    response = yield call(articlesService.fetchMyArticles, action.payload);
    
  } else if (type === "Favorited") {
    response = yield call(
      articlesService.fetchFavoritedArticles,
      action.payload
    );
  } else if (type === "tag") {
    response = yield call(articlesService.fetchTagArticles, action.payload);
  }

  yield put(setArticlesData(response));
}

export function* deleteArticlesSaga(action) {
  const article = yield call(articlesService.deleteArticles, action.payload);
  yield put(setDetailArticle(article));
}
export function* favoritedArticlesSaga(action) {
  const article = yield call(articlesService.favoritedArticles, action.payload);
}
export function* unFavoritedArticlesSaga(action) {
  const article = yield call(
    articlesService.unFavoritedArticles,
    action.payload
  );
}
export function* updateArticleSaga(action) {
  
  const response = yield call(articlesService.updateArticle, action.payload);
  console.log(response);
  const url = `../articles/${response.article?.slug}`;

  
  yield put(setRedirect(url));
}

export function* deleteCommentsSaga(action) {
  yield call(articlesService.deleteComment, action.payload);
  yield put(fetchAllComments(action.payload.slug));
}