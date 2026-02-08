"""Neon PostgreSQL connection and query helpers."""
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from contextlib import contextmanager

from config import DATABASE_URL


def get_connection():
    """Return a new connection to Neon PostgreSQL."""
    return psycopg2.connect(
        DATABASE_URL,
        cursor_factory=RealDictCursor,
        # Neon requires SSL in production
        connect_timeout=10,
    )


@contextmanager
def get_cursor(commit=False):
    """Context manager for a connection and cursor. Use for one-off queries."""
    conn = get_connection()
    try:
        with conn.cursor() as cur:
            yield cur
        if commit:
            conn.commit()
    finally:
        conn.close()


def run_query(query: str, params=None, commit=False):
    """
    Run a single query and return results (for SELECT) or rowcount (for INSERT/UPDATE/DELETE).
    params: tuple or dict for parameterized queries.
    """
    with get_cursor(commit=commit) as cur:
        cur.execute(query, params or ())
        if cur.description:
            return cur.fetchall()
        return cur.rowcount


def run_query_one(query: str, params=None):
    """Run a query and return a single row or None."""
    with get_cursor() as cur:
        cur.execute(query, params or ())
        return cur.fetchone()
