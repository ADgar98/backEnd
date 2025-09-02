const fs = require('fs');
const path = require('path')
const getUsers = () => {
  try {
    const filePath = path.join(__dirname, '../data/users.json')
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error('Ошибка чтения файла:', error.message);
    return '{"error": "File not found"}';
  }
}

module.exports = getUsers;



