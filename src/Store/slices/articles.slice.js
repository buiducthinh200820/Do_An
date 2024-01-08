import { createSlice } from "@reduxjs/toolkit";

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    allArticlesData: { articles: [] },
    detailArticle: {},
    allCommentsData: [],
    tab: "",
    createArticlesData: {},
    redirectUrl: "",
    currentTag: "",
  },
  reducers: {
    setArticlesData(state, action) {
      state.allArticlesData = action.payload;
    },
    setDetailArticle(state, action) {
      state.detailArticle = action.payload;
    },
    setCommentsData(state, action) {
      state.allCommentsData = action.payload;
    },
    setTabs(state, action) {
      state.tab = action.payload;
    },
    setCreateArticles(state, action) {
      state.createArticlesData = action.payload;
    },
    setRedirect(state, action) {
      state.redirectUrl = action.payload;
    },
    clearRedirect(state) {
      state.redirectUrl = null;
    },
    setCurrentTag(state, action) {
      state.currentTag = action.payload;
    },
    toggleArticleFavorite(state, action) {
      const { slug, favorited } = action.payload;

      const articleIndex = state.allArticlesData.articles.findIndex(
        (article) => article.slug === slug
      );

      if (articleIndex !== -1) {
        return {
          ...state,
          allArticlesData: {
            ...state.allArticlesData,
            articles: state.allArticlesData.articles.map((article, index) => {
              if (index === articleIndex) {
                console.log(favorited);
                return {
                  ...article,
                  favorited: favorited,
                  favoritesCount: article.favoritesCount + (favorited ? 1 : -1),
                };
              }
              return article;
            }),
          },
        };
      }

      return state;
    },
    toggleFollow(state, action) {
      const { slug, follow } = action.payload;

      const articleIndex = state.allArticlesData.articles.findIndex(
        (article) => article.slug === slug
      );

      if (articleIndex !== -1) {
        return {
          ...state,
          allArticlesData: {
            ...state.allArticlesData,
            articles: state.allArticlesData.articles.map((article, index) => {
              if (index === articleIndex) {
                return {
                  ...article.author,
                  following: follow,
                };
              }
              
              return article;
            }),
          },
        };
      }

      return state;
    },

    toggleDetailFavorited(state, action) {
      const { favorited } = action.payload;

      return {
        ...state,
        detailArticle: {
          ...state.detailArticle,
          article: {
            ...state.detailArticle.article,
            favorited: favorited,
            favoritesCount:
              state.detailArticle.article?.favoritesCount + (favorited ? 1 : -1),
          },
        },
      };
    },
  },
});

export const {
  setArticlesData,
  setDetailArticle,
  setCommentsData,
  setTabs,
  setCreateArticles,
  setRedirect,
  clearRedirect,
  setCurrentTag,
  toggleArticleFavorite,
  toggleFollow,
  toggleDetailFavorited,
} = articlesSlice.actions;

export default articlesSlice.reducer;
