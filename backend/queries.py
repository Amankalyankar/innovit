"""
Paste your Neon/PostgreSQL query here and expose it via get_custom_result().
Use parameterized queries (e.g. %s or %(name)s) to avoid SQL injection.
"""
from database import run_query


def get_custom_result():
    """
    Run your query and return rows.
    Replace the query below with your own SELECT statement.
    """
    # Example: replace with your actual query
    # query = "SELECT * FROM your_table LIMIT 100"
    # return run_query(query)

    # Placeholder until you add your query
    return run_query("SELECT 1 AS id, 'GRAM-SABHA' AS name")


# Add more functions for other queries if needed, e.g.:
# def get_issues_by_village(village_id):
#     return run_query("SELECT * FROM issues WHERE village_id = %s", (village_id,))
