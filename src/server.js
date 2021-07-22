import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express();
const logger = morgan("dev");


const privateMiddleware = (req, res, next) => {
  const url = req.url;
  if (url === '/protected'){
    return res.send("<h1>Not Allowed</h1>");
  } //cutting procrss (Middleware become controller)
  console.log("Allowed. You may continue.")
  next()  
}

const handleHome = (req, res) => {
  return res.send("<h1>Home<H1>");
};
const handleProtected= (req, res) => {
  return res.send("<h1>this page is protected.<h1>")
};  
const handleAbout = (req, res) => {
  return res.send("<h1>About<H1>");
};
const handleContact = (req, res) => {
  return res.send("<h1>Contact<H1>");
};
const handleLogin = (req, res) => {
  return res.send("<h1>Login<H1>");
};

app.use(logger);
app.use(privateMiddleware);

app.get("/", handleHome);
app.get("/protected", handleProtected)
app.get("/about", handleAbout);
app.get("/contact", handleContact);
app.get("/login", handleLogin);

const handleListening = () => console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);