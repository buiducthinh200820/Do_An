import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createArticles,
  fetchDetailArticles,
  updateArticle,
} from "../../Store/actions/articles.action";
import { clearRedirect } from "../../Store/slices/articles.slice";
import {
  Card,
  CardContent,
  Container,
  Grid,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import styles from "./styles.module.css";
import ClearIcon from "@mui/icons-material/Clear";
function CreateArticle() {
  const {isLoggedIn} =useSelector(state =>state.auth)
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [tag, setTag] = useState("");
  const { article } = useSelector((state) => state.articles.detailArticle);
  const { error, redirectUrl } = useSelector((state) => state.articles);

  const [input, setInput] = useState({
    title: "",
    description: "",
    body: "",
    tagList: [],
  });
useEffect(() => {
  if(!isLoggedIn){
    navigate('/register')
  }
},[]
)
  useEffect(() => {
    if (slug) {
      dispatch(fetchDetailArticles(slug));
    }
  }, [dispatch, slug]);

  useEffect(() => {
    if (slug) {
      setInput({
        title: article.title,
        description: article.description,
        body: article.body,
        tagList: article.tagList,
      });
    }
  }, [slug,article]);

  useEffect(() => {
    if (redirectUrl) {
      navigate(redirectUrl);
      dispatch(clearRedirect());
    }
  }, [redirectUrl, navigate, dispatch]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (slug) {
      const updatedArticle = {
        ...article,
        title: input.title,
        description: input.description,
        body: input.body,
        tagList: input.tagList,
      };
      dispatch(updateArticle(updatedArticle));
    } else {
      const newArticle = {
        title: input.title,
        description: input.description,
        body: input.body,
        tagList: input.tagList,
      };
      dispatch(createArticles(newArticle));
    }
    setInput({
      title: "",
      description: "",
      body: "",
      tagList: [],
    });
  };
  const handleAddTag = (event) => {
    event.preventDefault();
    if (tag.trim().length == 0) return;
    setInput((prev) => {
      return { ...prev, tagList: [...prev.tagList, tag] };
    });
    setTag("");
  };
  const handleRemoveTag = (indexToRemove) => {
    setInput((prev) => {
      const updatedTagList = [...prev.tagList];
      updatedTagList.splice(indexToRemove, 1);
      return { ...prev, tagList: updatedTagList };
    });
  };
  return (
    <Container className={styles.createArticleContainer}>
      <Card sx={{ mt: 5 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            {slug ? "Edit Article" : "Create Article"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Article Title"
                  type="text"
                  value={input.title}
                  name="title"
                  onChange={handleInput}
                  inputProps={{
                    maxLength: 100, 
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="What's this article about?"
                  type="text"
                  value={input.description}
                  name="description"
                  onChange={handleInput}
                  inputProps={{
                    maxLength: 150, 
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Write your article (in markdown)"
                  multiline
                  rows={10}
                  value={input.body}
                  name="body"
                  onChange={handleInput}
                  inputProps={{
                    maxLength: 500, 
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  label="Enter tags"
                  value={tag}
                  name="tagList"
                  onChange={(e) => setTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddTag(e);
                    }
                  }}
                  fullWidth
                  placeholder="Write your Tag then press enter to add"
                />
                {input.tagList.map((tag, index) => (
                  <p key={index} className={styles.tagList}>
                    <span
                      onClick={() => handleRemoveTag(index)}
                      className={styles.iconRemoveTag}
                    >
                      {" "}
                      <ClearIcon fontSize="small" />
                    </span>{" "}
                    {tag}
                  </p>
                ))}
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  {slug ? "Update Article" : "Create Article"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
}

export default CreateArticle;
