# 广义相对论课程知识图谱

这是一个基于 `materials/gr_lecture.pdf` 生成的最小可行课程知识图谱项目。项目只使用 YAML 数据、Python 脚本和静态网页，便于课堂展示、课程建设和学生复习。

## 文件结构

```text
materials/gr_lecture.pdf        # 输入讲义
draft/concept_candidates.md     # 候选知识点清单
data/concepts.yaml              # 知识点数据
data/edges.yaml                 # 知识点关系数据
scripts/validate_graph.py       # 数据验证脚本
scripts/build_graph.py          # graph.json 构建脚本
app/index.html                  # 静态网页入口
app/app.js                      # 图谱交互逻辑
app/style.css                   # 页面样式
app/graph.json                  # 网页读取的数据
tests/test_graph_scripts.py     # 脚本行为测试
```

## 安装依赖

需要 Python 3 和 PyYAML：

```bash
pip install pyyaml
```

网页使用 `vis-network` CDN，不需要本地前端构建工具。

## 验证数据

```bash
python scripts/validate_graph.py
```

验证内容包括知识点数量、id 唯一性、前置知识引用、边引用、关系类型和必要字段。

## 生成 graph.json

```bash
python scripts/build_graph.py
```

该命令会读取 `data/concepts.yaml` 与 `data/edges.yaml`，并生成 `app/graph.json`。

## 打开网页

在项目根目录运行：

```bash
python -m http.server 8000 --bind 127.0.0.1
```

然后打开：

```text
http://127.0.0.1:8000/app/
```

如果 8000 端口已经被占用，可以换一个端口，例如：

```bash
python -m http.server 8002 --bind 127.0.0.1
```

然后打开：

```text
http://127.0.0.1:8002/app/
```

## 修改知识点

优先修改 `data/concepts.yaml`。每个知识点都应保留以下字段：

```text
id, name_zh, name_en, chapter, importance, prerequisites,
learning_objective, common_misconception, ai_learning_task,
related_materials, needs_teacher_review
```

如果新增前置知识，请确保 `prerequisites` 中的每个 id 已经存在于 `concepts.yaml`。

## 修改关系

修改 `data/edges.yaml` 时，`source` 和 `target` 必须是已有知识点 id。`relation` 只能使用：

```text
prerequisite_of, part_of, derived_from, applied_to, confused_with, supports
```

## 扩展 AI 学习任务

AI 学习任务应要求学生检查、评价或修正 AI 的回答。建议保持一个任务只针对一个学习目标，例如检查符号约定、识别误区、比较两种推导或修正错误解释。

更新数据后请重新运行：

```bash
python scripts/validate_graph.py
python scripts/build_graph.py
```
