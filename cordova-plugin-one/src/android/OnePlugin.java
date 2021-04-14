package com.thunderhead.plugin.one;

import android.content.Context;
import android.util.Log;

import com.thunderhead.One;
import com.thunderhead.OneModes;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaArgs;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.MalformedURLException;
import java.net.URI;
import java.net.URL;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;

import com.thunderhead.OneSdkVersion;
import com.thunderhead.android.api.codeless.OneCodelessInteractionTrackingConfiguration;
import com.thunderhead.android.api.configuration.OneConfiguration;
import com.thunderhead.android.api.identitytransfer.OneIdentityTransferConfiguration;
import com.thunderhead.android.api.interactions.OneCall;
import com.thunderhead.android.api.interactions.OneCallback;
import com.thunderhead.android.api.interactions.OneInteractionPath;
import com.thunderhead.android.api.interactions.OneRequest;
import com.thunderhead.android.api.interactions.OneResponseCode;
import com.thunderhead.android.api.interactions.OneResponseCodeRequest;
import com.thunderhead.android.api.optout.OneOptOutConfiguration;
import com.thunderhead.android.api.responsetypes.OneAPIError;
import com.thunderhead.android.api.responsetypes.OneResponse;
import com.thunderhead.android.api.responsetypes.OneSDKError;
import com.thunderhead.android.infrastructure.server.entitys.Optimizations;

/**
 * This class echoes a string called from JavaScript.
 */
public class OnePlugin extends org.apache.cordova.CordovaPlugin {
  protected static final String LOG_TAG = "OnePlugin";

  @Override
  public boolean execute(final String action, final CordovaArgs args, final CallbackContext callbackContext) throws JSONException {
    if ("initializeOne".equals(action)) {
      return initializeOne(args, callbackContext);
    } else if ("sendInteraction".equals(action)) {
      cordova.getActivity().runOnUiThread(() -> {
        try {
          JSONObject jsonObject = args.optJSONObject(1);
          HashMap<String, String> propertiesMap = getPropertiesFromJSONObject(jsonObject);
          sendInteraction(args.getString(0), propertiesMap, callbackContext);
        } catch (Exception e) {
          e.printStackTrace();
          callbackContext.error("Failed to send properties: " + e.getLocalizedMessage());
        }
      });
      return true;
    } else if ("optOut".equals(action)) {
      cordova.getActivity().runOnUiThread(() -> {
        try {
          boolean optOut = args.getBoolean(0);
          final OneOptOutConfiguration optOutConfiguration = new OneOptOutConfiguration.Builder()
            .optOut(optOut)
            .build();
          One.setOptOutConfiguration(optOutConfiguration);
        } catch (Exception e) {
          e.printStackTrace();
          callbackContext.error("Failed to opt out: " + e.getLocalizedMessage());
        }
      });
      return true;
    } else if ("sendProperties".equals(action)) {
      cordova.getActivity().runOnUiThread(() -> {
        try {
          JSONObject jsonObject = args.optJSONObject(1);
          if (jsonObject == null) {
            callbackContext.error("No properties to send");
            return;
          }
          HashMap<String, String> propertiesMap = getPropertiesFromJSONObject(jsonObject);
          if (propertiesMap != null && propertiesMap.size() > 0) {
            sendProperties(args.getString(0), propertiesMap);
            callbackContext.success();
          } else {
            callbackContext.error("No properties to send");
          }
        } catch (Exception e) {
          e.printStackTrace();
          callbackContext.error("Failed to send properties: " + e.getLocalizedMessage());
        }
      });
      return true;
    } else if ("sendBaseTouchpointProperties".equals(action)) {
      cordova.getActivity().runOnUiThread(new Runnable() {
        public void run() {
          try {
            JSONObject jsonObject = args.getJSONObject(0);
            HashMap<String, String> propertiesMap = getPropertiesFromJSONObject(jsonObject);
            if (propertiesMap != null && propertiesMap.size() > 0) {
              sendBaseTouchpointProperties(propertiesMap);
              callbackContext.success();
            } else {
              callbackContext.error("No base Touchpoint properties to send");
            }
          } catch (Exception e) {
            e.printStackTrace();
            callbackContext.error("Failed to send base Touchpoint properties: " + e.getLocalizedMessage());
          }
        }
      });
      return true;
    } else if ("sendResponseCode".equals(action)) {
      cordova.getActivity().runOnUiThread(new Runnable() {
        public void run() {
          try {
            OneResponseCodeRequest request = new OneResponseCodeRequest.Builder()
              .interactionPath(new OneInteractionPath(URI.create(args.optString(1))))
              .responseCode(new OneResponseCode(args.getString(0)))
              .build();
            One.sendResponseCode(request).enqueue(null);
          } catch (Exception e) {
            e.printStackTrace();
            callbackContext.error("Failed to send response code: " + e.getLocalizedMessage());
          }
        }
      });
      return true;
    } else if ("getTid".equals(action)) {
      cordova.getActivity().runOnUiThread(new Runnable() {
        public void run() {
          callbackContext.success(getTid());
        }
      });
      return true;
    } else if ("clearUserProfile".equals(action)) {
      cordova.getActivity().runOnUiThread(new Runnable() {
        public void run() {
          clearUserProfile();
          if (getTid() == null || getTid().length() == 0) {
            callbackContext.success();
          } else {
            callbackContext.error("Failed to clear user profile");
          }
        }
      });
      return true;
    } else if ("sendInteractionForOutboundLink".equals(action)) {
      cordova.getActivity().runOnUiThread(new Runnable() {
        public void run() {
          try {
            String stringURL = args.optString(0);
            URL url = new URL(stringURL);
            sendInteractionForOutboundLink(url);
          } catch (Exception e) {
            e.printStackTrace();
            callbackContext.error("Failed to send interaction for outbound link: " + e.getLocalizedMessage());
          }
        }
      });
      return true;
    } else if ("getURLWithOneTid".equals(action)) {
      cordova.getActivity().runOnUiThread(new Runnable() {
        public void run() {
          String stringURL = args.optString(0);
          if (stringURL == null) {
            callbackContext.error("Passed string URL is null");
            return;
          }
          URL urlWithTid = getURLWithOneTid(stringURL);
          if (urlWithTid != null) {
            callbackContext.success(urlWithTid.toString());
          } else {
            callbackContext.error("Failed to create an URL with tid");
          }
        }
      });
      return true;
    } else if ("disableIdentityTransfer".equals(action)) {
      cordova.getActivity().runOnUiThread(new Runnable() {
        public void run() {
          boolean disable = args.optBoolean(0);
          final OneIdentityTransferConfiguration identityTransferConfiguration =
            new OneIdentityTransferConfiguration.Builder()
              .disableIdentityTransfer(disable)
              .build();
          One.setIdentityTransferConfiguration(identityTransferConfiguration);
          callbackContext.success();
        }
      });
      return true;
    } else if ("handleURL".equals(action)) {
      cordova.getActivity().runOnUiThread(new Runnable() {
        public void run() {
          String stringURL = args.optString(0);
          if (stringURL == null) {
            callbackContext.error("Passed string URL is null");
            return;
          }
          try {
            One.processDeepLink(URI.create(stringURL));
            callbackContext.success();
          } catch (Exception e) {
            callbackContext.error("Failed to handle URL");
          }
        }
      });
      return true;
    } else if ("whitelistIdentityTransferLinks".equals(action)) {
      cordova.getActivity().runOnUiThread(new Runnable() {
        public void run() {
          HashSet<URI> links = getStringListFromCordovaArgs(args);
          if (links.size() > 0) {
            One.setIdentityTransferLinksWhiteList(links);
            callbackContext.success();
          } else {
            callbackContext.error("The SDK cannot whitelist any links as no links were provided.");
          }
        }
      });
      return true;
    } else if ("blacklistIdentityTransferLinks".equals(action)) {
      cordova.getActivity().runOnUiThread(new Runnable() {
        public void run() {
          HashSet<URI> links = getStringListFromCordovaArgs(args);
          if (links.size() > 0) {
            One.setIdentityTransferLinksBlackList(links);
            callbackContext.success();
          } else {
            callbackContext.error("The SDK cannot blacklist any links as no links were provided.");
          }
        }
      });
      return true;
    }
    return false;
  }

