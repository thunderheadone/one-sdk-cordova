#!/bin/sh

# This is a CI hook which should be run as a pre-build script
# to avoid automatic removal and addition of the platforms by CI

set -e

echo "Navigating to $NEVERCODE_BUILD_DIR/ionic1/kitchensink"
cd $NEVERCODE_BUILD_DIR/ionic/kitchensink
echo ""

# We remove the platform to have a clean setup which will 
# help to avoid build problems in case of the previously 
# broken pltaform setup
echo "Removing Android platform..."
ionic platform remove android || true
echo ""

echo "Adding Android platform..."
# This is required when building against Cordova 6.5
# If not specified, the pinned version of the platform 6.1.2 
# will be used which is not compatible with Android Studio 2.3
ionic platform add android@6.2.1 || true
echo ""

echo "Removing iOS platform..."
ionic platform remove ios || true
echo ""

echo "Adding iOS platform..."
ionic platform add ios || true
echo ""

echo "Done!"