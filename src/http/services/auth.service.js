import { conduitAxios, conduitAxiosCredentials } from "../axios-instance";

class authService {
  login = async ({ email, password }) => {
    try {
      const response = await conduitAxios.post("users/login", {
        user: { email, password },
      });
      if (response.data.error) {
        console.log(response);
        return { error: response.data.error };
      } else {
        const token = response.data.user.token;
        localStorage.setItem("token", JSON.stringify(token));
        return { user: response.data.user };
      }
    } catch (error) {
      return {
        error: error,
      };
    }
  };

  fetchRegisterUser = async (userData) => {
    try {
      const response = await conduitAxios.post("users", {
        user: userData,
      });

      const token = response.data.user.token;
      localStorage.setItem("token", JSON.stringify(token));

      return response.data;
    } catch (error) {
      return {
        error: error,
      };
    }
  };

  getCurrentUser = async () => {
    try {
      const response = await conduitAxiosCredentials.get("user");

      return response.data;
    } catch (error) {
      return {
        error: error,
      };
    }
  };

  updateUser = async (formData) => {
    const data = { user: formData };
    try {
      const response = await conduitAxiosCredentials.put("user", data);

      return response.data;
    } catch (error) {
      return {
        error: error,
      };
    }
  };
  getProfile = async (username) => {
    try {
      const response = await conduitAxiosCredentials.get(
        `profiles/${username}`
      );

      return response.data;
    } catch (error) {
      return {
        error: error,
      };
    }
  };
  follow = async (username) => {
    try {
      const response = await conduitAxiosCredentials.post(
        `profiles/${username}/follow`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      return {
        error: error,
      };
    }
  };
  unfollow = async (username) => {
    try {
      const response = await conduitAxiosCredentials.delete(
        `profiles/${username}/follow`
      );
     
      return response.data;
    } catch (error) {
      return {
        error: error,
      };
    }
  };
}

export default new authService();
