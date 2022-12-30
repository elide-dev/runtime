#!/bin/bash

sudo chown dev /usr/local \
  && sudo chown -R dev /home/dev \
  && curl -fLO https://go.dev/dl/go1.19.linux-amd64.tar.gz \
  && tar -C /usr/local -xzf go1.19.linux-amd64.tar.gz \
  && rm go1.19.linux-amd64.tar.gz;
