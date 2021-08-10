import User from "../models/User.js"
import fetch from "node-fetch"
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
    const user = await User.findOne({ username, socialLogin: false });
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

export const githubStart = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id: process.env.GITHUB_CLIENT,
        allow_signup: false,
        scope: "read:user user:email",
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;

    return res.redirect(finalUrl);
}

export const githubFinish = async (req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.GITHUB_CLIENT,
        client_secret: process.env.GITHUB_SECRET,
        code: req.query.code
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const tokenRequest = await (
        await fetch(finalUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
            },
        })
    ).json();
    if("access_token" in tokenRequest){
        const { access_token } = tokenRequest;
        const apiUrl = "https://api.github.com"
        const userData = await (
            await fetch(`${apiUrl}/user`, {
                headers: {
                    Authorization: `token ${access_token}`,
                },
            })
        ).json();
        const emailData = await(
            await fetch(`${apiUrl}/user/emails`, {
                headers: {
                    Authorization: `token ${access_token}`,
                }
            })
        ).json();
        const email = emailData.find(email => email.primary === true && email.verified === true).email;
        if(!email){
            return res.redirect("/login"); //will add error message
        }
        let user = await User.findOne({ email });
        if(!user){
            user = await User.create({
                name: userData.name,
                avatarUrl: userData.avatar_url,
                socialLogin: true, 
                email: email, 
                username: userData.login, 
                password: "", 
                location: userData.location,
            });
        req.session.loggedIn = true;
        req.session.user = user;
        console.log(`${user.username} is loged in`)
        return res.redirect("/");
        }    
    }else {
        return res.redirect("/login");
    }

}

export const edit = (req, res) => res.send("Edit User");
export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/")
}
export const seeUser = (req, res) => res.send("See User");