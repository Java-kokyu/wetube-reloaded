import mongoose from "mongoose"

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxLenth: 80}, // only data type
    description: { type: String, required: true, trim: true, minLength: 20},
    createdAt: { type: String, required: true, default: Date.now },
    hashtags: [{ type: String, trim: true }],
    meta: {
        views: { type: Number, default: 0 },
        rating: { type: Number, default: 0 },
    },
});

videoSchema.static('formatHashtags', function(hashtags) {
    return hashtags.replace(/ /gi, "").split(",").map((word) => word.startsWith('#') ? word : `#${word}`)
})

const Video = mongoose.model("Video", videoSchema);
export default Video;