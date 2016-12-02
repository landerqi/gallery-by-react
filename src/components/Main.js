require('normalize.css');
require('styles/App.scss');

import React from 'react';

let imageDatas = require('../data/imagedatas.json');

function genImageURL(imageDataArr) {
    for (var i = 0, j = imageDataArr.length; i < j; i++) {
        var singleImageData = imageDataArr[i];
        singleImageData.imageURL = require('../images/' + singleImageData.fileName);
        imageDataArr[i] = singleImageData;
    }

    return imageDataArr;
}

imageDatas = genImageURL(imageDatas);

class AppComponent extends React.Component {
  render() {
    return (
        <section className = "stage">
            <section className = "img-sec">
            </section>
            <nav className = "controllor-nav">
            </nav>
        </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
