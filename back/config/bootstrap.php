<?php
// Charger les variables du fichier db.ini
if (file_exists(__DIR__ . '/db.ini')) {
    $dbConfig = parse_ini_file(__DIR__ . '/db.ini', true)['database'];
    $databaseUrl = sprintf(
        'mysql://%s:%s@%s:%s/%s?serverVersion=%s',
        $dbConfig['DB_USER'],
        $dbConfig['DB_PASSWORD'],
        $dbConfig['DB_HOST'],
        $dbConfig['DB_PORT'],
        $dbConfig['DB_NAME'],
        $dbConfig['DB_VERSION']
    );
    putenv("DATABASE_URL=$databaseUrl");
}

// ... existing code ... 