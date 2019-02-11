select * from posts where id = $1;

-- select * from posts join comments on comments.post_id = posts.id where posts.id = $1;

-- select users.username, posts.image_url, posts.caption, comments.comment 
-- from users
-- join posts on posts.user_id = users.id
-- join comments on comments.post_id = posts.id
-- where posts.id = $1;