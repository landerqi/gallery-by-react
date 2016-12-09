require('normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

let imageDatas = require('!json!../data/imagedatas.json');

console.log('React', React);
console.log('ReactDOM', ReactDOM);

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

console.log('imageDatas', imageDatas)


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

		//this.rearrange = this.rearrange.bind(this);

		this.Constant = {
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
	}


	//组件加载后，为每张图片计算其位置的范围
	componentDidMount() {
		//首先拿到舞台的大小
		let stageDom = ReactDOM.findDOMNode(this.refs.stage),
			stageW = stageDom.scrollWidth,
			stageH = stageDom.scrollHeight,
			halfStageW = Math.ceil(stageW / 2),
			halfStageH = Math.ceil(stageH / 2);

		//拿到一个imageFigure的大小
		let ImgFigureDOM = ReactDOM.findDOMNode(this.refs.ImgFigure0),
			imgW = ImgFigureDOM.scrollWidth,
			imgH = ImgFigureDOM.scrollHeight,
			halfImgW = Math.ceil(imgW / 2),
			halfImgH = Math.ceil(imgH / 2);

		//计算中心图片的位置点
		this.Constant.centerPos = {
			left: halfStageW - halfImgW,
			top: halfStageH - halfImgH
		}

		//计算左侧，右侧区域图片排布位置的取值范围
		this.Constant.hPosRange.leftSecX[0] = -halfImgW;
		this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
		this.Constant.hPosRange.rightSecX[0] = halfStageW - halfImgW;
		this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
		this.Constant.hPosRange.y[0] = -halfImgH;
		this.Constant.hPosRange.y[1] = stageH - halfImgH;

		//计算上侧区域图片排布位置的取值范围
		this.Constant.vPosRange.topY[0] = -halfImgH;
		this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
		this.Constant.vPosRange.x[0] = halfImgW - imgW;
		this.Constant.vPosRange.x[1] = halfImgW;

		this.rearrange(0);

		//数据打印
		console.log('stageDom', stageDom)
		console.log('ImgFigureDOM', ImgFigureDOM)
		console.log('Constant', this.Constant)
	}

	/*
	 * 重新布局所有图片
	 * @pram Number centerIndex 指定居中排布哪个图片
	 * */
	rearrange(centerIndex) {

	}

    render() {
        let controllerUnits = [],
            imgFigures = [];

        imageDatas.forEach(function(value, index){
            imgFigures.push(<ImgFigure data={value} key={'imgFigures' + index} ref={'ImgFigure' + index} />);

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
