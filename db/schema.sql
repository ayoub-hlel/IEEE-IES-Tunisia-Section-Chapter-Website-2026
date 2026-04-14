-- ============================================================================
-- IEEE IES Tunisia Section — Database Schema
-- ============================================================================
-- SQLite schema for all dynamic content: subunits, officers, awards, stats,
-- activities, and site settings.
-- ============================================================================

-- ─── Site Settings ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS site_settings (
    key   TEXT PRIMARY KEY,
    value TEXT NOT NULL
);

INSERT OR IGNORE INTO site_settings (key, value) VALUES
    ('site_title', 'IEEE Industrial Electronics Society Tunisia Section'),
    ('site_description', 'IEEE Industrial Electronics Society Tunisia Section — advancing industrial electronics, automation, and power systems through education, research, and community building.'),
    ('site_url', 'https://ies.ieee.tn'),
    ('contact_email', 'ies.tn@ieee.org'),
    ('facebook_url', 'https://www.facebook.com/IEEEIESTunisia'),
    ('linkedin_url', 'https://www.linkedin.com/company/ieee-ies-tunisia'),
    ('twitter_url', 'https://twitter.com/IEEEorg'),
    ('youtube_url', 'https://www.youtube.com/user/IEEEorg'),
    ('instagram_url', 'https://www.instagram.com/ieeeorg/'),
    ('founding_date', '2021-01-01'),
    ('stats_members', '500+'),
    ('stats_chapters', '10'),
    ('stats_events', '15+'),
    ('stats_years', '4+');

-- ─── Subunits (Student Branch Chapters) ─────────────────────────────────────
CREATE TABLE IF NOT EXISTS subunits (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT NOT NULL,
    short_name  TEXT UNIQUE NOT NULL,
    location    TEXT NOT NULL,
    university  TEXT NOT NULL,
    facebook    TEXT,
    instagram   TEXT,
    website     TEXT,
    linkedin    TEXT,
    is_active   INTEGER DEFAULT 1,
    sort_order  INTEGER DEFAULT 0,
    created_at  TEXT DEFAULT (datetime('now')),
    updated_at  TEXT DEFAULT (datetime('now'))
);

-- ─── Officers (Executive Committee) ─────────────────────────────────────────
CREATE TABLE IF NOT EXISTS officers (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT NOT NULL,
    role        TEXT NOT NULL,
    email       TEXT,
    linkedin    TEXT,
    facebook    TEXT,
    photo       TEXT,
    sort_order  INTEGER DEFAULT 0,
    is_active   INTEGER DEFAULT 1,
    created_at  TEXT DEFAULT (datetime('now')),
    updated_at  TEXT DEFAULT (datetime('now'))
);

