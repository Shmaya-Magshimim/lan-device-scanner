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
- [XMLtodict](https://pypi.org/project/xmltodict/) – Parse Nmap XML outputs
- [SQLAlchemy](https://www.sqlalchemy.org/) – ORM for database interaction
  
---

## Getting Started

## Prerequisites

- [Docker](https://www.docker.com/get-started) – for running the containerized app
- Optional (for local development):
  - Python 3.11
  - Poetry (`pipx install poetry`)
    
---

## Installation & Usage

You can run this project entirely with **Docker** (recommended), or optionally set it up locally for development using Python and Poetry.

---

### Option 1: Docker (Recommended)

Docker handles all dependencies and isolates the environment. On Windows, make sure WSL2 is enabled if using Docker Desktop.

---

1. **Clone the repository**

```bash
git clone https://github.com/your_username/lan-device-scanner.git
cd lan-device-scanner
```

2. **Build the Docker image**

```bash
docker build -t lan-device-scanner .
```
3. **Run the container**

```bash
docker run -p 8000:8000 lan-device-scanner
```
4. **Access the API**

API root: http://localhost:8000
Interactive docs: http://localhost:8000/docs
Frontend - In Progress

---

⚠️ Note for Windows: Commands like netsh are not available inside the container; scanning uses Linux-compatible tools.

---

### Option 2: Developer / Local Setup (Optional)

If you want to run or modify the project locally without Docker:

---

1. **Install Python 3.11 (add it to your PATH)**
https://www.python.org/ftp/python/pymanager/python-manager-26.0.msix

2. **Install Poetry**
```bash
pipx install poetry
```

3. **Install dependencies**
```bash
poetry install
```

4. Run the FastAPI server
```bash
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

5. Access the API
API root: http://localhost:8000
Interactive docs: http://localhost:8000/docs

