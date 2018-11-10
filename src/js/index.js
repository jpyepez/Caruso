if(!global._babelPolyfill) {
    require('@babel/polyfill');
}

import ml5 from 'ml5'; // need to import for polyfill
import video from './video';
import miami from './../assets/miami.jpg';
import csi from './../assets/csimiami.mp3';
import {Howl, Howler} from 'howler';

const label = document.getElementById('label');
const miamiImg = document.getElementById('miami-img');

const sound = new Howl({
    src: csi
});
sound.play();

miamiImg.src = miami;

const classifyVideo = () => {
    classifier.predict((err, results) => {
        if(err) {
            console.error(err);
        } else {
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
