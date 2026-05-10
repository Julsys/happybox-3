const STORAGE_KEY = "happy-box-capsules";
const API_BASE = window.location.protocol === "file:" ? null : window.location.origin;
const COLORS = ["pink", "blue", "yellow", "green", "purple"];

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

const elements = {
  pit: document.querySelector("#capsulePit"),
  catchBtn: document.querySelector("#catchBtn"),
  clawRig: document.querySelector("#clawRig"),
  grabbedCapsule: document.querySelector("#grabbedCapsule"),
  storyModal: document.querySelector("#storyModal"),
  submitModal: document.querySelector("#submitModal"),
  storyContent: document.querySelector("#storyContent"),
  reactionText: document.querySelector("#reactionText"),
  modalCapsule: document.querySelector("#modalCapsule"),
  timeCount: document.querySelector("#timeCount"),
  statsText: document.querySelector("#statsText"),
  form: document.querySelector("#storyForm"),
  storyInput: document.querySelector("#storyInput"),
  charCount: document.querySelector("#charCount"),
  toast: document.querySelector("#toast"),
  soundToggle: document.querySelector("#soundToggle"),
  backgroundMusic: document.querySelector("#backgroundMusic")
};

let activeCapsule = null;
let visualCapsules = [];
let latestCapsuleId = null;

function getCapsules() {
  const raw = localStorage.getItem(STORAGE_KEY);
  const capsules = raw ? JSON.parse(raw) : [];
  const existingContent = new Set(capsules.map((capsule) => normalizeContent(capsule.content)));
  let changed = false;

  seedStories.forEach((content, index) => {
    const key = normalizeContent(content);
    if (existingContent.has(key)) return;

    capsules.push(createSeedCapsule(content, capsules.length + index));
    existingContent.add(key);
    changed = true;
  });

  if (changed || !raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(capsules));
  }

  return capsules;
}

function normalizeContent(content) {
  return String(content || "").trim().replace(/\s+/g, " ").toLowerCase();
}

function createSeedCapsule(content, index) {
  return {
    id: createId(),
    content,
    color: COLORS[index % COLORS.length],
    createdAt: new Date(Date.now() - index * 86400000).toISOString(),
    hearts: Math.floor(Math.random() * 12),
    thanks: Math.floor(Math.random() * 7)
  };
}

async function apiRequest(path, options = {}) {
  if (API_BASE === null) return null;

  try {
    const response = await fetch(`${API_BASE}${path}`, {
      headers: {
        "content-type": "application/json",
        ...(options.headers || {})
      },
      ...options
    });
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

function saveCapsules(capsules) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(capsules));
  updateStats();
}