  public boolean initializeOne(final CordovaArgs args, final CallbackContext callbackContext) {
    callAPI(new API(callbackContext) {
      void api() {
        try {
          final String siteKey = args.getString(0);
          final String touchpointURI = args.getString(1);
          final String apiKey = args.getString(2);
          final String sharedSecret = args.getString(3);
          final String userId = args.getString(4);
          boolean adminMode = args.getBoolean(5);
          final String host = args.getString(6);

          init(siteKey, touchpointURI, apiKey, sharedSecret, userId, adminMode, host);
        } catch (Exception e) {
          e.printStackTrace();
        }
      }
    });
    return true;
  }

  private static abstract class API implements Runnable {
    private final CallbackContext mCallbackContext;

    API(final CallbackContext callbackContext) {
      super();
      mCallbackContext = callbackContext;
    }

    @Override
    public void run() {
      api();
      mCallbackContext.success();
    }

    abstract void api();
  }

  public synchronized boolean init(String siteKey, String touchpointURI, String apiKey, String sharedSecret, String userId, boolean isAdminMode, String hostName) {
    Log.d(LOG_TAG, "Initializing Thunderhead One Plugin");

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

    final OneConfiguration oneConfiguration = new OneConfiguration.Builder()
      .siteKey(siteKey)
      .apiKey(apiKey)
      .sharedSecret(sharedSecret)
      .userId(userId)
      .host(URI.create(hostName))
      .touchpoint(URI.create(touchpointURI))
      .mode(isAdminMode ? OneModes.ADMIN_MODE : OneModes.USER_MODE)
      .build();

    One.setConfiguration(oneConfiguration);

    OneSdkVersion.updateModuleSdkVersion();
    return true;
  }

