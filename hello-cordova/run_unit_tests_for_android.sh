set -e

# To have a clean state tor testing ONE Cordova plugin, we need to remove 
# the cordova-plugin-one and cordova-plugin-one-tests plugins first. If they 
# are already not present, the script will output an error, but will continue
# execution.

echo "Removing cordova-plugin-one..."
cordova plugin remove cordova-plugin-one || true
echo ""

echo "Removing cordova-plugin-one-tests..."
cordova plugin remove cordova-plugin-one-tests || true
echo ""

echo "Adding Android platform..."
cordova platform add android || true
echo ""

# Here we get paths to folders where the cordova-plugin-one and 
# cordova-plugin-one-tests  plugins reside. These paths are needed to add 
# them to the project.

currentDir=$PWD
echo $currentDir
echo "Current directory: $currentDir"
parentDir="$(dirname "$currentDir")"
echo "Parent directory: $parentDir"
pluginDir=$parentDir"/cordova-plugin-one"
echo "Plugin directory: $parentDir"
testsDir=$pluginDir"/tests"
echo "Plugin tests directory: $testsDir"
echo ""

echo "Adding cordova-plugin-one..."
cordova plugin add $pluginDir
echo ""

echo "Adding cordova-plugin-one-tests..."
cordova plugin add $testsDir
echo ""

# To run tests, we need to have the cordova-plugin-test-framework installed. 
# We list the project's installed plugins first and install the required
# plugin if it's not listed.

echo "Checking if the test framework is installed..."
pluginsList=$(cordova plugin list)
if [[ $pluginsList != *"cordova-plugin-test-framework"* ]]; then
	echo "Installing the test framework..."
	cordova plugin add cordova-plugin-test-framework
else
	echo "The test framework is already installed."
fi
echo ""

# The cordova-plugin-test-framework plugin requires the project's entry file
# index.html to be changed to cdvtests/index.html. It should be done 
# in the project's configuration file config.xml. The script creates a backup
# copy of the file which will be used to restore the original configuration file
# when the project is deployed on device.

echo "Updating config.xml..."
echo "Replacing <content src=\"index.html\" /> with  <content src=\"cdvtests/index.html\" />..."
sed -i .backup -e "s/index.html/cdvtests\/index.html/" config.xml
echo ""

echo "Running Android..."
cordova run android || true
echo ""

echo "Restoring config.xml..."
rm config.xml || true
mv config.xml.backup config.xml
echo ""

echo "Done!"