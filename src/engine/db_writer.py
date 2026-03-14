from sqlalchemy.orm import Session

from ..api import DeviceCreate, PortCreate, ScanCreate
from .types import DeviceInfo, PortInfo, ScanInfo
from ..database import save_device, save_ports, save_scan_session
from typing import List


def save_scan_results_to_db(db: Session, scanSession: ScanInfo) -> None:
    scan_schema = convert_scan_to_schema(scanSession)
    db_scan = save_scan_session(db, scan_schema)
    save_device_results_to_db(db, scanSession.devices, getattr(db_scan, "id"))  # Save the scan session and get the saved instance with ID


def save_device_results_to_db(db: Session, devices: List[DeviceInfo], scan_id: int) -> None:
    for device in devices:
        device_schema = convert_device_to_schema(device)
        db_device = save_device(
            db,
            device_schema,
            scan_id,
        )
        ports = convert_ports_to_schema(device.ports)  # Save the device and get the saved instance with ID
        save_ports(db, ports, getattr(db_device, "id"))  # Save all ports for the device


def convert_device_to_schema(device: DeviceInfo) -> DeviceCreate:
    return DeviceCreate(
        state=device.state,
        ip4=device.ip_addr[0] if device.ip_addr[1] == "ipv4" else "Unknown",
        mac=device.mac.mac_address,
        vendor=device.mac.mac_vendor,
        os_name=device.os.os_name,
        os_accuracy=device.os.os_accuracy,
        last_boot=device.uptime.lastboot,
        device_guess=device.device_analysis.device_guess,
        device_guess_accuracy=f"{device.device_analysis.device_guess_accuracy}%",
    )


def convert_ports_to_schema(ports: List[PortInfo]) -> List[PortCreate]:
    return [PortCreate(**vars(p)) for p in ports]


def convert_scan_to_schema(scanSession: ScanInfo) -> ScanCreate:
    return ScanCreate(timestamp=scanSession.timestamp, ssid=scanSession.ssid)
