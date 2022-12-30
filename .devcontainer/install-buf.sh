#!/bin/bash

curl -fSO https://github.com/bufbuild/buf/releases/download/v1.11.0/buf-Linux-x86_64 \
  && sudo mv buf-Linux-x86_64 /usr/local/bin/buf \
  && sudo chmod +x /usr/local/bin/buf;
