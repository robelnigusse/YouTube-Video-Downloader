from fastapi import FastAPI
import yt_dlp

app = FastAPI()

@app.get("/")
async def root():
    url = "https://www.youtube.com/watch?v=qzGxK6Uiu04"

    with yt_dlp.YoutubeDL() as ydl:
        info = ydl.extract_info(url, download=False)

    results = []
    seen_heights = set()

    allowed_heights = {360, 480, 720, 1080, 1440, 2160}

    for f in info["formats"]:
        height = f.get("height")
        ext = f.get("ext")

        if height in allowed_heights and ext == "mp4" and height not in seen_heights:
            seen_heights.add(height)

            results.append({
                "format_id": f["format_id"],
                "resolution": height,
                "ext": ext,
                "url": f["url"]
            })

    return results