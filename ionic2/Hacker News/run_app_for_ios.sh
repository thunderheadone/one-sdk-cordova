set -e


echo "Installing node modules..."
npm install
echo ""

echo "Installing iOS platform..."
cordova platform add ios || true
echo ""

echo "Removing cordova-plugin-one..."
cordova plugin remove cordova-plugin-one --save || true
echo ""

echo "Adding cordova-plugin-one..."
cordova plugin add ../../cordova-plugin-one --nosave --variable AUTOMATICIDENTITYTRANSFER=true
echo ""

echo "Building www resources..."
npm run gulp build
echo ""

echo "Installing the latest ios-sim..."
cd platforms/ios/cordova
npm install ios-sim
cd ../../../
echo ""

if [ "$1" == "--device" ]
then
echo "Running iOS Device..."
cordova run ios
elif [ "$1" == "--emulator" ]
then
echo "Running iOS Simulator..."
cordova run ios --emulator
else
echo "No --device or --emulator specified. Default to running iOS Device..."
cordova run ios
fi


echo "Done!"