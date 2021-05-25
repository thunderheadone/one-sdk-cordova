package com.thunderhead;

import android.util.Log;
import android.content.ContentProvider;
import com.thunderhead.android.api.codeless.OneCodelessInteractionTrackingConfiguration;
import android.content.ContentValues;
import android.database.Cursor;
import android.net.Uri;

public class ThunderheadProvider extends ContentProvider {
    protected static final String LOG_TAG = "ThunderheadProvider";

    public ThunderheadProvider() {
    }

    @Override
    public int delete(Uri uri, String selection, String[] selectionArgs) {
        return 0;
    }

    @Override
    public String getType(Uri uri) {
        return null;
    }

    @Override
    public Uri insert(Uri uri, ContentValues values) {
        return null;
    }

    @Override
    public boolean onCreate() {
        Log.d(LOG_TAG, "Setting default ONE configuration.");

        final OneCodelessInteractionTrackingConfiguration codelessInteractionTrackingConfiguration =
                new OneCodelessInteractionTrackingConfiguration.Builder()
                        // disables Fragment/Activity Interaction Tracking
                        .disableCodelessInteractionTracking(true)
                        // disables WebView URL Interaction Tracking
                        .disableWebViewInteractionTracking(true)
                        .build();
        One.setCodelessInteractionTrackingConfiguration(codelessInteractionTrackingConfiguration);
        return false;
    }

    @Override
    public Cursor query(Uri uri, String[] projection, String selection,
                        String[] selectionArgs, String sortOrder) {
        return null;
    }

    @Override
    public int update(Uri uri, ContentValues values, String selection,
                      String[] selectionArgs) {
        return 0;
    }
}