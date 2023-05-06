FROM us-docker.pkg.dev/elide-fw/tools/codespace@sha256:c747a6727ff61e64afada3380bcc6389cd7e38e101a5a94805f270fb49333f9f

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
