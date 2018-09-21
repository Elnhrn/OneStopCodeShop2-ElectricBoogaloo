CREATE DATABASE forum_db;
USE forum_db;

/*
-- setup tables for forum posts

-- this table is for user info
CREATE TABLE users (
user_id INT(8) NOT NULL AUTO_INCREMENT,
user_name VARCHAR(30) NOT NULL,
user_pass VARCHAR(255) NOT NULL,
user_level INT(2) NOT NULL,
UNIQUE INDEX user_name_unique (user_name),
PRIMARY KEY (user_id)
)

-- this table is for topics
CREATE TABLE topics (
topic_id INT(8) NOT NULL AUTO_INCREMENT,
topic_name VARCHAR(255) NOT NULL,
topic_description VARCHAR(255) NOT NULL,
UNIQUE INDEX topic_name_unique (topic_name),
PRIMARY KEY (topic_id)
)

-- this table is for posts inside of topics
CREATE TABLE posts (
post_id INT(8) NOT NULL AUTO_INCREMENT,
post_subject VARCHAR(255) NOT NULL,
post_body TEXT NOT NULL,
post_date DATETIME NOT NULL,
post_topic INT(8) NOT NULL,
post_by INT(8) NOT NULL,
PRIMARY KEY (post_id)
)

-- this table is for replies to posts inside of topics
CREATE TABLE replies (
reply_id INT(8) NOT NULL AUTO_INCREMENT,
reply_content TEXT NOT NULL,
reply_date DATETIME NOT NULL,
reply_post INT(8) NOT NULL,
reply_by INT(8) NOT NULL,
PRIMARY KEY (reply_id)
)

-- link posts to topics
ALTER TABLE posts ADD FOREIGN KEY(post_topic) REFERENCES topics(topic_id) ON DELETE CASCADE ON UPDATE CASCADE;
-- link posts to users
ALTER TABLE posts ADD FOREIGN KEY(post_by) REFERENCES users(user_id) ON DELETE RESTRICT ON UPDATE CASCADE;
-- link replies to posts
ALTER TABLE replies ADD FOREIGN KEY(reply_topic) REFERENCES posts(post_id) ON DELETE CASCADE ON UPDATE CASCADE;
-- link replies to users
ALTER TABLE replies ADD FOREIGN KEY(reply_by) REFERENCES users(user_id) ON DELETE RESTRICT ON UPDATE CASCADE;
*/
