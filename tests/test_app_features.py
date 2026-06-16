import json
import re
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


class AppFeatureTests(unittest.TestCase):
    def test_page_contains_course_qa_controls(self):
        html = (ROOT / "app" / "index.html").read_text(encoding="utf-8")

        self.assertIn('id="qaInput"', html)
        self.assertIn('id="askButton"', html)
        self.assertIn('id="qaAnswer"', html)
        self.assertIn("课程问答", html)

    def test_page_can_load_without_fetching_graph_json(self):
        root_html = (ROOT / "index.html").read_text(encoding="utf-8")
        app_html = (ROOT / "app" / "index.html").read_text(encoding="utf-8")
        app_js = (ROOT / "app" / "app.js").read_text(encoding="utf-8")

        self.assertIn("app/index.html", root_html)
        self.assertIn("graph-data.js", app_html)
        self.assertLess(app_html.index("graph-data.js"), app_html.index("app.js"))
        self.assertIn("window.GR_COURSE_GRAPH", app_js)

    def test_app_renders_importance_as_stars_not_numbers(self):
        app_js = (ROOT / "app" / "app.js").read_text(encoding="utf-8")

        self.assertIn("renderImportanceStars", app_js)
        self.assertIn("importance-stars", app_js)
        self.assertNotIn("${node.importance} / 5", app_js)

    def test_app_contains_graph_based_answer_engine(self):
        app_js = (ROOT / "app" / "app.js").read_text(encoding="utf-8")
        graph = json.loads((ROOT / "app" / "graph.json").read_text(encoding="utf-8"))

        self.assertIn("answerQuestion", app_js)
        self.assertIn("scoreConceptForQuestion", app_js)
        self.assertRegex(app_js, re.compile(r"learning_objective|common_misconception"))
        self.assertGreaterEqual(len(graph["nodes"]), 25)


if __name__ == "__main__":
    unittest.main()
