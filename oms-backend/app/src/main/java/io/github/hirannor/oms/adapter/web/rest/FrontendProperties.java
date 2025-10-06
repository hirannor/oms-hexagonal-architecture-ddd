package io.github.hirannor.oms.adapter.web.rest;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.bind.DefaultValue;

@ConfigurationProperties(prefix = "app.frontend")
public record FrontendProperties(
        @DefaultValue("http://localhost:4200") String origin
) {
}