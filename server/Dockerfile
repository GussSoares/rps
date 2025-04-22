FROM python:3.13-alpine

ARG YOUR_ENV

ENV YOUR_ENV=${YOUR_ENV} \
  PYTHONFAULTHANDLER=1 \
  PYTHONUNBUFFERED=1 \
  PYTHONHASHSEED=random \
  PIP_NO_CACHE_DIR=off \
  PIP_DISABLE_PIP_VERSION_CHECK=on \
  PIP_DEFAULT_TIMEOUT=100 \
  # Poetry's configuration:
  POETRY_NO_INTERACTION=1 \
  POETRY_VIRTUALENVS_CREATE=false \
  POETRY_CACHE_DIR='/var/cache/pypoetry' \
  POETRY_HOME='/usr/local' \
  HOME_PATH=/usr/src/app/ \
  USERNAME=rps
  # ^^^
  # Make sure to update it!

RUN pip install poetry
# RUN curl -sSL https://install.python-poetry.org | python3 - && \
#     ln -s /root/.local/bin/poetry /usr/local/bin/poetry
RUN poetry config virtualenvs.create false

WORKDIR /usr/src/app

COPY pyproject.toml poetry.lock README.md /usr/src/app/

# RUN poetry config virtualenvs.in-project true --local
RUN poetry install --no-interaction --no-ansi --with dev --no-root

# COPY . /usr/src/app/

RUN addgroup --gid 1000 ${USERNAME} && \
    adduser -u 1000 --system --home "${HOME_PATH}" --shell /sbin/nologin --ingroup rps "${USERNAME}" && \
    chmod 755 ${HOME_PATH} && chown -R ${USERNAME}:${USERNAME} ${HOME_PATH}

USER ${USERNAME}

# CMD gunicorn --bind :8000 --access-logfile "-" --access-logformat "%(h)s %(t)s \"%(r)s\" %(s)s %(b)s" --workers 5 --keep-alive 90 --timeout 0 rps_server.wsgi:application