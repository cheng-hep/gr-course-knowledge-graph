import json
import subprocess
import sys
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class GraphScriptTests(unittest.TestCase):
    def test_validate_graph_accepts_project_data(self):
        result = subprocess.run(
            [sys.executable, str(ROOT / "scripts" / "validate_graph.py")],
            cwd=ROOT,
            text=True,
            capture_output=True,
            check=False,
        )

        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertIn("验证通过", result.stdout)

    def test_build_graph_creates_graph_json(self):
        result = subprocess.run(
            [sys.executable, str(ROOT / "scripts" / "build_graph.py")],
            cwd=ROOT,
            text=True,
            capture_output=True,
            check=False,
        )

        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        graph_path = ROOT / "app" / "graph.json"
        graph = json.loads(graph_path.read_text(encoding="utf-8"))
        self.assertGreaterEqual(len(graph["nodes"]), 25)
        self.assertGreaterEqual(len(graph["edges"]), 40)
        self.assertLessEqual({"id", "label", "learning_objective"}, set(graph["nodes"][0]))


if __name__ == "__main__":
    unittest.main()
