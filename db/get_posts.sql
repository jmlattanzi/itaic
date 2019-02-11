-- get all posts and user info
select users.username, posts.id, posts.image_url, posts.caption
from users
join posts on posts.user_id = users.id;