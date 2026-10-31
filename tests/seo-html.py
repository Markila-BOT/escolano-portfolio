import argparse
from html.parser import HTMLParser
import json
from pathlib import Path
import struct
from urllib.request import urlopen
from urllib.parse import urljoin, urlparse
import xml.etree.ElementTree as ET


CANONICAL = "https://escolano-portfolio.vercel.app/"
VOID_TAGS = {"area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"}
HEADINGS = {f"h{level}" for level in range(1, 7)}


class Document(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.elements = []
        self.stack = []
        self.feed(source)

    def handle_starttag(self, tag, attributes):
        element = {"tag": tag, "attrs": dict(attributes), "ancestors": list(self.stack), "text": ""}
        self.elements.append(element)
        if tag not in VOID_TAGS:
            self.stack.append(element)

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, -1, -1):
            if self.stack[index]["tag"] == tag:
                del self.stack[index:]
                break

    def handle_data(self, data):
        for element in self.stack:
            element["text"] += data

    def tags(self, tag):
        return [element for element in self.elements if element["tag"] == tag]


def require(condition, message):
    if not condition:
        raise AssertionError(message)


def one(elements, message):
    require(len(elements) == 1, message)
    return elements[0]


def normalized_url(value):
    parsed = urlparse(value or "")
    return parsed._replace(path=parsed.path or "/").geturl()


def verify_metadata(document, is_tools=False):
    page_title = "Browser Tools | Mark Escolano" if is_tools else "Mark Escolano Portfolio"
    description = "Format JSON, count words and characters, and encode URL components with small tools that process your text locally in your browser." if is_tools else "Senior software engineer with more than a decade of experience."
    canonical_url = urljoin(CANONICAL, "tools") if is_tools else CANONICAL
    title = one(document.tags("title"), "Expected one title")
    require(title["text"].strip() == page_title, "Unexpected page title")
    canonical = one([element for element in document.tags("link") if element["attrs"].get("rel") == "canonical"], "Expected one canonical")
    require(normalized_url(canonical["attrs"].get("href")) == canonical_url, "Canonical origin mismatch")
    expected = {
        "description": description,
        "og:title": title["text"],
        "og:description": description,
        "og:type": "website",
        "og:url": canonical_url,
        "og:site_name": "Mark Escolano Portfolio",
        "og:image": urljoin(CANONICAL, "og"),
        "og:image:width": "1200",
        "og:image:height": "630",
        "og:image:alt": "Mark Escolano, Senior Software Engineer",
        "twitter:card": "summary_large_image",
        "twitter:title": title["text"],
        "twitter:description": description,
        "twitter:image": urljoin(CANONICAL, "og"),
        "twitter:image:alt": "Mark Escolano, Senior Software Engineer",
    }
    for key, value in expected.items():
        element = one([element for element in document.tags("meta") if element["attrs"].get("name", element["attrs"].get("property")) == key], f"Expected one {key}")
        content = element["attrs"].get("content")
        require((normalized_url(content) if key == "og:url" else content) == value, f"Incorrect {key}")
    for element in [title, canonical] + document.tags("meta"):
        require(any(parent["tag"] == "head" for parent in element["ancestors"]), "Metadata must be in head")


def verify_structure(document):
    require(one(document.tags("html"), "Expected one html")["attrs"].get("lang") == "en", "Expected English language")
    main = one(document.tags("main"), "Expected one main")
    heading = one(document.tags("h1"), "Expected one h1")
    require("Mark Escolano" in heading["text"] and main in heading["ancestors"], "Missing introductory identity")
    for tag in ("header", "footer"):
        one(document.tags(tag), f"Expected one {tag}")
    require(document.tags("nav"), "Missing navigation")
    for element in document.elements:
        if element["tag"] in HEADINGS:
            require(not any(parent["tag"] in HEADINGS for parent in element["ancestors"]), "Nested heading")
            require(element["text"].strip(), "Empty heading")
    section_headings = [("about", "About me"), ("projects", "My projects"), ("skills", "My skills"), ("experience", "My experience"), ("questions", "Questions"), ("contact", "Contact me")]
    positions = []
    for section_id, title in section_headings:
        section = one([element for element in document.tags("section") if element["attrs"].get("id") == section_id], f"Missing section {section_id}")
        heading = one([element for element in document.tags("h2") if section in element["ancestors"] and element["text"].strip() == title], f"Missing heading in {section_id}")
        positions.append(document.elements.index(heading))
    require(positions == sorted(positions), "Section headings are out of document order")


