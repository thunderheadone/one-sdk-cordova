set -e


echo "Installing node modules..."
npm install
echo ""

echo "Installing Android platform..."
cordova platform add android || true
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

if [ "$1" == "--device" ]
then
echo "Running Android Device..."
cordova run android
elif [ "$1" == "--emulator" ]
then
echo "Running Android Emulator..."
cordova emulate android
else
echo "No --device or --emulator specified. Default to running Android Device..."
cordova run android
fi


echo "Done!"