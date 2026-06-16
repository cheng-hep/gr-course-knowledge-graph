const chapterColors = [
  "#2563eb",
  "#059669",
  "#b45309",
  "#dc2626",
  "#7c3aed",
  "#0f766e",
  "#be185d",
  "#4d7c0f",
  "#64748b",
  "#0891b2",
  "#ea580c",
  "#4338ca",
  "#78716c",
  "#a16207",
  "#0369a1",
  "#6d28d9",
];

const relationLabels = {
  prerequisite_of: "前置",
  part_of: "组成",
  derived_from: "推导",
  applied_to: "应用",
  confused_with: "易混",
  supports: "支撑",
};

const state = {
  graph: null,
  selectedId: null,
  query: "",
};

const networkEl = document.getElementById("network");
const statusEl = document.getElementById("status");
const searchInput = document.getElementById("searchInput");
const detailTitle = document.getElementById("detailTitle");
const detailSubtitle = document.getElementById("detailSubtitle");
const detailList = document.getElementById("detailList");
const qaInput = document.getElementById("qaInput");
const askButton = document.getElementById("askButton");
const qaAnswer = document.getElementById("qaAnswer");
const qaExampleButtons = document.querySelectorAll(".qa-examples button");

function colorForChapter(chapter) {
  const index = (Number(chapter) - 1) % chapterColors.length;
  return chapterColors[index >= 0 ? index : 0];
}

function formatList(items, fallback = "无") {
  return items && items.length ? items.join("、") : fallback;
}

function getConcept(id) {
  return state.graph.nodes.find((node) => node.id === id);
}

function renderImportanceStars(importance) {
  const activeCount = Math.max(0, Math.min(5, Number(importance) || 0));
  const stars = Array.from({ length: 5 }, (_, index) => {
    const className = index < activeCount ? "star is-active" : "star";
    return `<span class="${className}" aria-hidden="true">★</span>`;
  }).join("");
  return `<span class="importance-stars" aria-label="重要性 ${activeCount} 星，共 5 星">${stars}</span>`;
}

function renderDetails(nodeId) {
  const node = getConcept(nodeId);
  if (!node) return;

  state.selectedId = node.id;
  detailTitle.textContent = node.label;
  detailSubtitle.textContent = `${node.name_en} · 第 ${node.chapter} 讲`;

  const prereqNames = node.prerequisites.map((id) => {
    const prereq = getConcept(id);
    return prereq ? prereq.label : id;
  });

  const rows = [
    ["英文名", node.name_en],
    ["所属章节", `第 ${node.chapter} 讲`],
    ["重要性", renderImportanceStars(node.importance)],
    ["前置知识", formatList(prereqNames)],
    ["学习目标", node.learning_objective],
    ["常见误区", node.common_misconception],
    ["AI 学习任务", node.ai_learning_task],
    ["教师检查", node.needs_teacher_review ? "需要" : "不需要"],
  ];

  detailList.innerHTML = rows
    .map(([term, value]) => `<dt>${term}</dt><dd>${value}</dd>`)
    .join("");

  renderGraph();
}

function normalizeText(value) {
  return String(value || "").trim().toLowerCase();
}

function conceptSearchText(node) {
  return [
    node.id,
    node.label,
    node.name_en,
    node.learning_objective,
    node.common_misconception,
    node.ai_learning_task,
    ...(node.prerequisites || []),
  ]
    .map(normalizeText)
    .join(" ");
}

function scoreConceptForQuestion(node, question) {
  const q = normalizeText(question);
  const text = conceptSearchText(node);
  let score = 0;

  if (!q) return score;
  if (q.includes(normalizeText(node.label))) score += 80;
  if (q.includes(normalizeText(node.name_en))) score += 70;
  if (q.includes(normalizeText(node.id))) score += 70;

  for (const token of q.split(/[\s,，。？?、:：;；]+/).filter(Boolean)) {
    if (token.length >= 2 && text.includes(token)) score += token.length > 4 ? 12 : 8;
  }

  for (const char of node.label) {
    if (q.includes(char)) score += 1;
  }

  if (q.includes("前置") || q.includes("先学") || q.includes("基础")) {
    score += (node.prerequisites || []).length ? 6 : 0;
  }
  if (q.includes("误区") || q.includes("错误") || q.includes("混淆")) {
    score += node.common_misconception ? 6 : 0;
  }
  if (q.includes("任务") || q.includes("练习") || q.includes("ai")) {
    score += node.ai_learning_task ? 6 : 0;
  }

  return score;
}

function relatedEdgesForConcept(conceptId) {
  return state.graph.edges.filter((edge) => edge.source === conceptId || edge.target === conceptId);
}

function formatConceptLink(id) {
  const node = getConcept(id);
  return node ? node.label : id;
}

function renderAnswerSection(title, body) {
  return `<section class="qa-answer-section"><h3>${escapeHtml(title)}</h3>${body}</section>`;
}

