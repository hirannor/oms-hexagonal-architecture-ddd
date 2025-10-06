package io.github.hirannor.oms.adapter.payment.stripe;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(value = "payment.stripe")
public class StripeConfigurationProperties {
    private String apiKey;
    private String webHookSecret;
    private String successUrl;
    private String cancelUrl;

    public StripeConfigurationProperties() {
    }

    public String getApiKey() {
        return apiKey;
    }

    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }

    public String getSuccessUrl() {
        return successUrl;
    }

    public String getWebHookSecret() {
        return webHookSecret;
    }

    public void setWebHookSecret(String webHookSecret) {
        this.webHookSecret = webHookSecret;
    }

    public void setSuccessUrl(String successUrl) {
        this.successUrl = successUrl;
    }

    public String getCancelUrl() {
        return cancelUrl;
    }

    public void setCancelUrl(String cancelUrl) {
        this.cancelUrl = cancelUrl;
    }
}