function createId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }
  return `capsule-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

async function updateStats() {
  const remoteStats = await apiRequest("/api/stats");
  if (remoteStats) {
    elements.statsText.textContent = `Đang có ${remoteStats.count} mẩu chuyện trong hộp. Tất cả đều ẩn danh.`;
    return;
  }

  const count = getCapsules().length;
  elements.statsText.textContent = `Đang có ${count} mẩu chuyện trong hộp. Tất cả đều ẩn danh.`;
}

function capsuleMarkup(color) {
  const capsule = document.createElement("div");
  capsule.className = `capsule ${color}`;
  return capsule;
}

async function refreshCapsuleVisuals() {
  const remoteData = await apiRequest("/api/capsules");
  if (remoteData?.capsules?.length) {
    visualCapsules = remoteData.capsules;
    return visualCapsules;
  }

  visualCapsules = getCapsules().map(({ id, color, createdAt }) => ({ id, color, createdAt }));
  return visualCapsules;
}

function getPitCapsules() {
  if (visualCapsules.length) return visualCapsules;
  return getCapsules().map(({ id, color, createdAt }) => ({ id, color, createdAt }));
}

function replaceChildrenSafe(parent, child) {
  parent.textContent = "";
  parent.appendChild(child);
}

function renderPit() {
  elements.pit.innerHTML = "";
  const pitCapsules = getPitCapsules();
  const pitWidth = Math.max(elements.pit.clientWidth || 640, 320);
  const pitHeight = Math.max(elements.pit.clientHeight || 250, 200);
  const capsuleWidth = pitWidth < 430 ? 66 : pitWidth < 560 ? 78 : 92;
  const gap = capsuleWidth * 0.9;
  const baseY = Math.max(24, pitHeight - capsuleWidth * 0.92);
  const rows = [
    { y: baseY, count: Math.ceil(pitWidth / gap) + 1 },
    { y: baseY - capsuleWidth * 0.55, count: Math.ceil(pitWidth / gap) },
    { y: baseY - capsuleWidth * 1.1, count: Math.ceil(pitWidth / gap) - 1 },
    { y: baseY - capsuleWidth * 1.65, count: Math.max(4, Math.ceil(pitWidth / gap) - 3) }
  ];

  const slots = [];
  rows.forEach((row, rowIndex) => {
    for (let i = 0; i < row.count; i += 1) {
      slots.push({ row, rowIndex, i });
    }
  });

  const visibleCapsules = pitCapsules.slice(0, slots.length).reverse();
  slots.slice(0, visibleCapsules.length).forEach(({ row, rowIndex, i }, slotIndex) => {
      const capsuleData = visibleCapsules[slotIndex];
      const capsule = capsuleMarkup(capsuleData.color || COLORS[(i + rowIndex) % COLORS.length]);
      if (capsuleData.id === latestCapsuleId) {
        capsule.classList.add("is-new");
      }
      capsule.style.width = `${capsuleWidth}px`;
      capsule.style.height = `${Math.round(capsuleWidth * 0.48)}px`;
      const x = 10 + i * (gap - rowIndex * 3) + (rowIndex % 2 ? gap * 0.36 : 0);
      const y = row.y + ((i % 2) * 13);
      const rotation = [-28, 14, -9, 24, -18, 7][(i + rowIndex) % 6];
      capsule.style.setProperty("--x", `${x}px`);
      capsule.style.setProperty("--y", `${y}px`);
      capsule.style.setProperty("--r", `${rotation}deg`);
      elements.pit.appendChild(capsule);
  });
}

function pickRandomCapsule() {
  const capsules = getCapsules();
  return capsules[Math.floor(Math.random() * capsules.length)];
}

async function pickRandomCapsuleAsync() {
  const remoteCapsule = await apiRequest("/api/capsules/random");
  return remoteCapsule || pickRandomCapsule();
}

function showStory(capsule) {
  activeCapsule = capsule;
  elements.storyContent.textContent = capsule.content;
  elements.reactionText.textContent = `${capsule.hearts || 0} tim • ${capsule.thanks || 0} lời cảm ơn đã được gửi cho câu chuyện này.`;
  const color = getComputedStyle(document.documentElement).getPropertyValue(colorToVar(capsule.color));
  elements.modalCapsule.style.setProperty("--modal-color", color.trim());
  openDialog(elements.storyModal);
}

function colorToVar(color) {
  const map = {
    pink: "--pink",
    blue: "--sky",
    yellow: "--cream",
    green: "--mint",
    purple: "--lavender"
  };
  return map[color] || "--pink";
}

async function animateCatch() {
  if (elements.catchBtn.disabled) return;

  const capsule = await pickRandomCapsuleAsync();
  const visual = capsuleMarkup(capsule.color);
  replaceChildrenSafe(elements.grabbedCapsule, visual);

  elements.timeCount.textContent = "30";
  elements.catchBtn.disabled = true;
  elements.clawRig.classList.remove("is-catching");
  void elements.clawRig.offsetWidth;
  elements.clawRig.classList.add("is-catching");

  const countdown = setInterval(() => {
    const next = Math.max(0, Number(elements.timeCount.textContent) - 3);
    elements.timeCount.textContent = String(next).padStart(2, "0");
  }, 330);

  setTimeout(() => {
    clearInterval(countdown);
    elements.timeCount.textContent = "30";
    elements.catchBtn.disabled = false;
    elements.clawRig.classList.remove("is-catching");
    showStory(capsule);
  }, 4250);
}

async function addReaction(type) {
  if (!activeCapsule) return;

  const remoteCapsule = await apiRequest(`/api/capsules/${activeCapsule.id}/reactions`, {
    method: "POST",
    body: JSON.stringify({ type })
  });
  if (remoteCapsule) {
    activeCapsule = remoteCapsule;
    elements.reactionText.textContent = `${remoteCapsule.hearts || 0} tim • ${remoteCapsule.thanks || 0} lời cảm ơn đã được gửi cho câu chuyện này.`;
    return;
  }

  const capsules = getCapsules();
  const capsule = capsules.find((item) => item.id === activeCapsule.id);
  if (!capsule) return;

  capsule[type] = (capsule[type] || 0) + 1;
  activeCapsule = capsule;
  saveCapsules(capsules);
  elements.reactionText.textContent = `${capsule.hearts || 0} tim • ${capsule.thanks || 0} lời cảm ơn đã được gửi cho câu chuyện này.`;
}

async function submitStory(event) {
  event.preventDefault();
  const content = elements.storyInput.value.trim();
  if (content.length < 12) {
    showToast("Hãy gửi một mẩu chuyện dài hơn một chút nhé.");
    return;
  }

  const remoteCapsule = await apiRequest("/api/capsules", {
    method: "POST",
    body: JSON.stringify({ content })
  });
  if (remoteCapsule) {
    latestCapsuleId = remoteCapsule.id;
    visualCapsules.unshift({
      id: remoteCapsule.id,
      color: remoteCapsule.color,
      createdAt: remoteCapsule.createdAt
    });
    elements.form.reset();
    elements.charCount.textContent = "0/420";
    elements.submitModal.close();
    showToast("Câu chuyện đã biến thành một viên nhộng mới trong Happy Box.");
    renderPit();
    updateStats();
    return;
  }

  const capsules = getCapsules();
  const capsule = {
    id: createId(),
    content,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    createdAt: new Date().toISOString(),
    hearts: 0,
    thanks: 0
  };
  capsules.unshift(capsule);
  latestCapsuleId = capsule.id;
  visualCapsules.unshift({
    id: capsule.id,
    color: capsule.color,
    createdAt: capsule.createdAt
  });
  saveCapsules(capsules);
  elements.form.reset();
  elements.charCount.textContent = "0/420";
  elements.submitModal.close();
  showToast("Câu chuyện đã được bỏ vào Happy Box.");
  renderPit();
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    elements.toast.classList.remove("show");
  }, 2300);
}

function toggleMusic() {
  const backgroundMusic = elements.backgroundMusic;
  if (!backgroundMusic) {
    showToast("Không tìm thấy file nhạc nền.");
    return;
  }

  if (!backgroundMusic.paused) {
    backgroundMusic.pause();
    elements.soundToggle.classList.remove("active");
    showToast("Đã tắt nhạc nền.");
    return;
  }

  backgroundMusic.volume = 0.45;
  backgroundMusic.play()
    .then(() => {
      elements.soundToggle.classList.add("active");
      showToast("Đã bật nhạc nền.");
    })
    .catch(() => {
      showToast("Trình duyệt chưa cho phép phát nhạc. Hãy bấm lại nút nhạc.");
    });
}

function openDialog(dialog) {
  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else {
    dialog.setAttribute("open", "");
  }
}

document.querySelector("#openSubmit").addEventListener("click", () => openDialog(elements.submitModal));
document.querySelector("#openSubmitSide").addEventListener("click", () => openDialog(elements.submitModal));
document.querySelector("#closeSubmit").addEventListener("click", () => elements.submitModal.close());
document.querySelector("#closeStory").addEventListener("click", () => elements.storyModal.close());
document.querySelector("#heartBtn").addEventListener("click", () => addReaction("hearts"));
document.querySelector("#thanksBtn").addEventListener("click", () => addReaction("thanks"));
elements.catchBtn.addEventListener("click", animateCatch);
elements.form.addEventListener("submit", submitStory);
elements.soundToggle.addEventListener("click", toggleMusic);
elements.backgroundMusic?.addEventListener("error", () => {
  elements.soundToggle.classList.remove("active");
  showToast("Không tải được file nhạc. Hãy kiểm tra assets/happy-box-bgm.mp3 trên GitHub.");
});
elements.storyInput.addEventListener("input", () => {
  elements.charCount.textContent = `${elements.storyInput.value.length}/420`;
});

refreshCapsuleVisuals().then(renderPit);
updateStats();
window.addEventListener("resize", () => {
  window.clearTimeout(renderPit.resizeTimer);
  renderPit.resizeTimer = window.setTimeout(renderPit, 120);
});

window.setInterval(() => {
  refreshCapsuleVisuals().then(renderPit);
  updateStats();
}, 30000);
