CREATE TABLE USERS (
    id SERIAL ,
    email text UNIQUE,
    hash_password text,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (ID)
);
CREATE TABLE ORDERS(
    id SERIAL ,
    target_value FLOAT,
    stock TEXT NOT NULL,
    finished boolean,
    USER_ID INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (USER_ID) REFERENCES USERS(ID),
    PRIMARY KEY (ID)

);
-- docker run --rm -v {MIGRATES_PATH}:/flyway/sql flyway/flyway -url='jdbc:postgresql://{DB_ENDPOINT}/{DB_NAME}?user={DB_USER}&password={DB_PASSWORD}' migrate