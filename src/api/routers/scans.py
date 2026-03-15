from fastapi import APIRouter, Depends, BackgroundTasks, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ...database import get_scan, get_scans, create_scan_placeholder, update_scan, db_context, get_db
from ..schemas import ScanSummary, ScanDetails
from ...engine import scan_network, convert_scan_to_schema, save_device_results_to_db

router = APIRouter(prefix="/scans", tags=["scans"])


@router.get("/", response_model=List[ScanSummary])
def list_scans(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):  # noqa: ANN201
    return get_scans(db, skip=skip, limit=limit)


@router.get("/{scan_id}", response_model=ScanDetails)
def get_scan_details(scan_id: int, db: Session = Depends(get_db)):  # noqa: ANN201
    scan = get_scan(db, scan_id)
    if not scan:
        raise HTTPException(status_code=404, detail="Scan not found")
    return scan


def background_scan_task(scan_id: int) -> None:
    with db_context() as db:
        scan_result = scan_network()
        scan_schema = convert_scan_to_schema(scan_result)
        update_scan(db, scan_id, scan_schema)
        save_device_results_to_db(db, scan_result.devices, scan_id)


@router.post("/", response_model=ScanSummary)
def post_scan(background_tasks: BackgroundTasks, db: Session = Depends(get_db)):  # noqa: ANN201
    db_scan = create_scan_placeholder(db)
    background_tasks.add_task(background_scan_task, getattr(db_scan, "id"))
    return db_scan
