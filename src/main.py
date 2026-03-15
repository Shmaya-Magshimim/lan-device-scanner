from fastapi import FastAPI
from src.api import scans, devices, RootResponse  # type: ignore

app = FastAPI(title="Device Scanner API", description="API to scan networks and retrieve scan results", version="1.0.0")
app.include_router(scans.router)
app.include_router(devices.router)


@app.get("/", response_model=RootResponse)
def root() -> dict:
    return {"message": "Device Scanner API is running"}
