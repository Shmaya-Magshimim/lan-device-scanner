# LAN Device Scanner

![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python) ![Docker](https://img.shields.io/badge/Docker-Ready-lightgrey?logo=docker) ![FastAPI](https://img.shields.io/badge/FastAPI-High_Performance-green) ![License](https://img.shields.io/badge/License-MIT-yellow)

---

## About The Project

**LAN Device Scanner** is a lightweight network device scanning API built with FastAPI, Poetry, and Docker. It automatically detects devices on your local network and provides structured data including:

- IP addresses
- MAC addresses and vendor info
- OS guesses with accuracy
- Open ports and services
- Device uptime and last boot
- Device category guesses

This project is fully containerized and works across Linux-based environments, making it portable and easy to deploy.

**Why this project exists:**

- You shouldn’t waste time writing repeated scanning scripts.  
- You need a DRY, reproducible, and fully containerized solution for network device scanning.  
- It provides structured API access to device information for further integration or analysis.

---

## Built With

- [Python 3.11](https://www.python.org/)
- [FastAPI](https://fastapi.tiangolo.com/) – High-performance web API framework
- [Poetry](https://python-poetry.org/) – Dependency management
- [Docker](https://www.docker.com/) – Containerization
- [Nmap](https://nmap.org/) – Network scanning engine
- [Netifaces](https://pypi.org/project/netifaces/) – Cross-platform network interfaces
- [XMLtodict](https://pypi.org/project/xmltodict/) – Parse nmap XML outputs

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Docker](https://www.docker.com/get-started)
- Optional for local development:
  - Python 3.11
  - Poetry (`pip install poetry`)
