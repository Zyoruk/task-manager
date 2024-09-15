# Stage 1: Build the Kong plugin
FROM kong:latest

# Ensure any patching steps are executed as root user
USER root

# Add custom plugin to the image
COPY ./provision/kong/plugins/tm-auth /usr/local/share/lua/5.1/kong/plugins/tm-auth

USER kong

COPY ./provision/kong/kong.yaml /opt/kong/declarative/kong.yaml
COPY ./provision/kong/entrypoint.sh /entrypoint.sh
ENV KONG_PLUGINS=bundled,tm-auth
ENV KONG_DATABASE=off
ENV KONG_DECLARATIVE_CONFIG=/opt/kong/declarative/kong.yaml
ENV KONG_ADMIN_LISTEN="0.0.0.0:8001, 0.0.0.0:8443 ssl"
ENTRYPOINT ["/entrypoint.sh"]
EXPOSE 8000 8443 8001 8444 8002 8445 8003 8446 8004 8447
STOPSIGNAL SIGQUIT
HEALTHCHECK --interval=10s --timeout=10s --retries=10 CMD kong health
VOLUME ["/opt/kong/declarative"]

CMD ["kong", "docker-start"]
