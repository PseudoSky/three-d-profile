# Reality computing: 3d profile scans

* Captured using Autodesk's 123D Catch
* Uses ThreeJS for visualization
* Created JSONP wrapper for async Obj loading 
  * Including string parsing pipeline
	  * See js/portrait.js line 62
	  * Loader in lib/OBJLoader.js line 18

I Might put a demo up. Not sure.

For now, if you download, you can just drag portrait.html into your browser. 

The object should be loaded without any XHR issues (wrapped it up with jsonp)