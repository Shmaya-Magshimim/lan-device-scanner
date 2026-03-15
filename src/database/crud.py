from typing import List, Optional
from sqlalchemy.orm import Session
from ..api import DeviceCreate, PortCreate, ScanCreate  # type: ignore
from .models import Port, Device, Scan


def save_scan_session(db: Session, scanSession: ScanCreate) -> Scan:
    db_scan = Scan(**scanSession.model_dump())
    db.add(db_scan)
    db.commit()
    db.refresh(db_scan)
    return db_scan


def save_device(db: Session, device: DeviceCreate, scan_id: int) -> Device:
    db_device = Device(**device.model_dump(), scan_id=scan_id)
    db.add(db_device)
    db.commit()
    db.refresh(db_device)
    return db_device


def save_ports(db: Session, ports: List[PortCreate], device_id: int) -> None:
    for port in ports:
        db_port = Port(**port.model_dump(), device_id=device_id)
        db.add(db_port)

    db.commit()


def get_scans(db: Session, skip: int = 0, limit: int = 10) -> List[Scan]:
    return db.query(Scan).order_by(Scan.timestamp.desc()).offset(skip).limit(limit).all()


def get_scan(db: Session, scan_id: int) -> Optional[Scan]:
    return db.query(Scan).filter(Scan.id == scan_id).first()


def create_scan_placeholder(db: Session) -> Scan:
    placeholder_scan = Scan(timestamp="Pending", ssid="Pending", status="In Progress")
    db.add(placeholder_scan)
    db.commit()
    db.refresh(placeholder_scan)
    return placeholder_scan


def update_scan(db: Session, scan_id: int, scan_update: ScanCreate) -> Optional[Scan]:
    scan = get_scan(db, scan_id)
    if scan is None:
        return None

    update_data = scan_update.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(scan, key, value)

    db.commit()
    db.refresh(scan)

    return scan


def get_devices_by_scan_id(db: Session, scan_id: int) -> List[Device]:
    return db.query(Device).filter(Device.scan_id == scan_id).all()


def get_device(db: Session, device_id: int) -> Optional[Device]:
    return db.query(Device).filter(Device.id == device_id).first()


def get_ports_by_device_id(db: Session, device_id: int) -> List[Port]:
    return db.query(Port).filter(Port.device_id == device_id).all()
