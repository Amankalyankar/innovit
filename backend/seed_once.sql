-- Run this ONCE in Neon SQL Editor to add your first village and user so you can log in.
-- Prerequisite: run schema.sql first to create tables.

-- Step 1: Insert one village (skip if you already have villages)
INSERT INTO villages (name, name_hindi, district, state, pincode, population, households, sarpanch_name, panchayat_code)
VALUES ('Rampur', 'रामपुर', 'Jaipur', 'Rajasthan', '302001', 4521, 892, NULL, 'RJ-JP-RMP-001')
ON CONFLICT DO NOTHING;
-- (ON CONFLICT only applies if you have a unique constraint; otherwise this always inserts.)

-- Step 2: Insert one user. Edit mobile, pin, and name to your own.
INSERT INTO users (external_id, name, name_hindi, role, role_name, mobile, pin, village_id, ward, avatar, redirect_url)
VALUES (
  'VLG-001',
  'Your Name',
  'आपका नाम',
  'villager',
  'Villager',
  '9876543210',   -- login: mobile number
  '1234',         -- login: PIN (change to something secure)
  (SELECT id FROM villages ORDER BY id LIMIT 1),
  'Ward 1',
  'YN',
  'villager-dashboard.html'
);

-- Log in at your app with mobile 9876543210 and password 1234.

-- Optional: add more users (uncomment and edit as needed)
-- Admin (no village):
-- INSERT INTO users (external_id, name, role, role_name, mobile, pin, avatar, redirect_url)
-- VALUES ('ADM-001', 'Admin Name', 'admin', 'System Administrator', '9999888877', '1234', 'AN', 'admin-panel.html');

-- Sarpanch (linked to first village):
-- INSERT INTO users (external_id, name, role, role_name, mobile, pin, village_id, avatar, redirect_url)
-- VALUES ('SAR-001', 'Sarpanch Name', 'sarpanch', 'Sarpanch', '9999777766', '1234', (SELECT id FROM villages LIMIT 1), 'SN', 'sarpanch-portal.html');
