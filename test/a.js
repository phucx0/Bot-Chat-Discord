const nlp = require("compromise");

const sentence = "i like tiktok and instagram";
const doc = nlp(sentence);
console.log(doc.topics().json()); // Lấy danh từ quan trọng
console.log(doc.nouns().json()); // Lấy danh từ quan trọng