import User from "../models/User.js"
import bcrypt from "bcrypt"

export const getJoin = (req, res) => {
    return res.render("join", { pageTitle: "Join" })
}
export const postJoin = async(req, res) => {
    const { name, email, username, password, password2, location} = req.body;
    if(password !== password2){
        return res.status(400).render("join", {
            pageTitle: "Join",
            errorMessage: "Password confirmation does not match."
        })
    }
    const exists = await User.exists({ $or: [{username}, {email}] });
    if(exists){
        return res.status(400).render("join", {
            pageTitle: "Join",
            errorMessage: "This Username or Email is already taken."   
        });
    }
    try{
        await User.create({
            name, 
            email, 
            username, 
            password, 
            location,
        });
        res.redirect("/login");
    } catch(error){
        return res.status(400).render("join", {
            pageTitle: "Join",
            errorMessage: error._message,
        });
    };
}

export const getLogin = (req, res) => {
    return res.render("login", { pageTitle: "Login" })
}
export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const pageTitle = "Login"
    const user = await User.findOne({ username });
    if(!user){
        return res.status(400).render("login", { 
            pageTitle,
            errorMessage: `Can't find username ${username}`,
        })
    }
    const ok = await bcrypt.compare(password, user.password); //return boolean
    if(!ok){
        return res.status(400).render("login", { 
            pageTitle,
            errorMessage: "Wrong password",
        })
    }
    req.session.loggedIn = true;
    req.session.user = user;
    console.log(`${username} is loged in`)
    return res.redirect("/");
}

export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Delete");
export const logout = (req, res) => res.send("Log Out");
export const seeUser = (req, res) => res.send("See User");