-- ─── Awards ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS award_categories (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    year        INTEGER NOT NULL,
    name        TEXT NOT NULL,
    description TEXT,
    award_type  TEXT DEFAULT 'standard',  -- 'standard' or 'technical-challenge'
    date        TEXT,
    sort_order  INTEGER DEFAULT 0,
    created_at  TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS award_winners (
    id              INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id     INTEGER NOT NULL,
    title           TEXT NOT NULL,
    result          TEXT NOT NULL,
    winner_logo_url TEXT,
    sort_order      INTEGER DEFAULT 0,
    created_at      TEXT DEFAULT (datetime('now')),
    FOREIGN KEY (category_id) REFERENCES award_categories(id) ON DELETE CASCADE
);

-- ─── Sister Societies ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS sister_societies (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT NOT NULL,
    short_name  TEXT NOT NULL,
    url         TEXT NOT NULL,
    sort_order  INTEGER DEFAULT 0,
    is_active   INTEGER DEFAULT 1
);

-- ─── Global Leadership ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS global_leadership (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT NOT NULL,
    role        TEXT NOT NULL,
    note        TEXT,
    sort_order  INTEGER DEFAULT 0,
    is_active   INTEGER DEFAULT 1
);

-- ─── Seed Data ──────────────────────────────────────────────────────────────

-- Subunits (from current hardcoded data in app/subunits/page.tsx)
INSERT OR IGNORE INTO subunits (name, short_name, location, university, facebook, website, linkedin, sort_order) VALUES
    ('IAS IES PES ESPRIT Student Branch Joint Chapter', 'esprit', 'Tunis', 'Esprit', 'https://www.facebook.com/iasiespes.esprit', 'https://ias-ies-pes-esprit.ieee.tn/', 'https://www.linkedin.com/company/ias-ies-pes-esprit-student-branch-joint-chapter', 1),
    ('IAS IES PES ESSTHS Student Branch Joint Chapter', 'essths', 'Sousse', 'Higher School of Science & Technology of Hammam Sousse', 'https://www.facebook.com/IEEE.IAS.IES.PES.ESSTHS.JOINT.Chapter', 'https://essths.ieee.tn/chapters/iip', NULL, 2),
    ('IAS IES PES FST Student Branch Joint Chapter', 'fst', 'Tunis', 'Faculty of Sciences of Tunis', 'https://www.facebook.com/profile.php?id=61582513621178', NULL, NULL, 3),
    ('IAS IES PES ENIT Student Branch Joint Chapter', 'enit', 'Tunis', 'National School of Engineers of Tunis', 'https://www.facebook.com/profile.php?id=61557516737236', NULL, NULL, 4),
    ('IES PES ENET''COM Student Branch Joint Chapter', 'enetcom', 'Sfax', 'National School of Electronics and Telecommunications of Sfax', 'https://www.facebook.com/PESENETCom', NULL, NULL, 5),
    ('IAS IES ISET Bizerte Student Branch Joint Chapter', 'iset-bizerte', 'Bizerte', 'Higher Institute of Technological Studies of Bizerte', 'https://www.facebook.com/IAS.ISETBz', NULL, NULL, 6),
    ('IES PES ISIMS Student Branch Joint Chapter', 'isims', 'Sfax', 'Higher Institute of Computer Science and Multimedia of Sfax', NULL, NULL, NULL, 7),
    ('IAS IES Sup''Com Student Branch Joint Chapter', 'supcom', 'Tunis', 'Higher School of Communication of Tunis', NULL, 'https://ias-supcom.ieee.tn/', NULL, 8),
    ('IES ISSATM Student Branch Chapter', 'issatm', 'Tunis', 'Higher Institute of Applied Sciences and Technology of Mateur', 'https://www.facebook.com/profile.php?id=61575236892780', NULL, NULL, 9),
    ('IES ISTIC Student Branch Chapter', 'istic', 'Tunis', 'Higher Institute of Computer and Communication Technologies', 'https://www.facebook.com/profile.php?id=61587696301965', NULL, NULL, 10);

-- Officers (from current hardcoded data in app/about/page.tsx)
INSERT OR IGNORE INTO officers (name, role, email, linkedin, facebook, photo, sort_order) VALUES
    ('Mohamed Ali Krichene', 'Chairman', '#', '#', '#', 'Mohamed Ali Krichene.png', 1),
    ('Mahmoud Hamouda', 'Vice Chairman', '#', '#', '#', 'Mahmoud Hamouda.png', 2),
    ('Imen Werda', 'Secretary', '#', '#', '#', 'Imen Werda.png', 3),
    ('Mohamed Rebai', 'Treasurer', '#', '#', '#', 'Mohamed Rebai.png', 4),
    ('Yessmine Sellami', 'Media Manager', '#', '#', '#', 'Yessmine Sellami.png', 5),
    ('Chayma Bouattour', 'Student Representative', '#', '#', '#', 'Chayma Bouattour.png', 6),
    ('Ayoub Hlel', 'Webmaster', '#', '#', '#', 'Ayoub Hlel.png', 7),
    ('Oumayma Masmoudi', 'Chapter Operator Coordination', '#', '#', '#', 'Oumayma Masmoudi.png', 8),
    ('Tasnime Maksoudi', 'Technical Projects Coordinator', '#', '#', '#', 'Tesnime Maksoudi.png', 9);

-- Award Categories + Winners (2025, 2024, 2023)
-- 2025
INSERT OR IGNORE INTO award_categories (year, name, description, award_type, sort_order) VALUES
    (2025, 'Best IES Student Branch Chapter Award', 'Recognizing the most outstanding IES Student Branch Chapters', 'standard', 1),
    (2025, 'TSYP 13 Technical Challenge', 'AESS & IES TSYP13 Technical Challenge: Preventing Mission Failure Without Ground Control for CubeSats', 'technical-challenge', 2),
    (2025, 'IES is the New Carthage - Best Guardian Award', 'Recognizing outstanding Guardians of the Flame & Student Branch Chapters in the Tunisian IES is the New Carthage Program', 'standard', 3);

INSERT OR IGNORE INTO award_winners (category_id, title, result, winner_logo_url, sort_order) VALUES
    -- Best IES Student Branch Chapter Award winners
    (1, 'IEEE IAS IES PES ESPRIT Student Branch Joint Chapter', '1st Place', 'https://utfs.io/f/TjXaYUuww8KkSidWWILVzy2opWGgcjk1xHe4T63I87Qu9PtL', 1),
    (1, 'IEEE IES PES ENET''COM Student Branch Joint Chapter', '2nd Place', 'https://utfs.io/f/TjXaYUuww8KkWYj57QtCVOBk62hFZP5DqNoXLb7xaJEv9pQt', 2),
    (1, 'IEEE IES PES ISIMS Student Branch Joint Chapter', '3rd Place', 'https://utfs.io/f/TjXaYUuww8KkTnE6Q9ww8KkmajNg6PCEFscpW7xu9yVb1AlX', 3),
    -- TSYP 13 Technical Challenge winners
    (2, 'IEEE INSAT Student Branch', '1st Place', 'https://utfs.io/f/TjXaYUuww8KkKimJlUkofdJQen3Ihq7OLGvZCciFsRD6H9UY', 1),
    (2, 'IEEE ESSTHS Student Branch', '2nd Place', 'https://utfs.io/f/TjXaYUuww8KknzAyOiBSub5fsg7i8RwMBdPAtkWr41VCHGQT', 2),
    (2, 'IEEE ESPRIT Student Branch', '3rd Place', 'https://utfs.io/f/TjXaYUuww8KkxyqIZWNM97YJwkgUoH1s83cy0updzGP5KZq6', 3),
    -- IES is the New Carthage winners
    (3, 'Med Adem Ghorfel', 'Best Guardian Award', NULL, 1),
    (3, 'IEEE IAS IES PES ENIT Student Branch Joint Chapter', 'Best Student Branch Chapter', NULL, 2);

-- 2024
INSERT OR IGNORE INTO award_categories (year, name, description, award_type, date, sort_order) VALUES
    (2024, 'TSYP 12 Technical Challenge', 'TSYP 12th Edition Technical Challenge: Chess Coach Robot Project', 'technical-challenge', NULL, 1),
    (2024, 'ICAIGE24 Technical Challenge', 'IEEE IES Tunisia Section Chapter Technical Challenge', 'technical-challenge', 'October 12, 2024', 2);

INSERT OR IGNORE INTO award_winners (category_id, title, result, winner_logo_url, sort_order) VALUES
    -- TSYP 12 winners
    (4, 'IEEE INSAT Student Branch', '1st Place', 'https://utfs.io/f/TjXaYUuww8KkKimJlUkofdJQen3Ihq7OLGvZCciFsRD6H9UY', 1),
    (4, 'IEEE ENIS Student Branch', '2nd Place', 'https://utfs.io/f/TjXaYUuww8KkrjtR4JFI1uBlHhv9T0sSAUKNZPy3wJief7LD', 2),
    (4, 'IEEE EPS Student Branch', '3rd Place', 'https://utfs.io/f/TjXaYUuww8KkxyqIZWNM97YJwkgUoH1s83cy0updzGP5KZq6', 3),
    -- ICAIGE24 winners
    (5, 'Agrivolt', '1st Place', NULL, 1),
    (5, 'The Innovators', '2nd Place', NULL, 2),
    (5, 'AcceleraTech Solutions', '3rd Place', NULL, 3);

-- 2023
INSERT OR IGNORE INTO award_categories (year, name, description, award_type, sort_order) VALUES
    (2023, 'TSYP 11 Technical Challenge', 'TSYP 11 - Tunisian Students & Young Professionals Congress Technical Challenge', 'technical-challenge', 1);

INSERT OR IGNORE INTO award_winners (category_id, title, result, winner_logo_url, sort_order) VALUES
    -- TSYP 11 winners
    (6, 'IEEE ENET''COM Student Branch', '1st Place', 'https://utfs.io/f/TjXaYUuww8KkWYj57QtCVOBk62hFZP5DqNoXLb7xaJEv9pQt', 1),
    (6, 'IEEE EPS Student Branch', '2nd Place', 'https://utfs.io/f/TjXaYUuww8KkxyqIZWNM97YJwkgUoH1s83cy0updzGP5KZq6', 2),
    (6, 'IEEE ESPRIT Student Branch', '3rd Place', 'https://utfs.io/f/TjXaYUuww8KkSidWWILVzy2opWGgcjk1xHe4T63I87Qu9PtL', 3);

-- Sister Societies
INSERT OR IGNORE INTO sister_societies (name, short_name, url, sort_order) VALUES
    ('IEEE Power & Energy Society', 'PES', 'http://www.ieee-pes.org/', 1),
    ('IEEE Industry Applications Society', 'IAS', 'http://ias.ieee.org/', 2),
    ('IEEE Power Electronics Society', 'PELS', 'http://www.ieee-pels.org/', 3),
    ('IEEE Dielectrics & Electrical Insulation Society', 'DEIS', 'http://www.ieeedeis.org/', 4);

-- Global Leadership
INSERT OR IGNORE INTO global_leadership (name, role, note, sort_order) VALUES
    ('Prof. Milos Manic', 'IES President', 'Junior Past President', 1),
    ('Prof. Yajun Pan', 'IES Leadership', '', 2),
    ('Prof. Mariusz Malinowski', 'Senior Past President', '', 3);
