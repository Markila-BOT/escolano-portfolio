"""Check real production HTML: python3 tests/portfolio-html.py <URL-or-file>."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.request import urlopen
import re
import sys


class Document(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ignored = 0
        self.body = False
        self.text = []
        self.elements = []
        self.preloads = []
        self.section = None
        self.section_text = {}
        self.section_elements = {}

    def handle_starttag(self, tag, attrs):
        if tag == 'link' and dict(attrs).get('rel') == 'preload':
            self.preloads.append(dict(attrs))
        if tag in ('script', 'style'):
            self.ignored += 1
        if tag == 'body':
            self.body = True
        if tag == 'section':
            self.section = dict(attrs).get('id')
            self.section_text[self.section] = []
            self.section_elements[self.section] = []
        if self.body and not self.ignored:
            self.elements.append((tag, dict(attrs)))
            if self.section:
                self.section_elements[self.section].append((tag, dict(attrs)))

    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self.ignored -= 1
        if tag == 'body':
            self.body = False
        if tag == 'section':
            self.section = None

    def handle_data(self, text):
        if self.body and not self.ignored:
            self.text.append(text)
            if self.section:
                self.section_text[self.section].append(text)


def check(html):
    document = Document()
    document.feed(html)
    text = ' '.join(' '.join(document.text).split())
    for section in ['home', 'about', 'projects', 'skills', 'experience', 'contact']:
        assert sum(tag == 'section' and attrs.get('id') == section for tag, attrs in document.elements) == 1, f'Missing/duplicate section: {section}'
    for content in ["I'm Mark Escolano", 'About me', 'automotive company', 'ECUs', 'My projects', 'My skills', 'My experience', 'Senior Software Engineer', 'Full Stack Engineer', 'Lead Software Engineer', 'Contact me', 'mark.escolano14@gmail.com', 'All rights reserved.', 'HTML', 'CSS', 'JavaScript', 'TypeScript', 'Rust', 'React', 'Next.js', 'Node.js', 'Git', 'Tailwind', 'Redux', 'GraphQL', 'Nest.js', 'Express', 'Framer Motion', 'Claude Code', 'Codex', 'Cursor', 'MongoDB', 'MySQL', 'PostgreSQL', 'Firebase']:
        assert content in text, f'Missing body text: {content}'
    assert any(tag == 'img' and attrs.get('alt') == 'Mark Escolano portrait' for tag, attrs in document.elements), 'Missing portrait'
    portrait = next(attrs for tag, attrs in document.elements if tag == 'img' and attrs.get('alt') == 'Mark Escolano portrait')
    assert portrait.get('width') == '160' and portrait.get('height') == '160', 'Incorrect portrait dimensions'
    assert portrait.get('sizes') == '160px' and '384w' in portrait.get('srcset', ''), 'Missing responsive portrait hints'
    assert portrait.get('fetchpriority') == 'high' and portrait.get('loading') != 'lazy', 'Portrait priority changed'
    assert any(attrs.get('as') == 'image' and attrs.get('imagesizes') == '160px' and attrs.get('imagesrcset') == portrait.get('srcset') for attrs in document.preloads), 'Missing matching portrait preload'
    for field in ['senderEmail', 'message']:
        assert any(attrs.get('name') == field for _, attrs in document.elements), f'Missing field: {field}'
    assert 'My toolkit' not in text, 'Redundant toolkit section must stay removed'
    assert any(tag == 'a' and attrs.get('href') == '#contact' for tag, attrs in document.elements), 'Missing contact anchor'
    assert any(tag == 'a' and attrs.get('href', '').startswith('mailto:') for tag, attrs in document.elements), 'Missing email link'
    hiring = 'Open to full-time roles and contract/freelance work, remote or based in the Philippines.'
    for section in ['home', 'contact']:
        assert hiring in ' '.join(' '.join(document.section_text[section]).split()), f'Missing hiring preferences: {section}'
    assert sum(tag == 'a' and attrs.get('href') == '#contact' for tag, attrs in document.section_elements['home']) == 1, 'Intro must keep one Contact CTA'
    assert any(tag == 'a' and attrs.get('href') == 'mailto:mark.escolano14@gmail.com' for tag, attrs in document.section_elements['contact']), 'Wrong public hiring email'
    assert re.search(r'20\d\d', text), 'Missing dates'
    print('PASS: real document content, section IDs, portrait, skill names, timeline, contact fields and native links/disclosures')


if __name__ == '__main__':
    source = sys.argv[1]
    html = urlopen(source).read().decode() if source.startswith(('http://', 'https://')) else Path(source).read_text()
    check(html)
