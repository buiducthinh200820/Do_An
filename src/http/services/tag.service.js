import { conduitAxios } from "../axios-instance";

class tagService {
  fetchAllTag = async () => {
    try {
      const res = await conduitAxios.get("/tags");
      return res.data.tags;
    } catch (error) {
      return {
        error: error,
      };
    }
  };
}
export default new tagService();
