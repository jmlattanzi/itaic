delete from posts where post_id = $1;
delete from comments where post_id = $1;