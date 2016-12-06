require('normalize.css');
require('styles/App.scss');

import React from 'react';

let imageDatas = require('!json!../data/imagedatas.json');

/*
 * 拼装图片地址
 * @pram Array imageDataArr 图片数组
 * @return Array
 * */
function genImageURL(imageDataArr) {

//    for (let i = 0, j = imageDataArr.length; i < j; i++) {
//        let singleImageData = imageDataArr[i];
//        singleImageData.imageURL = require('../images/' + singleImageData.fileName);
//        imageDataArr[i] = singleImageData;
//    }

    imageDataArr.forEach(s => {
        let imageUrl = require('../images/' + s.fileName);
        s.imageURL = imageUrl;
    })

    return imageDataArr;
}

imageDatas = genImageURL(imageDatas);

console.log(imageDatas)


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
        let controllerUnits = [],
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
