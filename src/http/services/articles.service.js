import { conduitAxios, conduitAxiosCredentials } from "../axios-instance";

class ArticlesService {
  fetchAllArticles = async ({ offset, articlesPerPage }) => {
    try {
      const res = await conduitAxiosCredentials.get(
        `/articles?offset=${offset}&limit=${articlesPerPage}`
      );

      return res.data;
    } catch (error) {
      return {
        error: error,
      };
    }
  };
  fetchArticlesFollow = async ({ offset, articlesPerPage }) => {
    try {
      const res = await conduitAxiosCredentials.get(
        `/articles/feed?offset=${offset}&limit=${articlesPerPage}`
      );

      return res.data;
    } catch (error) {
      return {
        error: error,
      };
    }
  };
  createArticles = async (articles) => {
    try {
      const config = { article: articles };

      const res = await conduitAxiosCredentials.post("/articles", config);
      return res.data;
    } catch (error) {
      return {
        error: error,
      };
    }
  };
  fetchDetailArticles = async (slug) => {
    
    try {
      const res = await conduitAxiosCredentials.get(`/articles/${slug}`);

      return res.data;
    } catch (error) {
      return {
        error: error,
      };
    }
  };
  addNewComment = async ({ slug, input }) => {
    try {
      const config = {
        comment: {
          body: input,
        },
      };

      const res = await conduitAxiosCredentials.post(
        `/articles/${slug.slug}/comments`,
        config
      );

      return res;
    } catch (error) {
      console.log(error);
    }
  };
  fetchAllComment = async ({ slug }) => {
    try {
      let token;
      if (localStorage.getItem("token")) {
        try {
          token = JSON.parse(localStorage.getItem("token"));
        } catch (error) {
          console.log(error);
        }
      }

      const config = {
        headers: {
          Authorization: `Token ${token}`,
        },
      };

      const res = await conduitAxios.get(`/articles/${slug}/comments`, config);

      return res.data;
    } catch (error) {
      return {
        error: error,
      };
    }
  };
  deleteComment = async ({ slug, id }) => {
    try {
      
      console.log(slug)
      const res = await conduitAxiosCredentials.delete(
        `/articles/${slug.slug}/comments/${id}`
      );

      return res;
    } catch (error) {
      console.log(error);
    }
  };
  fetchMyArticles = async ({ offset, articlesPerPage, user }) => {

    try {
      const res = await conduitAxiosCredentials.get(
        `/articles?author=${user}&offset=${offset}&limit=${articlesPerPage}`
      );

      return res.data;
    } catch (error) {
      return {
        error: error,
      };
    }
  };
  fetchFavoritedArticles = async ({ offset, articlesPerPage, user }) => {
    try {
      const res = await conduitAxiosCredentials.get(
        `/articles?favorited=${user}&offset=${offset}&limit=${articlesPerPage}`
      );

      return res.data;
    } catch (error) {
      return {
        error: error,
      };
    }
  };
  fetchTagArticles = async ({ offset, articlesPerPage, tag }) => {
    try {
      const res = await conduitAxiosCredentials.get(
        `/articles?offset=${offset}&limit=${articlesPerPage}&tag=${tag}`
      );

      return res.data;
    } catch (error) {
      return {
        error: error,
      };
    }
  };
  
  deleteArticles = async (slug) => {
    try {
      const res = await conduitAxiosCredentials.delete(`/articles/${slug}`);

      return res.data;
    } catch (error) {
      return {
        error: error,
      };
    }
  };

  favoritedArticles = async ({ slug }) => {
    try {
      const res = await conduitAxiosCredentials.post(
        `/articles/${slug}/favorite`
      );

      return res.data;
    } catch (error) {
      return {
        error: error,
      };
    }
  };

  unFavoritedArticles = async ({ slug }) => {
    try {
      const res = await conduitAxiosCredentials.delete(
        `/articles/${slug}/favorite`
      );

      return res.data;
    } catch (error) {
      return {
        error: error,
      };
    }
  };

  updateArticle = async (article) => {
    try {
      const config = { article: article };

      const res = await conduitAxiosCredentials.put(
        `/articles/${article.slug}`,
        config
      );
      return res.data;
    } catch (error) {
      return {
        error: error,
      };
    }
  };
}
export default new ArticlesService();
