import Video from "../models/Video";

export const home = async(req, res) => {
    try{
        const videos = await Video.find({});
        console.log(videos)
        return res.render("home", { pageTitle: "Home", videos })
    } catch{
        return res.render("server-error");
    }
}

export const search = (req, res) => res.send("search");

export const watch = async(req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id)
    console.log(video) 
    return res.render("watch", { pageTitle: video.title, video});
}

export const getEdit = (req, res) => {
    return res.render("edit", { pageTitle: `Editing`});
}

export const postEdit =(req, res) => {
    const title = req.body.title;
    return res.redirect(`/videos/${id}`);
}

export const remove = (req, res) => {
    console.log(req.params);
    return res.send("Delete Video")
};

export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: `Upload Video` });
};
export const postUpload = async(req, res) => {
    const { title, description, hashtags } = req.body;
    try{
        await Video.create({
            title,
            description,
            hashtags: hashtags.replace(/ /gi, "").split(",").map(word => `#${word}`),
            });
        return res.redirect("/");
    } catch (error){
        return res.render("upload", { 
            pageTitle: `Upload Video`, 
            errorMessage: error._message,
         });
    }
    
}