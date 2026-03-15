from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api import scans, devices, RootResponse  # type: ignore

app = FastAPI(title="Device Scanner API", description="API to scan networks and retrieve scan results", version="1.0.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow GET, POST, etc.
    allow_headers=["*"],  # Allow all headers
)

app.include_router(scans.router)
app.include_router(devices.router)


@app.get("/", response_model=RootResponse)
def root() -> dict:
    return {"message": "Device Scanner API is running"}
