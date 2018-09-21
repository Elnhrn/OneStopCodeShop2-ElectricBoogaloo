USE forum_db;

INSERT INTO users (user_name, user_pass, user_level)
VALUES ('Enea', 'Key4Butthole', 0), ('Roger', 'CurseUFlapjack', 1), ('Collin', 'SenpaiPlz', 0), ('Elaine', 'lessthan3', 1), ('Jordan', '1a2b3', 0);

INSERT INTO topics (topic_name, topic_description)
VALUES ('HTML', 'all things DOM related'), ('CSS', 'got style'), ('javascript', 'front end moving parts'), ('api AJAX', 'dealing with api and JSON'), ('mysql', 'sequel tables');

INSERT INTO posts (post_subject, post_body, post_topic, post_by)
VALUES ('make look nice', 'What CSS framework should I use to make my page look the best?', 2, 4), ('I like a challenge', 'How can I make my code more difficult?', 3, 3), ('I like the way his looks', 'How do I make my page look like something else I have seen?', 2, 4), ('sql HELP ME!', 'My seeds are not seeding', 5, 1), ('I love frameworks!', 'I love materialize!', 1, 1)

INSERT INTO replies (reply_content, reply_post, reply_by)
VALUES ('Me too!', 5, 2), ('Me too!', 5, 3), ('Me too!', 5, 4), ('Me too!', 5, 5), ('Obviously materialize', 1, 1), ('delete system32', 2, 4), ('git clone his repo', 3, 2), ('cry in a corner, then give it to me', 4, 4);