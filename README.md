![npm version](https://img.shields.io/npm/v/mediakitjs?style=flat-square)  ![size](https://badgen.net/bundlephobia/minzip/mediakitjs?style=flat-square) ![licence](https://img.shields.io/npm/l/mediakitjs?style=flat-square)
![mediakit](img/mediakitLogo.png)
Stop media elements from playing all at once. Control them with a set of universal functions.

#### 💭 Problem
Many websites require embedded audio and video, either through HTML5 players or third party iFrames. However, managing these players can be difficult. Many audio players and iFrames can play at once, and each type of media has a different API, leading to an unpleasent experience for the user and developer.

#### ✨ Solution
mediakit aims to provide a simple interface for controlling all the media item on your page. Simply register the name and type of each item, and you'll have access to a universal control centre for your media. 
__By default, mediakit ensures that only one item can play at a time.__
### 💾 Installation
#### 📦 Packager
Install with package manager:
```
npm i mediakitjs
```
Then import as needed.
```$xslt
import { create, play, pauseAll } from 'mediakitjs';
```


#### 🌐 CDN

Load from CDN: 
```$xslt
<script type="module" src="https://cdn.jsdelivr.net/npm/mediakitjs@1.2.2/dist/mediakit.min.js</script>
```
Then grab `mediakit` from `window`.
```
const mk = window.mediakit;
```

### 🚀 Usage
You need to give mediakit an object containing a [query selector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector), type and name for each media item.
`type` and `selector` are required. If no name is supplied, the selector string becomes the name (including `#`'s and `.`'s).

```$xslt

<audio id="audio1" src="resources/music.m4a" controls></audio>
<video id="video1" src="resources/video.mp4" controls></video>
<iframe id="vimeo1" src="{vimeo url}" width="640" height="360"></iframe>

mk.create([
    { type: 'audio', selector: '#audio1' },
    { type: 'video', selector: '#video1' },
    { type: 'vimeo', selector: '#vimeo1' },
])
```

### 📺 YouTube Usage
For Vimeo, Video, and Audio, mediakit receives a reference to the existing iFrame or media element on the page.
To include a YouTube video, you must pass a selector to an empty `div` or `span` that you want to be replaced with the YouTube iFrame.
This is due to the design of the YouTube iFrame API, which requires us to register the iFrame on creation. Provide the videoId in the `config` property.
```
<div id="#youtube1"></div>

...

mk.create([
    { type: 'youtube', selector: '#youtube1', config: { videoId: '4eM12LJi_rg' } },
])
```

### 📖 Methods

#### `play(name: string)`
Play an element. If `config.playExclusive === true`, this method will pause all registered elements before playing the 
target element.

#### `pause(name: string)`
Pause an element. 

#### `stop(name: string)`
Stop an element. Currently identical to `pause()`. In future versions, this method will pause the target element, then
set its playback time to `0:00`. 

#### `pauseAllExcept(name: string)`
Pause all elements, except one. 

#### `pauseAll(name: string)`
Pause all elements.

### ⚙️ Configuration
`create()` accepts a second argument for configuration. The example below shows the default values of these properties.
```$xslt
mk.create(
    [
        {type: 'audio', selector: '#audio1'},
        {type: 'video', selector: '#video2'},
        {type: 'vimeo', selector: '#vimeo2'},
        {type: 'youtube', selector: '#youtube1', config: {videoId: '4eM12LJi_rg'}},
    ],
    {
        playExclusive: true,
        log: false,
    }
)
```
#### Supported 
- ✅ HTML5 Audio
- ✅ HTML5 Video
- ✅ YouTube
- ✅ Vimeo 


### 🛣️ Roadmap
- Add support for `seek()`
- Implement `stop()`. Current version mirrors `pause()`
- Emit mediakit events. eg: `mkPaused`, `mkPlayed` 
- Host demo site
- Add tests
