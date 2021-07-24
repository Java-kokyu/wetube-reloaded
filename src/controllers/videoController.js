export const trending = (req, res) => res.send("Home Page Video");
export const search = (req, res) => res.send("search");

export const watch = (req, res) => {
    console.log(req.params);
    return res.send(`Watch Video #${req.params.id}`);
};
export const edit = (req, res) => {
    console.log(req.params);
    return res.send("Edit");
};
export const remove = (req, res) => {
    console.log(req.params);
    return res.send("Delete Video")
};
export const upload = (req, res) => res.send("Uplaod Video")