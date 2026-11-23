-- MySQL 8.0 / InnoDB. Run explicitly with tools/migrate-sqlite.php or tools/check-storage.php --init.
CREATE TABLE IF NOT EXISTS schema_migrations(version INT NOT NULL PRIMARY KEY,application VARCHAR(32) NOT NULL DEFAULT 'gavstronomiya',applied_at VARCHAR(30) NOT NULL) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS users(
 id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
 username VARCHAR(400) COLLATE utf8mb4_bin NOT NULL UNIQUE,
 password_hash VARCHAR(255) NOT NULL,recovery_hash VARCHAR(255) NOT NULL,
 session_version INT UNSIGNED NOT NULL DEFAULT 1,
 email VARCHAR(254) COLLATE utf8mb4_bin NULL UNIQUE,email_verified_at VARCHAR(30) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
CREATE TABLE IF NOT EXISTS account_tokens(
 token_hash CHAR(64) CHARACTER SET ascii COLLATE ascii_bin PRIMARY KEY,user_id BIGINT UNSIGNED NOT NULL,
 email VARCHAR(254) NOT NULL,purpose VARCHAR(16) NOT NULL,expires BIGINT NOT NULL,session_version INT UNSIGNED NOT NULL,
 INDEX tokens_user(user_id,purpose),FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
CREATE TABLE IF NOT EXISTS limits(
 scope VARCHAR(64) CHARACTER SET ascii NOT NULL,who CHAR(64) CHARACTER SET ascii NOT NULL,
 attempts INT UNSIGNED NOT NULL,expires BIGINT NOT NULL,PRIMARY KEY(scope,who),INDEX limits_expiry(expires)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS dogs(
 id VARCHAR(64) CHARACTER SET ascii COLLATE ascii_bin NOT NULL PRIMARY KEY,user_id BIGINT UNSIGNED NOT NULL,
 name VARCHAR(400) NOT NULL DEFAULT '',revision INT UNSIGNED NOT NULL DEFAULT 1,created_at VARCHAR(30) NOT NULL,updated_at VARCHAR(30) NOT NULL,
 UNIQUE KEY dogs_owner(user_id,id),FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
CREATE TABLE IF NOT EXISTS dog_preferences(
 user_id BIGINT UNSIGNED NOT NULL,dog_id VARCHAR(64) CHARACTER SET ascii COLLATE ascii_bin NOT NULL PRIMARY KEY,
 payload LONGTEXT NOT NULL,revision INT UNSIGNED NOT NULL,updated_at VARCHAR(30) NOT NULL,
 CHECK(JSON_VALID(payload)),FOREIGN KEY(user_id,dog_id) REFERENCES dogs(user_id,id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
CREATE TABLE IF NOT EXISTS feeding_plans(
 user_id BIGINT UNSIGNED NOT NULL,dog_id VARCHAR(64) CHARACTER SET ascii COLLATE ascii_bin NOT NULL PRIMARY KEY,
 settings LONGTEXT NOT NULL,revision INT UNSIGNED NOT NULL,updated_at VARCHAR(30) NOT NULL,
 CHECK(JSON_VALID(settings)),FOREIGN KEY(user_id,dog_id) REFERENCES dogs(user_id,id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
CREATE TABLE IF NOT EXISTS dog_supplement_regimens(
 user_id BIGINT UNSIGNED NOT NULL,dog_id VARCHAR(64) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,position SMALLINT UNSIGNED NOT NULL,
 payload LONGTEXT NOT NULL,PRIMARY KEY(dog_id,position),CHECK(JSON_VALID(payload)),FOREIGN KEY(user_id,dog_id) REFERENCES dogs(user_id,id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
CREATE TABLE IF NOT EXISTS dog_profile_versions(
 user_id BIGINT UNSIGNED NOT NULL,dog_id VARCHAR(64) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,revision INT UNSIGNED NOT NULL,
 payload LONGTEXT NOT NULL,created_at VARCHAR(30) NOT NULL,PRIMARY KEY(dog_id,revision),CHECK(JSON_VALID(payload)),
 FOREIGN KEY(user_id,dog_id) REFERENCES dogs(user_id,id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
CREATE TABLE IF NOT EXISTS recipes(
 user_id BIGINT UNSIGNED NOT NULL,dog_id VARCHAR(64) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 id VARCHAR(100) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,name VARCHAR(400) NOT NULL,payload LONGTEXT NOT NULL,
 revision INT UNSIGNED NOT NULL,updated_at VARCHAR(30) NOT NULL,PRIMARY KEY(user_id,id),INDEX recipes_dog(user_id,dog_id,updated_at),
 CHECK(JSON_VALID(payload)),FOREIGN KEY(user_id,dog_id) REFERENCES dogs(user_id,id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
CREATE TABLE IF NOT EXISTS recipe_versions(
 user_id BIGINT UNSIGNED NOT NULL,recipe_id VARCHAR(100) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,revision INT UNSIGNED NOT NULL,
 name VARCHAR(400) NOT NULL,payload LONGTEXT NOT NULL,created_at VARCHAR(30) NOT NULL,PRIMARY KEY(user_id,recipe_id,revision),CHECK(JSON_VALID(payload)),
 FOREIGN KEY(user_id,recipe_id) REFERENCES recipes(user_id,id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
CREATE TABLE IF NOT EXISTS recipe_items(
 user_id BIGINT UNSIGNED NOT NULL,recipe_id VARCHAR(100) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,revision INT UNSIGNED NOT NULL,
 position SMALLINT UNSIGNED NOT NULL,product_key VARCHAR(80) CHARACTER SET ascii NOT NULL,grams DECIMAL(10,3) NOT NULL,
 nutrient_snapshot LONGTEXT NULL,PRIMARY KEY(user_id,recipe_id,revision,position),CHECK(grams>=0),CHECK(nutrient_snapshot IS NULL OR JSON_VALID(nutrient_snapshot)),
 FOREIGN KEY(user_id,recipe_id,revision) REFERENCES recipe_versions(user_id,recipe_id,revision) ON DELETE CASCADE
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS audit_events(
 id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,user_id BIGINT UNSIGNED NULL,event_type VARCHAR(64) CHARACTER SET ascii NOT NULL,
 object_id VARCHAR(100) CHARACTER SET ascii NULL,created_at VARCHAR(30) NOT NULL,INDEX audit_owner(user_id,id),INDEX audit_age(created_at),
 FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS catalog_sources(
 id CHAR(64) CHARACTER SET ascii COLLATE ascii_bin PRIMARY KEY,title TEXT NOT NULL,url TEXT NULL,checked_at VARCHAR(30) NULL,metadata LONGTEXT NOT NULL,CHECK(JSON_VALID(metadata))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS catalog_products(
 id VARCHAR(120) CHARACTER SET ascii COLLATE ascii_bin PRIMARY KEY,kind VARCHAR(20) CHARACTER SET ascii NOT NULL,item_key VARCHAR(100) CHARACTER SET ascii NOT NULL,
 name VARCHAR(400) NOT NULL,UNIQUE KEY catalog_identity(kind,item_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS catalog_revisions(
 id CHAR(64) CHARACTER SET ascii COLLATE ascii_bin PRIMARY KEY,product_id VARCHAR(120) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 source_id CHAR(64) CHARACTER SET ascii COLLATE ascii_bin NULL,payload LONGTEXT NOT NULL,created_at VARCHAR(30) NOT NULL,
 UNIQUE KEY revision_product(product_id,id),CHECK(JSON_VALID(payload)),FOREIGN KEY(product_id) REFERENCES catalog_products(id),FOREIGN KEY(source_id) REFERENCES catalog_sources(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS catalog_active_revisions(
 product_id VARCHAR(120) CHARACTER SET ascii COLLATE ascii_bin PRIMARY KEY,revision_id CHAR(64) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
 FOREIGN KEY(product_id,revision_id) REFERENCES catalog_revisions(product_id,id)
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS catalog_nutrients(
 revision_id CHAR(64) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,nutrient_code VARCHAR(20) CHARACTER SET ascii NOT NULL,
 value DECIMAL(20,8) NULL,unit VARCHAR(12) NOT NULL,value_type VARCHAR(16) CHARACTER SET ascii NOT NULL,basis VARCHAR(30) CHARACTER SET ascii NOT NULL,
 PRIMARY KEY(revision_id,nutrient_code,value_type),CHECK(value IS NULL OR value>=0),FOREIGN KEY(revision_id) REFERENCES catalog_revisions(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE IF NOT EXISTS migration_imports(
 source_digest CHAR(64) CHARACTER SET ascii COLLATE ascii_bin PRIMARY KEY,summary LONGTEXT NOT NULL,created_at VARCHAR(30) NOT NULL,CHECK(JSON_VALID(summary))
) ENGINE=InnoDB;
INSERT INTO schema_migrations(version,applied_at) VALUES(1,DATE_FORMAT(UTC_TIMESTAMP(),'%Y-%m-%dT%H:%i:%sZ'));
