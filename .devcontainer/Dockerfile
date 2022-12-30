FROM us-docker.pkg.dev/elide-fw/tools/codespace@sha256:d3a4bc920610cd5888f32bdb3211617a5472bc16e36e900142d4b1d9419433a2

## install binaryen
ADD install-binaryen.sh /tmp/install-binaryen.sh
RUN bash /tmp/install-binaryen.sh && sudo rm -f /tmp/install-binaryen.sh

## set environment
ENV JAVA_HOME=/usr/lib/gvm \
    GOROOT=/usr/local/go \
    GOPATH=$HOME/go \
    PATH="/usr/local/go/bin:$GOPATH/bin:/usr/lib/gvm/bin:${PATH}"

ENTRYPOINT ["/usr/local/share/docker-init.sh"]
CMD ["sleep", "infinity"]
