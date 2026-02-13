"""Configuration for Flask app and Neon PostgreSQL."""
import os
from dotenv import load_dotenv

load_dotenv()

# Neon PostgreSQL connection string from https://console.neon.tech
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require",
)

# Flask
SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-change-in-production")
DEBUG = os.getenv("FLASK_DEBUG", "true").lower() in ("1", "true", "yes")
HOST = os.getenv("FLASK_HOST", "0.0.0.0")
PORT = int(os.getenv("FLASK_PORT", "5000"))

# CORS: allow frontend origin
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5500,http://127.0.0.1:5500").split(",")
