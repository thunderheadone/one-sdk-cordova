package com.thunderhead;

import android.app.Application;
import com.thunderhead.android.api.codeless.OneCodelessInteractionTrackingConfiguration;

public class ThunderheadApplication extends Application {
    @Override
    public void onCreate() {
      super.onCreate();

      final OneCodelessInteractionTrackingConfiguration codelessInteractionTrackingConfiguration =
        new OneCodelessInteractionTrackingConfiguration.Builder()
          // disables Fragment/Activity Interaction Tracking
          .disableCodelessInteractionTracking(true)
          // disables WebView URL Interaction Tracking
          .disableWebViewInteractionTracking(true)
          // disables Outbound Link Tracking
          .disableOutboundLinkTracking(true)
          .build();
      One.setCodelessInteractionTrackingConfiguration(codelessInteractionTrackingConfiguration);
    }
}
