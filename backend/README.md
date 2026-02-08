# GRAM-SABHA Flask Backend (Neon PostgreSQL)

## Setup

1. **Create a database in Neon**
   - Go to [Neon Console](https://console.neon.tech), create a project, and copy the connection string.

2. **Configure environment**
   ```bash
   cd backend
   copy .env.example .env
   ```
   Edit `.env` and set:
   ```env
   DATABASE_URL=postgresql://user:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Create tables and (optional) first village**
   - In Neon SQL Editor, run `schema.sql` to create tables.
   - To have a village available when users register, run `seed_once.sql` once (adds one village). New users can then choose it on the **Create account** page.

5. **Start the server**
   ```bash
   python app.py
   ```
   API: http://localhost:5000

## Log in and create account

- **Log in:** Open the app → **Login** → enter **Mobile** (10+ digits) and **PIN** → Login. (You must have a user in the database, e.g. from `seed_once.sql` or from registering.)
- **Create account:** On the login page click **Create account**, or open `register.html`. Fill name, mobile, PIN, choose **Villager** or **Sarpanch**, optionally select a village and ward → **Create Account**. Then log in with that mobile and PIN.

## Endpoints

| Endpoint        | Description                    |
|----------------|--------------------------------|
| `GET /`        | Service info                   |
| `GET /api/health` | Health + DB connectivity   |
| `GET /api/query`  | Your custom query result    |
| `GET /api/villages` | List villages (if table exists) |
| `GET /api/issues`  | List issues (if table exists)   |

## Adding your query

- **Option A:** In `queries.py`, replace the placeholder in `get_custom_result()` with your query, e.g.:
  ```python
  def get_custom_result():
      return run_query("SELECT * FROM your_table WHERE ...")
  ```
- **Option B:** Run DDL or one-off queries in Neon Console and use the tables in `queries.py` or in the existing routes in `app.py`.

## CORS

Frontend origins are set via `CORS_ORIGINS` in `.env` (comma-separated). Default includes `http://localhost:5500` for Live Server.
