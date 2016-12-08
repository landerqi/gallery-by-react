require('normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

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
            <figure className ="img-figure">
                <img className = "img-little"
                     src = {this.props.data.imageURL}
                     alt = {this.props.data.title}
                />
                <figcaption>
                    <h2 className = "img-title">{this.props.data.title}</h2>
                </figcaption>
            </figure>
        )
    }
}

class AppComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	Constant: {
		centerPos: {
			left: 0,
			rigth: 0
		},
		hPosRange: {   //水平方向取值范围
			leftSecX: [0, 0],
			rightSecX: [0,0],
			y: [0, 0]
		},
		vPosRange: {  //垂直方向取值范围
			x: [0, 0],
			topY: [0, 0]
		}
	}

	//组件加载后，为每张图片计算其位置的范围
	componentDidMount() {
		//首先拿到舞台的大小
		let stageDom = ReactDOM.findDOMNode(this.refs.stage),
			stageW = stageDom.scrollWidth,
			stageH = stageDom.scrollHeight,
			halfStageW = Math.ceil(stageW / 2),
			halfStageH = Math.ceil(stageH / 2);

	}

    render() {
        let controllerUnits = [],
            imgFigures = [];

        imageDatas.forEach(function(value, index){
            imgFigures.push(<ImgFigure data={value} key={'imgFigures' + index} />);

        });

        return (
            <section className="stage" ref="stage">
                <section className="img-sec">
                    {imgFigures}
                </section>
                <nav className="controllor-nav">
                    {controllerUnits}
                </nav>
            </section>
        );
    }
}

AppComponent.defaultProps = {
};

export default AppComponent;
