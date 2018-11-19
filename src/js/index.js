if(!global._babelPolyfill) {
    require('@babel/polyfill');
}

import './../css/styles.css';
import ml5 from 'ml5'; // need to import for polyfill
import video from './video';
import miami from './../assets/miami.jpg';
import csi from './../assets/csimiami.mp3';
import {Howl, Howler} from 'howler';

const container = document.getElementById('container');
const status = document.getElementById('status');
// const label = document.getElementById('label');

let isPlaying = false;
let hasSunglasses = false;

const sound = new Howl({
    src: csi
});

sound.on('end', () => {
    container.classList.remove("miami-bg");
    isPlaying = false;
});

const checkSunglasses = (res) => {
    const sunglasses = ['sunglasses', 'sunglass', 'shades'];
    const categories = res.split(/[ ,]+/);

    if (!isPlaying) {
        if (sunglasses.includes(categories[0])) {
            if(!hasSunglasses) {
                sound.play();
                isPlaying = true;
                hasSunglasses = true;
                container.classList.add("miami-bg");
                status.innerHTML = '<p>Sunglasses detected!! 😎</p>';
            }
        } else {
            hasSunglasses = false;
            status.innerHTML = '<p><span>No sunglasses detected.</span> Please deliver a sick one-liner and put your sunglasses on.</p>';
        }
    }
}

const classifyVideo = () => {
    classifier.predict((err, results) => {
        if(err) {
            console.error(err);
        } else {
            checkSunglasses(results[0].className);
            // label.innerText = results[0].className;
            classifyVideo();
        }
    })

}

const classifier = ml5.imageClassifier('MobileNet', video, () => {
    console.log('Model loaded!!');
    classifyVideo();
})

// Image: "Miami Sunset" by John Getchel
// https://www.flickr.com/photos/john_getchel/28440834201

// Image: "Horatio Caine"
// Photo: Andrew MacPherson/CBS.©2006 CBS Broadcasting Inc. All Rights Reserved
