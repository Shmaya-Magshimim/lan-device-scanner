from src.engine.scanner import scan_network
from src.database import get_db
from src.engine.db_writer import save_scan_results_to_db


def main() -> None:
    print("Starting device scanner...")
    scanSession = scan_network()
    with get_db() as db:
        save_scan_results_to_db(db, scanSession)


if __name__ == "__main__":
    main()
