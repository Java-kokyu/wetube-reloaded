let videos = [
    {
        title: "Minji Kim V-log",
        rating: 5,
        comments: 2,
        createdAt: "2 minutes ago",
        views: 1239,
        id: 0,
    },
    {
        title: "Bumjin Kim V-log",
        rating: 4,
        comments: 5,
        createdAt: "22 minutes ago",
        views: 990,
        id: 1,
    },
    {
        title: "YoungSun Kim V-log",
        rating: 5,
        comments: 292,
        createdAt: "1 hour ago",
        views: 248240,
        id: 2,
    },

];

export const trending = (req, res) => {
    return res.render("home", { pageTitle: "Home", videos});
}

export const search = (req, res) => res.send("search");

export const watch = (req, res) => {
    const id = req.params.id; // const { id } = req.params
    const video = videos[id];
    return res.render("watch", { pageTitle: `Watching: ${video.title}`, video});
}

export const getEdit = (req, res) => {
    const id = req.params.id;
    const video = videos[id];
    return res.render("edit", { pageTitle: `Editing: ${video.title}`, video});
}

export const postEdit =(req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    videos[id].title = title;
    console.log(req.body);
    return res.redirect(`/videos/${id}`);
}

export const remove = (req, res) => {
    console.log(req.params);
    return res.send("Delete Video")
};

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: `Upload Video` });
};
export const postUpload = (req, res) => {
    // here we will add a video to the videos array.
    const title = req.body.title;
    const newVideo = {
        title: title,
        rating: 0,
        comments: 0,
        createdAt: "just now",
        views: 0,
        id: videos.length,
    };
    videos.push(newVideo);
    
    return res.redirect("/");
}