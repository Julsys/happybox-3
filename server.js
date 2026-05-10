const http = require("http");
const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const DATA_DIR = process.env.DATA_DIR || path.join(ROOT, "data");
const DATA_FILE = path.join(DATA_DIR, "capsules.json");
const COLORS = ["pink", "blue", "yellow", "green", "purple"];
let dataQueue = Promise.resolve();

const seedStories = [
  "Hôm nay mình đi bộ dưới trời mưa nhỏ. Một cô bán hoa thấy mình không có ô nên dúi cho mình một chiếc túi nilon để che điện thoại. Việc nhỏ thôi, nhưng mình thấy cả ngày dịu lại.",
  "Có lần mình nấu ăn bị cháy một chút. Bạn cùng phòng không chê, chỉ cười rồi bảo: mùi này giống bếp nhà hồi nhỏ. Tối đó tụi mình ăn hết sạch.",
  "Sáng nay bé mèo nhà hàng xóm chạy theo mình đến tận cổng. Nó ngồi đó nhìn như tiễn đi làm. Mình đã cười suốt quãng đường.",
  "Mình nhận được tin nhắn từ một người bạn cũ: 'Tớ vừa nghe bài này và nhớ đến cậu'. Chỉ một dòng thôi mà làm mình thấy mình vẫn được nhớ.",
  "Hôm qua mình tự mua cho mình một cái bánh nhỏ, cắm một cây nến, và chúc mừng vì đã vượt qua một tuần khó. Không cần dịp lớn mới được vui.",
  "Một em bé trong thang máy nhìn sticker trên laptop của mình rồi nói 'đẹp quá'. Mình thấy phiên bản trẻ con trong mình cũng được khen theo.",
  "Mẹ gọi hỏi mình ăn cơm chưa. Lần này mình không vội cúp máy, hai mẹ con kể chuyện linh tinh gần nửa tiếng. Tắt máy xong thấy lòng ấm hẳn.",
  "Mình nhặt được một tờ giấy note ai đó dán trong thư viện: 'Bạn đang làm tốt hơn bạn nghĩ'. Mình để nó trong ví đến giờ.",
  "Sáng nay mình pha cà phê quá ngọt, tưởng hỏng rồi. Ai ngờ uống xong tỉnh táo hẳn và tự nhiên thấy mình giống nhân vật chính trong quảng cáo sữa đặc.",
  "Mình đặt báo thức 7 giờ nhưng tỉnh lúc 6 giờ 59. Cảm giác thắng được thời gian đúng một phút làm mình vui bất ngờ.",
  "Hôm nay mình mặc áo trái ra ngoài suốt nửa buổi. Khi phát hiện, mình tự cười rất lâu vì ít nhất chiếc áo cũng được đổi gió.",
  "Một người lạ nhường mình chỗ trú mưa dưới mái hiên. Hai người đứng im nghe mưa rơi, không nói gì nhiều, nhưng khoảnh khắc đó rất dễ chịu.",
  "Mình nấu mì và trứng rơi vào nồi thành hình gần giống trái tim. Bữa ăn rẻ tiền bỗng có cảm giác như nhà hàng biết quan tâm.",
  "Mình gửi nhầm sticker quá hào hứng trong nhóm làm việc. Tưởng sẽ ngại, ai ngờ cả nhóm gửi sticker theo và cuộc họp nhẹ đi hẳn.",
  "Có bạn khen chữ ký của mình đẹp. Mình đã ký thử thêm ba lần vào giấy nháp như thể đang chuẩn bị nổi tiếng.",
  "Hôm nay mình đi siêu thị và đúng bài hát mình thích bật lên. Mình chọn rau nghiêm túc hơn bình thường vì thấy cuộc đời có nhạc nền.",
  "Mình tìm thấy tờ tiền nhỏ trong túi áo cũ. Số tiền không lớn, nhưng cảm giác như phiên bản quá khứ vừa gửi quà cho mình.",
  "Một cô bán hàng gọi mình là 'bé ơi' dù mình đã trưởng thành. Hơi buồn cười, nhưng ngày hôm đó mình thấy mình được dịu dàng thêm chút.",
  "Mình lau bàn học, tìm lại được cây bút tưởng mất. Nó viết vẫn mượt, giống như một người bạn cũ quay lại đúng lúc.",
  "Bạn mình nhắn: 'Tớ để dành miếng bánh cuối cho cậu'. Nghe đơn giản thôi, nhưng có những ngày một miếng bánh cũng giống một cái ôm.",
  "Hôm nay mình tự sửa được một lỗi nhỏ trên máy tính sau 20 phút bấm lung tung có định hướng. Cảm giác như vừa tốt nghiệp ngành kiên nhẫn.",
  "Mình đi mua nước, được tặng thêm đá vì nhân viên bảo trời nóng quá. Một ly nước mát làm mình tin rằng thế giới vẫn có những bonus nhỏ.",
  "Có người giữ thang máy cho mình dù mình còn cách khá xa. Mình chạy tới hơi vụng, nhưng cả hai cùng cười nên thấy ngày nhẹ hơn.",
  "Tối qua mình gấp chăn xong rất ngay ngắn. Không ai trao giải, nhưng mình tự trao cho mình danh hiệu người lớn tạm thời của ngày."
];

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mp3": "audio/mpeg",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

