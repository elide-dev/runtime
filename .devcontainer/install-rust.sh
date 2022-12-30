#!/bin/bash

curl https://sh.rustup.rs -sSf | bash -s -- -y \
  && echo 'source $HOME/.cargo/env' >> $HOME/.zshrc \
  && echo 'source $HOME/.cargo/env' >> $HOME/.bashrc \
  && source "$HOME/.cargo/env" \
  && rustup toolchain install nightly \
  && rustup default nightly \
  && rustup target add wasm32-unknown-unknown \
  && rustup target add wasm32-wasi;
