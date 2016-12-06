require('normalize.css');
require('styles/App.scss');

import React from 'react';

let imageDatas = require('json!../data/imagedatas.json');

function genImageURL(imageDataArr) {
    for (var i = 0, j = imageDataArr.length; i < j; i++) {
        var singleImageData = imageDataArr[i];
        singleImageData.imageURL = require('../images/' + singleImageData.fileName);
        imageDataArr[i] = singleImageData;
    }

    return imageDataArr;
}

imageDatas = genImageURL(imageDatas);


class ImgFigure extends React.Component {
    render() {
        return (
            <figure>
                <img className = "img-little"
                     src = {this.props.data.imageURL}
                     alt = {this.props.data.title}
                />
                <figcaption>
                    <h2>{this.props.data.title}</h2>
                </figcaption>
            </figure>
        )
    }
}

class AppComponent extends React.Component {
    render() {
        var controllerUnits = [],
            imgFigures = [];

        imageDatas.forEach(function(value, index){
            imgFigures.push(<ImgFigure data={value} key={'imgFigures' + index} />);

        });

        return (
            <section className = "stage">
                <section className = "img-sec">
                    {imgFigures}
                </section>
                <nav className = "controllor-nav">
                    {controllerUnits}
                </nav>
            </section>
        );
    }
}

AppComponent.defaultProps = {
};

export default AppComponent;