async function ensureDataFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  let capsules = [];
  let shouldWrite = false;

  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    capsules = JSON.parse(raw);
  } catch {
    shouldWrite = true;
  }

  const existingContent = new Set(capsules.map((capsule) => normalizeContent(capsule.content)));
  seedStories.forEach((content, index) => {
    const key = normalizeContent(content);
    if (existingContent.has(key)) return;

    capsules.push(createSeedCapsule(content, capsules.length + index));
    existingContent.add(key);
    shouldWrite = true;
  });

  if (shouldWrite) {
    await writeCapsules(capsules);
  }
}

function normalizeContent(content) {
  return String(content || "").trim().replace(/\s+/g, " ").toLowerCase();
}

function createSeedCapsule(content, index) {
  return {
    id: crypto.randomUUID(),
    content,
    color: COLORS[index % COLORS.length],
    createdAt: new Date(Date.now() - index * 86400000).toISOString(),
    hearts: Math.floor(Math.random() * 12),
    thanks: Math.floor(Math.random() * 7)
  };
}

async function readCapsules() {
  await ensureDataFile();
  const raw = await fs.readFile(DATA_FILE, "utf8");
  return JSON.parse(raw);
}

async function writeCapsules(capsules) {
  await fs.writeFile(DATA_FILE, JSON.stringify(capsules, null, 2), "utf8");
}

function updateCapsules(mutator) {
  const operation = dataQueue.then(async () => {
    const capsules = await readCapsules();
    const result = await mutator(capsules);
    await writeCapsules(capsules);
    return result;
  });

  dataQueue = operation.catch(() => {});
  return operation;
}

function sendJson(res, statusCode, data) {
  const body = JSON.stringify(data);
  res.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store"
  });
  res.end(body);
}

function sendError(res, statusCode, message) {
  sendJson(res, statusCode, { error: message });
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 20_000) {
        reject(new Error("Request body is too large."));
        req.destroy();
      }
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error("Invalid JSON."));
      }
    });
    req.on("error", reject);
  });
}

async function handleApi(req, res, url) {
  if (req.method === "GET" && url.pathname === "/api/health") {
    sendJson(res, 200, { ok: true });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/stats") {
    const capsules = await readCapsules();
    sendJson(res, 200, { count: capsules.length });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/capsules") {
    const capsules = await readCapsules();
    sendJson(res, 200, {
      capsules: capsules.map(({ id, color, createdAt }) => ({ id, color, createdAt }))
    });
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/capsules/random") {
    const capsules = await readCapsules();
    if (capsules.length === 0) {
      sendError(res, 404, "No capsules available.");
      return;
    }
    const capsule = capsules[Math.floor(Math.random() * capsules.length)];
    sendJson(res, 200, capsule);
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/capsules") {
    const body = await readBody(req);
    const content = String(body.content || "").trim();
    if (content.length < 12) {
      sendError(res, 400, "Story must be at least 12 characters.");
      return;
    }
    if (content.length > 420) {
      sendError(res, 400, "Story must be 420 characters or fewer.");
      return;
    }

    const capsule = await updateCapsules((capsules) => {
      const newCapsule = {
        id: crypto.randomUUID(),
        content,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        createdAt: new Date().toISOString(),
        hearts: 0,
        thanks: 0
      };
      capsules.unshift(newCapsule);
      return newCapsule;
    });
    sendJson(res, 201, capsule);
    return;
  }

  const reactionMatch = url.pathname.match(/^\/api\/capsules\/([^/]+)\/reactions$/);
  if (req.method === "POST" && reactionMatch) {
    const body = await readBody(req);
    const type = body.type === "thanks" ? "thanks" : body.type === "hearts" ? "hearts" : null;
    if (!type) {
      sendError(res, 400, "Invalid reaction type.");
      return;
    }

    const capsule = await updateCapsules((capsules) => {
      const target = capsules.find((item) => item.id === reactionMatch[1]);
      if (!target) return null;
      target[type] = (target[type] || 0) + 1;
      return target;
    });
    if (!capsule) {
      sendError(res, 404, "Capsule not found.");
      return;
    }
    sendJson(res, 200, capsule);
    return;
  }

  sendError(res, 404, "API route not found.");
}

async function serveStatic(req, res, url) {
  const requestedPath = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  const absolutePath = path.normalize(path.join(ROOT, requestedPath));
  const relativePath = path.relative(ROOT, absolutePath);

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath) || relativePath.split(path.sep)[0] === "data") {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  try {
    const file = await fs.readFile(absolutePath);
    const ext = path.extname(absolutePath).toLowerCase();
    res.writeHead(200, {
      "content-type": mimeTypes[ext] || "application/octet-stream"
    });
    res.end(file);
  } catch {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    if (url.pathname.startsWith("/api/")) {
      await handleApi(req, res, url);
      return;
    }
    await serveStatic(req, res, url);
  } catch (error) {
    sendError(res, 500, error.message || "Internal server error.");
  }
});

ensureDataFile()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Happy Box is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