function answerQuestion(question) {
  const q = normalizeText(question);
  if (!q) {
    return {
      conceptId: state.selectedId,
      html: "<p>请先输入一个课程问题。可以问某个概念是什么、需要哪些前置知识、有什么常见误区，或它和哪些知识点有关。</p>",
    };
  }

  const ranked = state.graph.nodes
    .map((node) => ({ node, score: scoreConceptForQuestion(node, question) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  if (!ranked.length) {
    return {
      conceptId: state.selectedId,
      html: "<p>我没有在知识图谱中找到明确匹配的知识点。可以换成讲义里的概念名，例如“度规”“测地线”“事件视界”再试。</p>",
    };
  }

  const node = ranked[0].node;
  const prereqNames = (node.prerequisites || []).map(formatConceptLink);
  const edges = relatedEdgesForConcept(node.id).slice(0, 6);
  const asksPrereq = q.includes("前置") || q.includes("先学") || q.includes("基础");
  const asksMisconception = q.includes("误区") || q.includes("错误") || q.includes("混淆");
  const asksTask = q.includes("任务") || q.includes("练习") || q.includes("ai");
  const asksRelation = q.includes("关系") || q.includes("相关") || q.includes("联系");

  const sections = [];
  sections.push(
    renderAnswerSection(
      `你问的可能是：${node.label}`,
      `<p>${escapeHtml(node.learning_objective)}</p>`,
    ),
  );

  if (asksPrereq || !asksMisconception && !asksTask) {
    sections.push(
      renderAnswerSection(
        "建议先补的前置知识",
        `<p>${escapeHtml(formatList(prereqNames, "这个知识点在图谱中没有显式前置知识。"))}</p>`,
      ),
    );
  }

  if (asksMisconception || !asksPrereq && !asksTask) {
    sections.push(
      renderAnswerSection("常见误区", `<p>${escapeHtml(node.common_misconception)}</p>`),
    );
  }

  if (asksTask || !asksPrereq && !asksMisconception) {
    sections.push(
      renderAnswerSection("AI 学习任务", `<p>${escapeHtml(node.ai_learning_task)}</p>`),
    );
  }

  if (asksRelation || edges.length) {
    const edgeItems = edges
      .map((edge) => {
        const otherId = edge.source === node.id ? edge.target : edge.source;
        const relation = relationLabels[edge.relation] || edge.relation;
        return `<li><strong>${escapeHtml(formatConceptLink(otherId))}</strong>：${escapeHtml(relation)}，${escapeHtml(edge.description)}</li>`;
      })
      .join("");
    sections.push(
      renderAnswerSection("图谱中的相关关系", edgeItems ? `<ul>${edgeItems}</ul>` : "<p>暂无直接关系边。</p>"),
    );
  }

  const otherMatches = ranked
    .slice(1)
    .map((item) => item.node.label)
    .join("、");
  if (otherMatches) {
    sections.push(`<p class="qa-related">也可能相关：${escapeHtml(otherMatches)}</p>`);
  }

  return {
    conceptId: node.id,
    html: sections.join(""),
  };
}

function handleQuestionSubmit() {
  const answer = answerQuestion(qaInput.value);
  qaAnswer.innerHTML = answer.html;
  if (answer.conceptId) {
    renderDetails(answer.conceptId);
  }
}

function matchesQuery(node) {
  if (!state.query) return true;
  const query = state.query.toLowerCase();
  return [node.id, node.label, node.name_en].some((field) =>
    String(field).toLowerCase().includes(query),
  );
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function layoutNodes(width, height) {
  const nodes = state.graph.nodes;
  const columns = width >= 1040 ? 6 : width >= 820 ? 5 : 4;
  const rows = Math.ceil(nodes.length / columns);
  const marginX = 78;
  const marginY = 64;
  const xGap = columns > 1 ? (width - marginX * 2) / (columns - 1) : 0;
  const yGap = rows > 1 ? (height - marginY * 2 - 36) / (rows - 1) : 0;
  const positions = new Map();

  nodes.forEach((node, index) => {
    const row = Math.floor(index / columns);
    const column = index % columns;
    const stagger = row % 2 ? xGap * 0.18 : 0;
    positions.set(node.id, {
      x: Math.min(width - marginX, marginX + column * xGap + stagger),
      y: marginY + row * yGap,
    });
  });
  return positions;
}

function edgePath(from, to) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const curve = Math.min(90, Math.max(30, Math.abs(dy) * 0.25 + Math.abs(dx) * 0.08));
  const c1x = from.x + dx * 0.45;
  const c1y = from.y + curve;
  const c2x = to.x - dx * 0.45;
  const c2y = to.y - curve;
  return `M ${from.x} ${from.y} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${to.x} ${to.y}`;
}

function renderGraph() {
  if (!state.graph) return;

  const rect = networkEl.getBoundingClientRect();
  const width = Math.max(820, Math.round(rect.width || 980));
  const height = Math.max(680, Math.round(rect.height || 760));
  const positions = layoutNodes(width, height);
  const matchingIds = new Set(state.graph.nodes.filter(matchesQuery).map((node) => node.id));
  const hasQuery = Boolean(state.query);

  const edgeMarkup = state.graph.edges
    .map((edge) => {
      const from = positions.get(edge.source);
      const to = positions.get(edge.target);
      if (!from || !to) return "";
      const isRelevant = hasQuery
        ? matchingIds.has(edge.source) || matchingIds.has(edge.target)
        : edge.source === state.selectedId || edge.target === state.selectedId;
      const isSelected = edge.source === state.selectedId || edge.target === state.selectedId;
      return `
        <path class="kg-edge ${isRelevant ? "" : "is-muted"} ${isSelected ? "is-selected" : ""}"
          d="${edgePath(from, to)}">
          <title>${escapeHtml(relationLabels[edge.relation] || edge.relation)}：${escapeHtml(edge.description)}</title>
        </path>`;
    })
    .join("");

  const nodeMarkup = state.graph.nodes
    .map((node) => {
      const pos = positions.get(node.id);
      const isMatch = matchingIds.has(node.id);
      const isSelected = node.id === state.selectedId;
      const radius = 13 + node.importance * 3;
      const labelY = pos.y + radius + 17;
      return `
        <g class="kg-node ${isMatch ? "" : "is-muted"} ${isSelected ? "is-selected" : ""}"
          tabindex="0"
          role="button"
          data-node-id="${escapeHtml(node.id)}"
          transform="translate(${pos.x}, ${pos.y})">
          <circle r="${radius}" fill="${colorForChapter(node.chapter)}"></circle>
          <text class="kg-node-label" y="${labelY - pos.y}" text-anchor="middle">${escapeHtml(node.label)}</text>
          <text class="kg-node-chapter" y="${labelY - pos.y + 14}" text-anchor="middle">第 ${node.chapter} 讲</text>
          ${node.needs_teacher_review ? `<circle class="review-ring" r="${radius + 5}"></circle>` : ""}
          <title>${escapeHtml(node.label)} · ${escapeHtml(node.name_en)}</title>
        </g>`;
    })
    .join("");

  const chapterLegend = [...new Set(state.graph.nodes.map((node) => node.chapter))]
    .sort((a, b) => a - b)
    .map((chapter, index) => {
      const x = 18 + (index % 8) * 86;
      const y = height - 46 + Math.floor(index / 8) * 22;
      return `
        <g class="kg-legend" transform="translate(${x}, ${y})">
          <rect width="12" height="12" rx="2" fill="${colorForChapter(chapter)}"></rect>
          <text x="18" y="11">第 ${chapter} 讲</text>
        </g>`;
    })
    .join("");

  networkEl.innerHTML = `
    <svg class="kg-svg" viewBox="0 0 ${width} ${height}" aria-label="广义相对论课程知识图谱">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z"></path>
        </marker>
      </defs>
      <rect class="kg-background" width="${width}" height="${height}" fill="#f8fafc"></rect>
      ${edgeMarkup}
      ${nodeMarkup}
      ${chapterLegend}
    </svg>`;

  networkEl.querySelectorAll(".kg-node").forEach((group) => {
    group.addEventListener("click", () => renderDetails(group.dataset.nodeId));
    group.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        renderDetails(group.dataset.nodeId);
      }
    });
  });
}

