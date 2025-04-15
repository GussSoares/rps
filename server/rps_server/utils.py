import toml
from pathlib import Path
from django.conf import settings

def get_version():
    pyproject = toml.load(Path(settings.BASE_DIR / 'pyproject.toml'))
    major, minor, patch = pyproject['project']['version'].split('.')
    return major, minor, patch
