if(!global._babelPolyfill) {
    require('@babel/polyfill');
}

import ml5 from 'ml5'; // need to import for polyfill
const video = require('./video');

const label = document.getElementById('label');

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