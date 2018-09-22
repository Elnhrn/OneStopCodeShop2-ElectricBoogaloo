USE forum_db;

INSERT INTO users (user_name, user_pass, user_level, createdAt, updatedAt)
VALUES ('Enea', 'Key4Butthole', 0, '2018/09/20 00:00:00', '2018/09/20 00:00:00'), ('Roger', 'CurseUFlapjack', 1, '2018/09/20 00:00:00', '2018/09/20 00:00:00'), ('Collin', 'SenpaiPlz', 0, '2018/09/20 00:00:00', '2018/09/20 00:00:00'), ('Elaine', 'lessthan3', 1, '2018/09/20 00:00:00', '2018/09/20 00:00:00'), ('Jordan', '1a2b3', 0, '2018/09/20 00:00:00', '2018/09/20 00:00:00');

INSERT INTO topics (topic_name, topic_description, createdAt, updatedAt)
VALUES ('HTML', 'all things DOM related', '2018/09/20 00:00:00', '2018/09/20 00:00:00'), ('CSS', 'got style', '2018/09/20 00:00:00', '2018/09/20 00:00:00'), ('javascript', 'front end moving parts', '2018/09/20 00:00:00', '2018/09/20 00:00:00'), ('api AJAX', 'dealing with api and JSON', '2018/09/20 00:00:00', '2018/09/20 00:00:00'), ('mysql', 'sequel tables', '2018/09/20 00:00:00', '2018/09/20 00:00:00');

INSERT INTO posts (post_subject, post_body, TopicId, UserId, createdAt, updatedAt)
VALUES ('make look nice', 'What CSS framework should I use to make my page look the best?', 2, 4, '2018/09/20 00:00:00', '2018/09/20 00:00:00'), ('I like a challenge', 'How can I make my code more difficult?', 3, 3, '2018/09/20 00:00:00', '2018/09/20 00:00:00'), ('I like the way his looks', 'How do I make my page look like something else I have seen?', 2, 4, '2018/09/20 00:00:00', '2018/09/20 00:00:00'), ('sql HELP ME!', 'My seeds are not seeding', 5, 1, '2018/09/20 00:00:00', '2018/09/20 00:00:00'), ('I love frameworks!', 'I love materialize!', 1, 1, '2018/09/20 00:00:00', '2018/09/20 00:00:00');

INSERT INTO replies (reply_content, PostId, UserId, createdAt, updatedAt)
VALUES ('Me too!', 5, 2, '2018/09/20 00:00:00', '2018/09/20 00:00:00'), ('Me too!', 5, 3, '2018/09/20 00:00:00', '2018/09/20 00:00:00'), ('Me too!', 5, 4, '2018/09/20 00:00:00', '2018/09/20 00:00:00'), ('Me too!', 5, 5, '2018/09/20 00:00:00', '2018/09/20 00:00:00'), ('Obviously materialize', 1, 1, '2018/09/20 00:00:00', '2018/09/20 00:00:00'), ('delete system32', 2, 4, '2018/09/20 00:00:00', '2018/09/20 00:00:00'), ('git clone his repo', 3, 2, '2018/09/20 00:00:00', '2018/09/20 00:00:00'), ('cry in a corner, then give it to me', 4, 4, '2018/09/20 00:00:00', '2018/09/20 00:00:00');