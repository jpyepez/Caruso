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
const label = document.getElementById('label');

let isPlaying = false;
const sound = new Howl({
    src: csi
});


const checkSunglasses = (res) => {
    const sunglasses = ['sunglasses', 'sunglass', 'shades'];

    const categories = res.split(/[ ,]+/);

    // TODO: Remove bg and inner html on stop
    // maybe get rid of !isPlaying inside "else"

    if(sunglasses.includes(categories[0])) {
        if(!isPlaying) {
            sound.play();
            isPlaying = true;
        }
        container.classList.add("miami-bg");
        status.innerHTML = 'Sunglasses detected. Welcome Horatio!! 😎'
    } else {
        if (!isPlaying) {
            status.innerHTML = 'No sunglasses detected. Please deliver a sick one-liner and put your sunglasses on.'
        }
    }
}

const classifyVideo = () => {
    classifier.predict((err, results) => {
        if(err) {
            console.error(err);
        } else {
            checkSunglasses(results[0].className);
            label.innerText = results[0].className;
            classifyVideo();
        }
    })

}

const classifier = ml5.imageClassifier('MobileNet', video, () => {
    console.log('Model loaded!!');
    classifyVideo();
})

// "No sunglasses detected. Please deliver a sick one liner and put your
// sunglasses on."

// Image: "Miami Sunset" by John Getchel
// https://www.flickr.com/photos/john_getchel/28440834201
