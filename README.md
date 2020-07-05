# mediakit
A powerful and simple interface for controlling media on web pages.

![mediakit](logo.jpg)

#### Problem
Many websites require embedded audio and video, either through HTML5 players or third party iFrames. However, managing these players can be difficult. Many audio players and iFrames can play at once, and each type of media has a different API, leading to an unpleasent experience for the user and developer.

#### Solution
mediakit aims to provide a simple interface for controlling all the media item on your page. Simply register the name and type of each item, and you'll have access methods like `play()`, `pause()`, `pauseAllExcept()`, `stop()` and more, creating a universal control centre for your media. By default, mediakit ensures that only one item can play at a time.
### Installation
**npm**
```
> npm i mediakit
```
```$xslt
import mk from 'mediakit';
```


**cdn**
```$xslt
<script type="module" src=***></script>

<script>
    const mk = window.mediakit;
</script>
```

### Usage
`type` and `selector` are required. If no name is supplied, the selector string becomes the name (including #'s and .'s).
```$xslt
mk.create(
    [
        {type: 'audio', selector: '#player1', name: 'audio1'},
        {type: 'audio', selector: '#player2', name: 'audio2'}
    ],
)
```

### Methods
```$xslt
mk.play(name)   <------------ Play an item
mk.pause(name)  <------------ Pause an item
mk.stop(name)   <------------ Stop playing an item
mk.pauseAllExcept(name)  <--- Pause all items except one
mk.pauseAll()   <------------ Pause all items
```

### Config
`create()` accepts a second argument for configuration. The example below shows the default values of these properties.
```$xslt
mk.create(
    [
        {type: 'audio', selector: '#player1', name: 'audio1'},
        {type: 'audio', selector: '#player2', name: 'audio2'}
    ],
    {
        playExclusive: true,
        log: false,
    }
)
```
#### Supported 
- [x] HTML5 Audio
- [ ] HTML5 Video
- [ ] YouTube
- [ ] Vimeo 
