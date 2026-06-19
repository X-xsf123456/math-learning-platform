const fs = require('fs');
const path = require('path');
const config = require('../config');

// 确保数据目录存在
if (!fs.existsSync(config.DATA_DIR)) {
  fs.mkdirSync(config.DATA_DIR, { recursive: true });
}

function readJSON(filename) {
  const filepath = path.join(config.DATA_DIR, filename);
  if (!fs.existsSync(filepath)) {
    writeJSON(filename, []);
    return [];
  }
  try {
    const data = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeJSON(filename, data) {
  const filepath = path.join(config.DATA_DIR, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8');
}

function findOne(filename, predicate) {
  const data = readJSON(filename);
  return data.find(predicate) || null;
}

function insertOne(filename, record) {
  const data = readJSON(filename);
  data.push(record);
  writeJSON(filename, data);
  return record;
}

module.exports = { readJSON, writeJSON, findOne, insertOne };
