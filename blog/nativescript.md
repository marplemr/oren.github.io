## Build Mobile apps with Dockrized NativeScript

![nativescript](images/nativescript.jpg)

[NativeScript](https://www.nativescript.org) is an interesting way to build Android and iOS apps using Javascript.

Lets look at alternatives:
* **Phonegap** uses the DOM. NativeScript uses native UI controls.  
* **Xamarin and Titanium** compile C# and JavaScript into Objective-C and Java (respectively). In NativeScript the JavaScript you write is running on your phone.  
* **React Native** only compiles to iOS (at the moment) and also it doesn't provide direct access to native API.

Here is an example for using the Android native API:
``` js
var file = new java.io.File(path);
```

NativeScript uses the V8 (and Webkit for iOS and Windows) which injects a few global objects. In the above example `java.io.File` is one of them. In order to access the Java object, NativeScript uses something called Android JNI which provide a bridge between C++ and Java.
`file` is now a proxy object that points to a Java Object.
Is there any performance pentalty here? yup, but it's only %10 precent slower than real Native app.

Two more interesting points about NativeScript:

* NPM and CommonJS friendly - If you use Node.js you will feel at home.
* CSS for styling - You can use regular CSS syntax for styling your UI.

I wanted to explore NativeScript but I didn't want to install and configure Java, Android SDK, Ant, etc.. life is too short so I created a Docker container with everything needed to run it.

[Try it](https://github.com/oren/docker-nativescript) and let me know what you think!

![demo-video](https://raw.githubusercontent.com/oren/docker-nativescript/master/demo-video.gif)
