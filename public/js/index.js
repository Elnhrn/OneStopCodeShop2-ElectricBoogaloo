//DOESN'T CURRENTLY WORK. SHOULD BE ABLE TO REWORK IN CLASS TOMORROW

// var db = require("../models");

// $(document).ready(function () {

//     // initializing the select options
//     $('select').formSelect();

//     $('#submit').on('click', function (event) {

//         event.preventDefault();

//         // pulling values from the survey and storing them in an object
//         let postTitle = $("#post_title").val().trim();
//         let topic = $("#topic_name").val().trim();
//         let postBody = $("#textarea1").val();

//         let addToTopic= topic_number + 1;

//         db.Topics.update({ where: { topic_name: topic}, addToTopic}).then(function (dbTopics) {
//             db.Posts.create({
//                 post_subject: postTitle,
//                 post_body: postBody,
//                 post_rating: 0,
//                 post_number: 0,
//                 // NEED TO FIND WAY TO REFERENCE THESE
//                 // UserId: ,
//                 TopicId: dbTopics.id
//             }).then({

//             });

//         });

//     });

// });