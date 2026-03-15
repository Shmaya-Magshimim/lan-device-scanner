from pydantic import BaseModel
from typing import List


class DeviceBase(BaseModel):
    state: str
    ip4: str
    mac: str
    vendor: str
    os_name: str
    os_accuracy: int
    last_boot: str
    device_guess: str
    device_guess_accuracy: str


class DeviceCreate(DeviceBase):
    pass


class DeviceSummary(BaseModel):
    id: int
    ip4: str
    mac: str
    device_guess: str

    class Config:
        from_attributes = True


class DeviceDetails(DeviceBase):
    id: int

    class Config:
        from_attributes = True


class PortBase(BaseModel):
    number: int
    protocol: str
    state: str
    service_name: str
    service_product: str


class PortCreate(PortBase):
    pass


class PortDetails(PortBase):
    id: int

    class Config:
        from_attributes = True


class ScanBase(BaseModel):
    timestamp: str
    ssid: str
    status: str


class ScanCreate(ScanBase):
    pass


class ScanSummary(ScanBase):
    id: int

    class Config:
        from_attributes = True


class ScanDetails(ScanBase):
    id: int
    devices: List[DeviceSummary]

    class Config:
        from_attributes = True


class RootResponse(BaseModel):
    message: str
