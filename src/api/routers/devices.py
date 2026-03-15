from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ...database import get_db, get_device, get_devices_by_scan_id, get_ports_by_device_id, Device, Port  # type: ignore
from ..schemas import DeviceSummary, DeviceDetails, PortDetails

router = APIRouter(prefix="/devices", tags=["devices"])


@router.get("/", response_model=List[DeviceSummary])
def list_devices(scan_id: int, skip: int = 0, limit: int = 10, db: Session = Depends(get_db)) -> List[Device]:
    devices = get_devices_by_scan_id(db, scan_id)
    return devices[skip : skip + limit]


@router.get("/{device_id}", response_model=DeviceDetails)
def device_details(device_id: int, db: Session = Depends(get_db)) -> Device:
    device = get_device(db, device_id)
    if not device:
        raise HTTPException(status_code=404, detail="Device not found")
    return device


@router.get("/{device_id}/ports", response_model=List[PortDetails])
def device_ports(device_id: int, db: Session = Depends(get_db)) -> List[Port]:
    ports = get_ports_by_device_id(db, device_id)
    return ports
