from fastapi import FastAPI, HTTPException
import yt_dlp
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def get_url(url : str):
    if not url:
        raise HTTPException(status_code=400, detail="No URL provided")
    try:
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
                    # "format_id": f["format_id"],
                    "resolution": height,
                    # "ext": ext,
                    "url": f["url"]
                })
        return results
    except Exception as e:
        raise HTTPException(status_code=400, detail="Invalid URL")