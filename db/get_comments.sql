select 
    comments.comment, comments.id, comments.post_id, users.username, users.id as user_id 
from comments 
join users 
on comments.user_id = users.id 
where comments.post_id = $1;