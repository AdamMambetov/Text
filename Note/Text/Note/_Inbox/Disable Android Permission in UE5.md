The easiest way to achieve this is to use UPL (“Unreal Plugin Language”) file to remove permissions. As I know, it’s not publicly documented, so you have to dig through UE4 source code to understand what it is capable of. Basically, UPL is an XML that allows to modify contents of Android- and iOS- specific files, such as AndroidManifest.xml or GameActivity.java.

1. Create RemoveAndroidPermissions_UPL.xml file near the .Build.cs file of your project. It should contain this:
``` xml
<?xml version="1.0" encoding="utf-8"?>
<root xmlns:android="http://schemas.android.com/apk/res/android">
    <androidManifestUpdates>
        <removePermission android:name="android.permission.READ_PHONE_STATE" />
        <removePermission android:name="android.permission.GET_ACCOUNTS" />
    </androidManifestUpdates>
</root>
```

2. Add to the import section of the .Build.cs file.
``` cs
using System.IO;
```

3. Then add this code to the constructor:
``` cs
if (Target.Platform == UnrealTargetPlatform.Android) {
  var manifestFile = Path.Combine(this.ModuleDirectory, "RemoveAndroidPermissions_UPL.xml");
  AdditionalPropertiesForReceipt.Add(
    new ReceiptProperty("AndroidPlugin", manifestFile) // old version
	"AndroidPlugin", manifestFile                      // new version
  );
}
```


**Связано с:**
- [[00. Unreal Engine]]