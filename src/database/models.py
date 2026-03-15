from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()


class Scan(Base):
    __tablename__ = "scans"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(String, index=True)
    ssid = Column(String, index=True)
    status = Column(String, index=True)
    devices = relationship("Device", back_populates="scan")


class Device(Base):
    __tablename__ = "devices"

    id = Column(Integer, primary_key=True, index=True)
    scan_id = Column(Integer, ForeignKey("scans.id"), index=True)
    state = Column(String, index=True)
    ip4 = Column(String, index=True)
    mac = Column(String, index=True)
    vendor = Column(String, index=True)
    os_name = Column(String, index=True)
    os_accuracy = Column(Integer, index=True)
    last_boot = Column(String, index=True)
    device_guess = Column(String, index=True)
    device_guess_accuracy = Column(String, index=True)

    ports = relationship("Port", back_populates="device")
    scan = relationship("Scan", back_populates="devices")


class Port(Base):
    __tablename__ = "ports"

    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(Integer, ForeignKey("devices.id"), index=True)
    number = Column(Integer, index=True)
    protocol = Column(String, index=True)
    state = Column(String, index=True)
    service_name = Column(String, index=True)
    service_product = Column(String, index=True)

    device = relationship("Device", back_populates="ports")
