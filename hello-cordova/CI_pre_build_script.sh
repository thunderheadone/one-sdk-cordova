#!/bin/sh

# This is a CI hook which should be run as a pre-build script
# to avoid automatic removal and addition of the platforms by CI

set -e

echo "Navigating to $NEVERCODE_BUILD_DIR/hello-cordova"
cd $NEVERCODE_BUILD_DIR/hello-cordova
echo ""

# We remove the platform to have a clean setup which will 
# help to avoid build problems in case of the previously 
# broken pltaform setup
echo "Removing Android platform..."
cordova platform remove android || true
echo ""

echo "Adding Android 6.2.1 platform..."
# This is required when building against Cordova 6.5
# If not specified, the pinned version of the platform 6.1.2 
# will be used which is not compatible with Android Studio 2.3
cordova platform add android@6.2.1 || true
echo ""

echo "Removing iOS platform..."
cordova platform remove ios || true
echo ""

echo "Adding iOS platform..."
cordova platform add ios || true
echo ""

echo "Done!"