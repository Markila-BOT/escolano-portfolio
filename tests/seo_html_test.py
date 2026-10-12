import importlib.util
import json
from pathlib import Path
import struct
import subprocess
import unittest


spec = importlib.util.spec_from_file_location("seo_html", Path(__file__).with_name("seo-html.py"))
seo = importlib.util.module_from_spec(spec)
spec.loader.exec_module(seo)
CANONICAL = seo.CANONICAL
PROFILES = ["https://github.com/Markila-BOT", "https://www.linkedin.com/in/mark-escolano-2715ab129/"]
GRAPH = {"@context": "https://schema.org", "@graph": [
    {"@type": "Person", "@id": CANONICAL + "#person", "url": CANONICAL, "name": "Mark Escolano", "jobTitle": "Senior Software Engineer", "sameAs": PROFILES},
    {"@type": "WebSite", "@id": CANONICAL + "#website", "url": CANONICAL, "name": "Mark Escolano Portfolio", "author": {"@id": CANONICAL + "#person"}},
]}
DESCRIPTION = "Senior software engineer with more than a decade of experience."
METADATA = {"description": DESCRIPTION, "og:title": "Mark Escolano Portfolio", "og:description": DESCRIPTION, "og:type": "website", "og:url": CANONICAL, "og:site_name": "Mark Escolano Portfolio", "og:image": CANONICAL + "og", "og:image:width": "1200", "og:image:height": "630", "og:image:alt": "Mark Escolano — Senior Software Engineer", "twitter:card": "summary_large_image", "twitter:title": "Mark Escolano Portfolio", "twitter:description": DESCRIPTION, "twitter:image": CANONICAL + "og", "twitter:image:alt": "Mark Escolano — Senior Software Engineer"}
HEAD = '<title>Mark Escolano Portfolio</title>' + f'<link rel="canonical" href="{CANONICAL}">' + "".join(f'<meta name="{key}" content="{value}">' for key, value in METADATA.items())
BODY = '<header><nav>Navigation</nav></header><main><h1>Mark Escolano</h1>' + "".join(f'<section id="{section_id}"><h2>{title}</h2></section>' for section_id, title in {"about": "About me", "projects": "My projects", "skills": "My skills", "experience": "My experience", "contact": "Contact me"}.items()) + "".join(f'<a href="{profile}">Profile</a>' for profile in PROFILES) + '</main><footer>Footer</footer>'
HTML = '<html lang="en"><head>' + HEAD + '</head><body>' + BODY + '<script type="application/ld+json">' + json.dumps(GRAPH) + '</script></body></html>'
SITEMAP = f'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>{CANONICAL}</loc></url></urlset>'
ROBOTS = f'User-Agent: *\nAllow: /\nSitemap: {CANONICAL}sitemap.xml\n'


class SeoTests(unittest.TestCase):
    def test_valid_document(self):
        document = seo.Document(HTML)
        seo.verify_metadata(document)
        seo.verify_structure(document)
        seo.verify_graph(document)

    def test_metadata_rejects_missing_duplicate_and_wrong_origin(self):
        for source in (HTML.replace('<title>Mark Escolano Portfolio</title>', ''), HTML.replace('</head>', HEAD + '</head>'), HTML.replace(CANONICAL, 'http://localhost:3128/'), HTML.replace('summary_large_image', 'summary')):
            with self.subTest(source=source[:60]), self.assertRaises(AssertionError):
                seo.verify_metadata(seo.Document(source))

    def test_semantics_rejects_bad_headings_and_landmarks(self):
        for source in (HTML.replace('</h1>', '<h2>Nested</h2></h1>'), HTML.replace('</main>', '<h1>Extra</h1></main>'), HTML.replace('<h2>My skills</h2>', ''), HTML.replace('lang="en"', 'lang="fr"'), HTML.replace('<nav>Navigation</nav>', '')):
            with self.subTest(source=source[:60]), self.assertRaises(AssertionError):
                seo.verify_structure(seo.Document(source))

    def test_graph_rejects_bad_reference_origin_and_profiles(self):
        for source in (HTML.replace('"author": {"@id": "' + CANONICAL + '#person"}', '"author": {"@id": "#missing"}'), HTML.replace(CANONICAL, 'https://preview.example/'), HTML.replace('"sameAs": ' + json.dumps(PROFILES), '"sameAs": []')):
            with self.subTest(source=source[:60]), self.assertRaises(AssertionError):
                seo.verify_graph(seo.Document(source))

    def test_actual_serializer_keeps_script_terminator_inert(self):
        sentinel = '</script><script>alert("unsafe")</script><h1>Injected</h1>'
        runner = '''const fs = require("node:fs");
const Module = require("node:module");
const ts = require("typescript");
const filename = require("node:path").resolve("lib/seo.ts");
const compiled = ts.transpileModule(fs.readFileSync(filename, "utf8"), {compilerOptions: {module: ts.ModuleKind.CommonJS}}).outputText;
const loaded = new Module(filename); loaded._compile(compiled, filename);
process.stdout.write(loaded.exports.serializeStructuredData({name: process.argv[1]}));'''
        serialized = subprocess.check_output(['node', '-e', runner, sentinel], cwd=Path(__file__).resolve().parents[1], text=True)
        self.assertNotIn('<', serialized)
        document = seo.Document('<script type="application/ld+json">' + serialized + '</script>')
        self.assertEqual(len(document.elements), 1)
        self.assertEqual(json.loads(document.tags('script')[0]['text'])['name'], sentinel)

    def test_sitemap(self):
        seo.verify_sitemap(SITEMAP)
        for source in (SITEMAP.replace(CANONICAL, CANONICAL + '#about'), SITEMAP.replace('</urlset>', f'<url><loc>{CANONICAL}og</loc></url></urlset>'), SITEMAP.replace(CANONICAL, 'https://preview.example/'), SITEMAP.replace('</url>', '<lastmod>2026-10-09</lastmod></url>')):
            with self.subTest(source=source), self.assertRaises(AssertionError):
                seo.verify_sitemap(source)

    def test_robots(self):
        seo.verify_robots(ROBOTS)
        for source in (ROBOTS + 'Disallow: /\n', ROBOTS.replace(CANONICAL, 'https://preview.example/'), ROBOTS.replace('Allow: /', 'Disallow: /_next/')):
            with self.subTest(source=source), self.assertRaises(AssertionError):
                seo.verify_robots(source)

    def test_image_dimensions(self):
        header = b'\x89PNG\r\n\x1a\n' + struct.pack('>I', 13) + b'IHDR'
        seo.verify_png(header + struct.pack('>II', 1200, 630))
        with self.assertRaises(AssertionError):
            seo.verify_png(header + struct.pack('>II', 160, 160))


if __name__ == '__main__':
    unittest.main()
