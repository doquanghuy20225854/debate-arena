-- Users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Topics table
CREATE TABLE topics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rooms table
CREATE TABLE rooms (
  id INT AUTO_INCREMENT PRIMARY KEY,
  room_code VARCHAR(10) UNIQUE NOT NULL,
  topic_id INT,
  host_id INT,
  status VARCHAR(20) DEFAULT 'waiting',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (topic_id) REFERENCES topics(id),
  FOREIGN KEY (host_id) REFERENCES users(id)
);

-- Participants table
CREATE TABLE participants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  room_id INT,
  user_id INT,
  role VARCHAR(20),
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Debates table
CREATE TABLE debates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  room_id INT,
  debater_id INT,
  content TEXT,
  duration INT,
  turn_order INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
  FOREIGN KEY (debater_id) REFERENCES users(id)
);

-- Votes table
CREATE TABLE votes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  room_id INT,
  voter_id INT,
  debater_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
  FOREIGN KEY (voter_id) REFERENCES users(id),
  FOREIGN KEY (debater_id) REFERENCES users(id),
  UNIQUE KEY unique_vote (room_id, voter_id)
);

-- Chat messages table
CREATE TABLE chat_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  room_id INT,
  user_id INT,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Insert sample topics
INSERT INTO topics (title, description, category) VALUES
('Học online tốt hơn học offline', 'Tranh luận về hiệu quả của học trực tuyến', 'Education'),
('AI sẽ thay thế con người', 'Liệu trí tuệ nhân tạo có thể thay thế con người?', 'Technology'),
('Mạng xã hội có hại cho thanh thiếu niên', 'Tác động của mạng xã hội', 'Social'),
('Làm việc từ xa tốt hơn đi làm văn phòng', 'Remote work vs Office work', 'Work'),
('Game online có lợi hay có hại', 'Ảnh hưởng của game đến người chơi', 'Entertainment');