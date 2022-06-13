### Loader Animation Effect

##  Introduction
Animations are necessary to create models that are essential for research and study. We’ll use css and js framework to show an example of how a loader can be animated and captions uploaded where necessary. We design the loader components using css and animate them through Nextjs and animejs library.


##  Codesandbox 
The final version of this project can be viewed on   [Codesandbox](/).

<CodeSandbox
title=""
id=" "
/>

You can find the full source code on my [Github](/) repo.

##  Prerequisites

Basic/entry-level knowledge and understanding of javascript and React/Nextjs.

##  Setting Up the Sample Project

Create your project root directory: `npx create-next-app loader`

Enter the directory: `cd loader`

In our project, let us have a backend for online media file upload. This will help users capture a caption of the loader and store it online for those who willwant to showcase their project results. We'll use [Cloudinary](https://cloudinary.com/?ap=em) for this feature. 

Include [Cloudinary](https://cloudinary.com/?ap=em) in your project dependencies: `npm install cloudinary`

 
Use this [link](https://cloudinary.com/console) to create or log into your Cloudinary account. You will be provided with a dashboard containing the necessary environment variables for integration.

In your root directory, create a new file named `.env.local` and use the following guide to fill your dashboard's variables.
```
"pages/api/upload.js"


CLOUDINARY_CLOUD_NAME =

CLOUDINARY_API_KEY = 

CLOUDINARY_API_SECRET=

```

Restart your project: `npm run dev`.

Create another directory `pages/api/upload.js`.

Configure the environment keys and libraries.

```
"pages/api/upload.js"


var cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
```
Finally, add a handler function to execute Nextjs post request:
```
"pages/api/upload.js"

export default async function handler(req, res) {
    if (req.method === "POST") {
        let url = ""
        try {
            let fileStr = req.body.data;
            const uploadedResponse = await cloudinary.uploader.upload(
                fileStr,
                {
                    chunk_size: 6000000,
                }
            );
        } catch (error) {
            res.status(500).json({ error: "Something wrong" });
        }

        res.status(200).json("backend complete");
    }
}
```
The above function will upload the request body containing media files to Cloudinary and return the captioned result in form of a Cloudinary link as a response    

We can now work on our front end.  There is not much required in the front end. First, Paste the following code into the home component.

```
"pages/index.js"

<>
    <nav>
    <h2>CSS Loader Animation Effect</h2>
    <button>Upload</button>
    </nav>
    
    <div id="boxes" ref={containerRef}>
        <div className="box red"></div>
        <div className="box blue"></div>
        <div className="box green"></div>
        <div className="box cyan"></div>
    </div>
</>
```
We create a nav bar containing the project title and a button and a container `boxes`, containing 4 box containers. Each container can be filled with a color of your choice. We will want each of them to have separate colors as well and separate animations at different times. Use the following code in your css and

```
"styles/global.css"

nav{
  width: 100vw;
  display:flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  background: #FFF;
 padding: 10px;
}
h2{
  color: black;;
}
a {
  color: inherit;
  text-decoration: none;
}

#boxes {
  display: flex;
  text-align: center;
  align-items: center;
  height: 100vh;
  justify-content: center;
  overflow: hidden;
}

#btns {
  padding: 25px;
  background: white;
  margin-bottom: 40px;
}

#btns button {
  background: white;
  padding: 5px 10px;
  border: 0px;
}

#btns .fa {
  font-size: 30px;
  color: #0078d7;
}

 
.box {
  position: relative;
  width: 60px;
  height: 60px;
  margin: 4px;
  display: inline-block;
}

.red {
  background-color: #1e4f3c;
}
.blue {
  background-color: #af151a;
}
.green {
  background-color: #480fe6;
}
.cyan {
  background-color: #06c22f;
}
```

So far your result should look like the below:

![sedigned boxes](https://res.cloudinary.com/dogjmmett/image/upload/v1655112491/UI2_w296b0.png "sedigned boxes").

Include animejs in your dependencies: `npm install animejs --save`

import it into your home component and introduce it to your home function through a useEffect state hook.

```
"pages/index.js"

import html2canvas from "html2canvas";
import {useEffect} from "react";
import anime from 'animejs';


export default function Home() {
  const containerRef = useRef();

 

  useEffect(() => {
    anime ({
      targets: 'div.box',
      translateY: [
          {value: 200, duration: 500},
          {value:0, duration: 800}  
      ],
      rotate: {
      value: '1turn',
      },
      borderRadius: 50,
      direction: 'alternate',
      easing: 'easeInOutQuad',
      delay: function() { return anime.random(0, 1000); },
      // autoplay: false,
      loop: true,
      elasticity: 200 
     
  }); 
  
  })
  return (
    <>
    <nav>
    <h2>CSS Loader Animation Effect</h2>
    <button >Upload</button>
    </nav>
    
    <div id="boxes">
        <div className="box red"></div>
        <div className="box blue"></div>
        <div className="box green"></div>
        <div className="box cyan"></div>
    </div>
    </>
  )
};

```
By now, you have already noticed changes in the way the boxes animate themselves. In the `anime` function parameters above,  `target` is used to reference the div element class to animate. `translateY` displaces the shapes along the Y-axis. Both `value` and `duration` specify the coordinate at which the shape will get displaced and how many milliseconds it should maintain at that point. We then allow the animation to continue in a loop. We will also include rotation and morph the border-radius to a circle parameter to make it look better. The `direction` is set to alternate to change direction in each loop. The `easing` controls the rate at which active animation is played. The `delay` param contains a function returning a random value for the loop param and we finally include the `elasticity param` which means the animation won’t stop abruptly once it’s done but oscillates instead.

The final part will be to allow captioning of our loader for online storage. Edit the home component to look like the below:

```
"pages/index/js"

import html2canvas from "html2canvas";
import {useRef, useState, useEffect} from "react";
import anime from 'animejs';


export default function Home() {
  const containerRef = useRef();
  const [link, setLink] = useState('');

  
  const uploadHandler = async() => {
    await html2canvas(containerRef.current).then(function(canvas) {
      console.log(canvas.toDataURL());
    })
  }

  useEffect(() => {
    anime ({
      targets: 'div.box',
      translateY: [
          {value: 200, duration: 500},
          {value:0, duration: 800}  
      ],
      rotate: {
      value: '1turn',
      },
      borderRadius: 50,
      direction: 'alternate',
      easing: 'easeInOutQuad',
      delay: function() { return anime.random(0, 1000); },
      // autoplay: false,
      loop: true,
      elasticity: 200 
     
  }); 
  
  })
  return (
    <>
    <nav>
    <h2>CSS Loader Animation Effect</h2>
    {link && <a href={link}><h3>Caption</h3></a>}
    <button onClick={uploadHandler}>Upload</button>
    </nav>
    
    <div id="boxes" ref={containerRef}>
        <div className="box red"></div>
        <div className="box blue"></div>
        <div className="box green"></div>
        <div className="box cyan"></div>
    </div>
    </>
  )
};
```

The code above captions a frame in the div, referenced using `useRef` hook, and sends it to the backend for upload and a canvas URL string using `html2canvas`. Once the response is ready, It is displayed to the front end using a `useState` hook.

That completes the project. Have fun playing with this example on your website.