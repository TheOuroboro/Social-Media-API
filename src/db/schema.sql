--user table

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

--post table
CREATE TABLE IF NOT EXISTS posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL, 
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERNECES user(id) ON DELETE CASCADE
);

--comments table
CREATE TABLE IF NOT EXISTS comments(
    id INT AUTO INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(post_id) REFERNECES post_id ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERNECES user_id ON DELETE CASCADE
);

--likes table
CREATE TABLE IF NOT EXISTS likes(
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, post_id),
    FOREIGN KEY (user_id) REFERNECES user_id ON DELETE CASCADE,
    FOREIGN KEY (post_id) REFERNECES post_id ON DELETE CASCADE,
);

--follow table
CREATE TABLE IF NOT EXIST follow(
follower_id INT NOT NULL,
followed_id INT NOT NULL.
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (follower_id, followed_id),
FOREIGN KEY (follower_id) REFERNECES user_id ON DELETE CASCADE,
FOREIGN KEY (followed_id) REFERNECES user_id ON DELETE CASCADE,
CONSTRAINT chk_self_follow CHECK (follower_id <> followed_id) --stops a follower from following theirself
)

