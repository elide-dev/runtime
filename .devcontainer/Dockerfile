FROM us-docker.pkg.dev/elide-fw/tools/codespace@sha256:3271a9cbb8026aefd75436492ccba95491d8b6b4f8a62ed243b3b8f36172cf9d

## install binaryen
ADD install-binaryen.sh /tmp/install-binaryen.sh
RUN bash /tmp/install-binaryen.sh && sudo rm -f /tmp/install-binaryen.sh

## install gopls
RUN go install -v golang.org/x/tools/gopls@latest

## set environment
ENV JAVA_HOME=/usr/lib/gvm \
    GOROOT=/usr/local/go \
    GOPATH=$HOME/go \
    PATH="/usr/local/go/bin:$GOPATH/bin:/usr/lib/gvm/bin:${PATH}"

ENTRYPOINT ["/usr/local/share/docker-init.sh"]
CMD ["sleep", "infinity"]
