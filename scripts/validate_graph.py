#!/usr/bin/env python3
from pathlib import Path
import sys

try:
    import yaml
except ImportError:
    yaml = None


ROOT = Path(__file__).resolve().parents[1]
CONCEPTS_PATH = ROOT / "data" / "concepts.yaml"
EDGES_PATH = ROOT / "data" / "edges.yaml"
ALLOWED_RELATIONS = {
    "prerequisite_of",
    "part_of",
    "derived_from",
    "applied_to",
    "confused_with",
    "supports",
}
REQUIRED_FIELDS = {
    "id",
    "name_zh",
    "name_en",
    "chapter",
    "importance",
    "prerequisites",
    "learning_objective",
    "common_misconception",
    "ai_learning_task",
    "related_materials",
    "needs_teacher_review",
}


def load_yaml(path):
    if not path.exists():
        raise FileNotFoundError(f"文件不存在: {path.relative_to(ROOT)}")
    if yaml is None:
        return load_simple_yaml_list(path)
    with path.open(encoding="utf-8") as handle:
        data = yaml.safe_load(handle)
    return data or []


def parse_scalar(value):
    value = value.strip()
    if value == "true":
        return True
    if value == "false":
        return False
    if value == "[]":
        return []
    if value.isdigit():
        return int(value)
    return value


def load_simple_yaml_list(path):
    items = []
    current = None
    pending_list_key = None

    for raw_line in path.read_text(encoding="utf-8").splitlines():
        if not raw_line.strip() or raw_line.lstrip().startswith("#"):
            continue
        indent = len(raw_line) - len(raw_line.lstrip(" "))
        line = raw_line.strip()

        if indent == 0 and line.startswith("- "):
            if current is not None:
                items.append(current)
            current = {}
            pending_list_key = None
            key, value = line[2:].split(":", 1)
            current[key.strip()] = parse_scalar(value)
            continue

        if current is None:
            continue

        if indent == 2 and ":" in line:
            key, value = line.split(":", 1)
            key = key.strip()
            value = value.strip()
            if value:
                current[key] = parse_scalar(value)
                pending_list_key = None
            else:
                current[key] = []
                pending_list_key = key
            continue

        if indent == 4 and line.startswith("- ") and pending_list_key:
            current[pending_list_key].append(parse_scalar(line[2:]))

    if current is not None:
        items.append(current)
    return items


def validate():
    errors = []
    concepts = load_yaml(CONCEPTS_PATH)
    edges = load_yaml(EDGES_PATH)

    if not isinstance(concepts, list):
        errors.append("data/concepts.yaml: 顶层结构必须是列表。")
        concepts = []
    if not isinstance(edges, list):
        errors.append("data/edges.yaml: 顶层结构必须是列表。")
        edges = []

    if not 25 <= len(concepts) <= 35:
        errors.append(f"知识点数量应在 25-35 之间，当前为 {len(concepts)}。")

    ids = []
    for index, concept in enumerate(concepts, start=1):
        if not isinstance(concept, dict):
            errors.append(f"concept #{index}: 必须是映射对象。")
            continue
        missing = REQUIRED_FIELDS - set(concept)
        if missing:
            errors.append(f"concept #{index}: 缺少字段 {sorted(missing)}。")
        cid = concept.get("id")
        if not cid:
            errors.append(f"concept #{index}: id 不能为空。")
        else:
            ids.append(cid)
        if not concept.get("learning_objective"):
            errors.append(f"concept {cid}: learning_objective 不能为空。")
        if not concept.get("common_misconception"):
            errors.append(f"concept {cid}: common_misconception 不能为空。")
        if not concept.get("ai_learning_task"):
            errors.append(f"concept {cid}: ai_learning_task 不能为空。")
        if not concept.get("related_materials"):
            errors.append(f"concept {cid}: related_materials 不能为空。")
        prerequisites = concept.get("prerequisites", [])
        if not isinstance(prerequisites, list):
            errors.append(f"concept {cid}: prerequisites 必须是列表。")

    duplicate_ids = sorted({cid for cid in ids if ids.count(cid) > 1})
    if duplicate_ids:
        errors.append(f"concept id 重复: {duplicate_ids}。")

    id_set = set(ids)
    for concept in concepts:
        if not isinstance(concept, dict):
            continue
        cid = concept.get("id")
        for prereq in concept.get("prerequisites", []) or []:
            if prereq not in id_set:
                errors.append(f"concept {cid}: prerequisite 不存在: {prereq}。")

    for index, edge in enumerate(edges, start=1):
        if not isinstance(edge, dict):
            errors.append(f"edge #{index}: 必须是映射对象。")
            continue
        source = edge.get("source")
        target = edge.get("target")
        relation = edge.get("relation")
        if source not in id_set:
            errors.append(f"edge #{index}: source 不存在: {source}。")
        if target not in id_set:
            errors.append(f"edge #{index}: target 不存在: {target}。")
        if relation not in ALLOWED_RELATIONS:
            errors.append(f"edge #{index}: relation 不允许: {relation}。")
        if not edge.get("description"):
            errors.append(f"edge #{index}: description 不能为空。")

    review_ids = [
        concept["id"]
        for concept in concepts
        if isinstance(concept, dict) and concept.get("needs_teacher_review")
    ]

    return concepts, edges, review_ids, errors


def main():
    try:
        concepts, edges, review_ids, errors = validate()
    except Exception as exc:
        print(f"验证失败: {exc}")
        return 1

    print("广义相对论知识图谱验证报告")
    print(f"知识点数量: {len(concepts)}")
    print(f"边数量: {len(edges)}")
    print(f"需要教师检查: {', '.join(review_ids) if review_ids else '无'}")

    if errors:
        print("验证失败:")
        for error in errors:
            print(f"- {error}")
        return 1

    print("验证通过: 数据结构和引用关系均符合要求。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
