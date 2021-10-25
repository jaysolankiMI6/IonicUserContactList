CREATE TABLE IF NOT EXISTS songtable(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    artist_name TEXT, 
    song_name TEXT
);

CREATE TABLE IF NOT EXISTS contacttable(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    u_id INTEGER,
    u_name TEXT, 
    u_img IMAGE,
    u_email TEXT,
    u_phonenumber INTEGER
);

-- CREATE TABLE IF NOT EXISTS usertable(
--     id INTEGER PRIMARY KEY AUTOINCREMENT,
--     u_name TEXT, 
--     usr_name TEXT,
--     u_password password
-- );

CREATE TABLE IF NOT EXISTS usertable(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    u_name TEXT,
    u_email TEXT, 
    u_password password,
    u_birthday Date,
    u_gender TEXT,
    u_profilelink TEXT
);
-- INSERT or IGNORE INTO songtable(id, artist_name, song_name) VALUES (1, 'Justin Bieber', 'Yummy');
-- INSERT or IGNORE INTO songtable(id, artist_name, song_name) VALUES (2, 'Jonas Brothers', 'What A Man Gotta Do');
-- INSERT or IGNORE INTO songtable(id, artist_name, song_name) VALUES (3, 'Life Is Good', 'Future');
-- INSERT or IGNORE INTO songtable(id, artist_name, song_name) VALUES (4, 'Lauv', 'Tattoos Together');
-- INSERT or IGNORE INTO songtable(id, artist_name, song_name) VALUES (5, 'Heavy Steppers', 'Whateva');
-- INSERT or IGNORE INTO songtable(id, artist_name, song_name) VALUES (6, 'DigDat 2020', 'Ei8ht Mile');
-- INSERT or IGNORE INTO songtable(id, artist_name, song_name) VALUES (7, 'Blackbear', 'me & ur ghost');
-- INSERT or IGNORE INTO songtable(id, artist_name, song_name) VALUES (8, 'Hailee Steinfeld', 'Wrong Direction');
