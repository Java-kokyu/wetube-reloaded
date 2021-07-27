const fakeUser = {
    username: "Minji",
    loggedIn: true,
}

export const trending = (req, res) => res.render("home", { pageTitle: "Home", fakeUser: fakeUser});
export const search = (req, res) => res.send("search");

export const watch = (req, res) => res.render("watch", { pageTitle: "Watch" });
export const edit = (req, res) => res.render("edit", { pageTitle: "Edit" })
export const remove = (req, res) => {
    console.log(req.params);
    return res.send("Delete Video")
};
export const upload = (req, res) => res.send("Uplaod Video")