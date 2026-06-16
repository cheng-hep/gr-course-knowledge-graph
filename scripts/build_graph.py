#!/usr/bin/env python3
from pathlib import Path
import json
import sys

try:
    import yaml
except ImportError:
    yaml = None


ROOT = Path(__file__).resolve().parents[1]
CONCEPTS_PATH = ROOT / "data" / "concepts.yaml"
EDGES_PATH = ROOT / "data" / "edges.yaml"
OUTPUT_PATH = ROOT / "app" / "graph.json"
DATA_JS_PATH = ROOT / "app" / "graph-data.js"


def load_yaml(path):
    if yaml is None:
        return load_simple_yaml_list(path)
    with path.open(encoding="utf-8") as handle:
        return yaml.safe_load(handle) or []


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


def build_graph():
    concepts = load_yaml(CONCEPTS_PATH)
    edges = load_yaml(EDGES_PATH)

    nodes = []
    for concept in concepts:
        nodes.append(
            {
                "id": concept["id"],
                "label": concept["name_zh"],
                "name_en": concept["name_en"],
                "chapter": concept["chapter"],
                "importance": concept["importance"],
                "learning_objective": concept["learning_objective"],
                "common_misconception": concept["common_misconception"],
                "ai_learning_task": concept["ai_learning_task"],
                "prerequisites": concept.get("prerequisites", []),
                "related_materials": concept.get("related_materials", []),
                "needs_teacher_review": concept.get("needs_teacher_review", False),
            }
        )

    graph = {
        "nodes": nodes,
        "edges": edges,
    }
    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(
        json.dumps(graph, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    DATA_JS_PATH.write_text(
        "window.GR_COURSE_GRAPH = "
        + json.dumps(graph, ensure_ascii=False, indent=2)
        + ";\n",
        encoding="utf-8",
    )
    return graph


def main():
    graph = build_graph()
    print(f"已生成 {OUTPUT_PATH.relative_to(ROOT)}")
    print(f"已生成 {DATA_JS_PATH.relative_to(ROOT)}")
    print(f"节点数量: {len(graph['nodes'])}")
    print(f"边数量: {len(graph['edges'])}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
