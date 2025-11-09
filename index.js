import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.get("/api/tiktok", async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.json({ error: "TikTok video URL missing!" });

  try {
    const api = `https://www.tikwm.com/api/?url=${encodeURIComponent(videoUrl)}`;
    const response = await fetch(api);
    const data = await response.json();

    if (!data || !data.data) return res.json({ error: "Invalid response" });

    res.json({
      title: data.data.title,
      video_no_watermark: data.data.play,
      music: data.data.music,
      thumbnail: data.data.cover,
    });
  } catch (err) {
    res.json({ error: "Failed to fetch video!" });
  }
});

app.listen(3000, () => console.log("TikTok API running on port 3000"));
