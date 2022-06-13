import html2canvas from "html2canvas";
import {useRef, useState, useEffect} from "react";
import anime from 'animejs';


export default function Home() {
  const containerRef = useRef();
  const [link, setLink] = useState('');

  
  const uploadHandler = async() => {
    await html2canvas(containerRef.current).then(function(canvas) {
      console.log(canvas.toDataURL())
      try {
        fetch('/api/upload', {
          method: 'POST',
          body: JSON.stringify({ data: canvas.toDataURL() }),
          headers: { 'Content-Type': 'application/json' },
        })
          .then((response) => response.json())
          .then((data) => {
            setLink(data.data);
          });
      } catch (error) {
        console.error(error);
      }
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
     
  }, []); 
  
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