def verify_graph(document):
    script = one([element for element in document.tags("script") if element["attrs"].get("type") == "application/ld+json"], "Expected one JSON-LD script")
    graph = json.loads(script["text"])
    require(graph.get("@context") == "https://schema.org", "Wrong schema context")
    nodes = graph.get("@graph", [])
    require(len(nodes) == 2, "Expected minimal identity graph")
    person = one([node for node in nodes if node.get("@type") == "Person"], "Missing Person")
    website = one([node for node in nodes if node.get("@type") == "WebSite"], "Missing WebSite")
    require(person.get("name") == "Mark Escolano" and person.get("jobTitle") == "Senior Software Engineer", "Wrong person identity")
    for node, fragment in ((person, "person"), (website, "website")):
        require(node.get("url") == CANONICAL and node.get("@id") == CANONICAL + "#" + fragment, "Wrong graph URL")
    require(website.get("author") == {"@id": person["@id"]}, "Invalid author reference")
    require(website.get("name") == "Mark Escolano Portfolio", "Wrong website identity")
    profiles = {element["attrs"].get("href") for element in document.tags("a") if urlparse(element["attrs"].get("href", "")).hostname in {"github.com", "www.linkedin.com"}}
    require(set(person.get("sameAs", [])) == profiles and len(profiles) == 2, "Profile links mismatch")


def verify_sitemap(source):
    root = ET.fromstring(source)
    namespace = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
    require(root.tag == namespace + "urlset", "Invalid sitemap root")
    require([element.text for element in root.findall(f"{namespace}url/{namespace}loc")] == [CANONICAL, urljoin(CANONICAL, "tools"), urljoin(CANONICAL, "writing")], "Sitemap must contain the homepage, Tools, and writing index")
    require(not root.findall(f".//{namespace}lastmod"), "Unexpected modification date")


def verify_robots(source):
    directives = [line.split("#", 1)[0].strip().partition(":") for line in source.splitlines()]
    pairs = [(key.lower(), value.strip()) for key, separator, value in directives if separator]
    require(pairs == [("user-agent", "*"), ("allow", "/"), ("sitemap", urljoin(CANONICAL, "sitemap.xml"))], "Unexpected or blocking robots policy")


def verify_png(data):
    require(data[:8] == b"\x89PNG\r\n\x1a\n" and data[12:16] == b"IHDR", "Expected PNG image")
    require(struct.unpack(">II", data[16:24]) == (1200, 630), "Incorrect image dimensions")


def fetch(url, content_types):
    with urlopen(url, timeout=30) as response:
        require(response.status == 200, f"Unexpected status for {url}")
        require(response.headers.get_content_type() in content_types, f"Unexpected content type for {url}")
        return response.read()


def main():
    parser = argparse.ArgumentParser(description="Verify initial portfolio SEO HTML and live discovery endpoints.")
    parser.add_argument("source", help="Saved HTML path or serving base URL")
    args = parser.parse_args()
    is_url = args.source.startswith(("http://", "https://"))
    source = fetch(args.source, {"text/html"}).decode() if is_url else Path(args.source).read_text()
    document = Document(source)
    verify_metadata(document)
    verify_structure(document)
    verify_graph(document)
    if is_url:
        tools_document = Document(fetch(urljoin(args.source, "/tools"), {"text/html"}).decode())
        verify_metadata(tools_document, is_tools=True)
        verify_sitemap(fetch(urljoin(args.source, "/sitemap.xml"), {"application/xml", "text/xml"}))
        verify_robots(fetch(urljoin(args.source, "/robots.txt"), {"text/plain"}).decode())
        verify_png(fetch(urljoin(args.source, "/og"), {"image/png"}))
    print("PASS: metadata, semantic structure, identity graph" + (", sitemap, robots and share image" if is_url else " (saved HTML only; endpoints not checked)"))


if __name__ == "__main__":
    main()