function applySearch(query) {
  state.query = query.trim();
  const matches = state.graph.nodes.filter(matchesQuery);

  if (matches.length === 1) {
    renderDetails(matches[0].id);
  } else {
    renderGraph();
  }

  if (!state.query) {
    statusEl.textContent = `已加载 ${state.graph.nodes.length} 个知识点和 ${state.graph.edges.length} 条关系。`;
  } else if (matches.length) {
    statusEl.textContent = `找到 ${matches.length} 个匹配知识点。`;
  } else {
    statusEl.textContent = "没有找到匹配知识点。";
  }
}

async function loadGraph() {
  if (window.GR_COURSE_GRAPH) {
    return window.GR_COURSE_GRAPH;
  }

  const response = await fetch("graph.json", { cache: "no-store" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

async function init() {
  try {
    state.graph = await loadGraph();

    searchInput.addEventListener("input", (event) => applySearch(event.target.value));
    askButton.addEventListener("click", handleQuestionSubmit);
    qaInput.addEventListener("keydown", (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
        handleQuestionSubmit();
      }
    });
    qaExampleButtons.forEach((button) => {
      button.addEventListener("click", () => {
        qaInput.value = button.dataset.question;
        handleQuestionSubmit();
      });
    });
    window.addEventListener("resize", renderGraph);
    renderDetails(state.graph.nodes[0].id);
    statusEl.textContent = `已加载 ${state.graph.nodes.length} 个知识点和 ${state.graph.edges.length} 条关系。`;
  } catch (error) {
    const fileHint = window.location.protocol === "file:" ? " 请确认 graph-data.js 和 index.html 在同一目录。" : "";
    statusEl.textContent = `读取图谱数据失败：${error.message}${fileHint}`;
  }
}

init();