  public void sendInteraction(String interactionPath, HashMap<String, String> propertiesMap, final CallbackContext callbackContext) {
    Log.d(LOG_TAG, "Sending interaction: " + interactionPath + " with properties: " + propertiesMap);

    final OneRequest sendInteractionRequest =
      (propertiesMap != null) ?
        new OneRequest.Builder()
        .interactionPath(new OneInteractionPath(URI.create(interactionPath)))
        .properties(propertiesMap)
        .build() :
        new OneRequest.Builder()
          .interactionPath(new OneInteractionPath(URI.create(interactionPath)))
          .build();

    final OneCall sendInteractionCall = One.sendInteraction(sendInteractionRequest);

    sendInteractionCall.enqueue(new OneCallback() {
      @Override
      public void onSuccess(OneResponse oneResponse) {
        try {
          JSONObject jsonObject = new JSONObject();
          jsonObject.put("statusCode", oneResponse.getHttpStatusCode());
          jsonObject.put("tid", oneResponse.getTid());
          jsonObject.put("trackers", new JSONArray(oneResponse.getTrackers()));
          jsonObject.put("captures", new JSONArray(oneResponse.getCaptures()));

          List<Optimizations> optimizations = oneResponse.getOptimizations();

          if (optimizations != null && optimizations.size() > 0) {
            JSONArray optimizationsJSONArray = new JSONArray();

            for (Optimizations optimization : optimizations) {
              JSONObject optimizationObj = new JSONObject();
              optimizationObj.put("data", optimization.getData());
              optimizationObj.put("path", optimization.getPath());
              optimizationObj.put("dataMimeType", optimization.getDataMimeType());
              optimizationObj.put("directives", optimization.getDirectives());
              optimizationsJSONArray.put(optimizationObj);
            }
            jsonObject.put("optimizations", optimizationsJSONArray);
          }

          callbackContext.success(jsonObject);
        } catch (Exception exception) {
          exception.printStackTrace();
          callbackContext.error(exception.getLocalizedMessage());
        }
      }

      @Override
      public void onFailure(OneAPIError oneAPIError) {
        callbackContext.error(oneAPIError.getErrorMessage());
      }

      @Override
      public void onError(OneSDKError oneSDKError) {
        callbackContext.error(oneSDKError.getErrorMessage());
      }
    });
  }

  public void sendProperties(String interactionPath, HashMap<String, String> propertiesMap) {
    if (interactionPath != null && propertiesMap != null) {
      Log.d(LOG_TAG, "Sending properties: " + propertiesMap + " for interaction: " + interactionPath);
      final OneRequest sendInteractionRequest = new OneRequest.Builder()
        .interactionPath(new OneInteractionPath(URI.create(interactionPath)))
        .properties(propertiesMap)
        .build();

      final OneCall sendInteractionCall = One.sendInteraction(sendInteractionRequest);
      sendInteractionCall.enqueue(null);
    }
  }

  public void sendBaseTouchpointProperties(HashMap<String, String> propertiesMap) {
    if (propertiesMap != null) {
      Log.d(LOG_TAG, "Sending base Touchpoint properties: " + propertiesMap);
      final OneRequest sendPropertiesRequest = new OneRequest.Builder()
        .properties(propertiesMap)
        .build();

      final OneCall sendPropertiesCall = One.sendProperties(sendPropertiesRequest);

      sendPropertiesCall.enqueue(null);
    }
  }

  public void sendInteractionForOutboundLink(URL url) {
    One.sendInteractionForOutboundLink(url);
  }

  public String getTid() {
    return One.getTid();
  }

  public void clearUserProfile() {
    One.clearUserProfile();
  }

  public URL getURLWithOneTid(String stringURL) {
    URL url = null;
    try {
      url = One.createUrlWithTid(new URL(stringURL));
    } catch (MalformedURLException e) {
      e.printStackTrace();
    }
    return url;
  }

  private void callAPI(final API api) {
    cordova.getActivity().runOnUiThread(api);
  }

  private HashMap<String, String> getPropertiesFromJSONObject(JSONObject jsonObject) {
    if (jsonObject != null && jsonObject.length() > 0) {
      HashMap<String, String> propertiesMap = new HashMap<String, String>(jsonObject.length());
      for (Iterator<String> iter = jsonObject.keys(); iter.hasNext(); ) {
        String key = iter.next();
        try {
          Object value = jsonObject.get(key);
          if (value != null) {
            propertiesMap.put(key, value.toString());
          }
        } catch (Exception e) {
          e.printStackTrace();
        }
      }
      return propertiesMap;
    }
    return null;
  }

  private HashSet<URI> getStringListFromCordovaArgs(CordovaArgs args) {
    HashSet<URI> stringList = new HashSet<>();
    /**
     * CordovaArgs doesn't have methods to determine its size.
     * Therefore we have to determine its end by using isNull
     * method.
     */
    for (int index = 0; ; index++) {
      if (args.isNull(index)) {
        break;
      }
      String entry = args.optString(index);
      if (entry != null) {
        stringList.add(URI.create(entry));
      }
    }
    return stringList;
  }
}
