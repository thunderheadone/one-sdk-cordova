package com.thunderhead;

public class OneSdkVersion {
  private static final String ONE_CORDOVA_PLUGIN_VERSION = "2.0.1";

  public static void updateModuleSdkVersion() {
    SdkExtraParams sdkExtraParams = new SdkExtraParams();
    sdkExtraParams.putStringExtraParameter(SdkExtraParams.PluginsApiParametersKeys.PARAMETER_CORDOVA_VERSION, ONE_CORDOVA_PLUGIN_VERSION);
    //TODO
    //  One.passExtraParameters(sdkExtraParams);
  }
}
