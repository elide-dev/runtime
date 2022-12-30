FROM us-docker.pkg.dev/elide-fw/tools/codespace@sha256:86b44aad8dd524fb07259c696e0334f5bd96c413a404d0a97d6cd496a914239a
COPY --from=golang:1.19 /usr/local/go/ /usr/local/go/
ENV JAVA_HOME=/usr/lib/gvm \
    PATH="/usr/local/go/bin:/usr/lib/gvm/bin:${PATH}"
ENTRYPOINT ["/usr/local/share/docker-init.sh"]
CMD ["sleep", "infinity"]
