set -e


echo "Installing npm dependencies..."
yes Y | npm install
echo ""

echo "Installing Android platform..."
ionic cordova platform add android || true
echo ""

echo "Removing cordova-plugin-one..."
cordova plugin remove cordova-plugin-one --save || true
echo ""

echo "Adding cordova-plugin-one..."
cordova plugin add ../../cordova-plugin-one --variable AUTOMATICIDENTITYTRANSFER=true --nosave
echo ""

if [ "$1" == "--device" ]
then
echo "Running Android Device..."
ionic cordova run android
elif [ "$1" == "--emulator" ]
then
echo "Running Android Emulator..."
ionic cordova emulate android
else
echo "No --device or --emulator specified. Default to running Android Device..."
ionic cordova run android
fi


echo "Done!"