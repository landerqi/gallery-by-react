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

/**
 * 获取区间内的一个随机值
 * @param {number} low
 * @param {number} heigt
 * @returns {number}
 */
function getRangeRandom(low, high) {
	return Math.ceil(Math.random() * (high - low) + low);
}


/**
 * 获取一个0-30度之间的正负值
 * @returns {number}
 */
function get30DegRandom() {
	return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30));
}


class ImgFigure extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.handleClick = this.handleClick.bind(this);
	}
	
	
	/**
	 * imgFigure的点击处理函数
	 * @param {any} e
	 * @memberOf ImgFigure
	 */
	handleClick(e) {
		this.props.inverse();

		e.stopPropagation();
		e.preventDefault();
	}
    render() {
		let styleObj = {};

		//如果props属性中指定了这张图片的位置，则使用
		if(this.props.arrage.pos) {
			styleObj = this.props.arrage.pos;
		}

		//如果图片旋转角度有值并且不为0, 添加旋转角度
		if(this.props.arrage.rotate) {
			// (['-moz-', '-ms-', '-webkit-', '']).forEach(function(value) {
			// 	styleObj[value + 'transform'] = 'rotate(' + this.props.arrage.rotate + 'deg)';
			// }.bind(this));
			styleObj['transform'] = 'rotate(' + this.props.arrage.rotate + 'deg)';
		}

		let ImgFigureClassName = 'img-figure';
		ImgFigureClassName += this.props.arrage.isInverse ? ' is-inverse' : '';

        return (
            <figure className ={ImgFigureClassName} style={styleObj} onClick={this.handleClick}>
                <img className = "img-little"
                     src = {this.props.data.imageURL}
                     alt = {this.props.data.title}
                />
                <figcaption>
                    <h2 className ="img-title">{this.props.data.title}</h2>
					<div className="img-back" onClick={this.handleClick}>
						<p>
							{this.props.data.desc}
						</p>
					</div>
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

		this.state = {
			imgsArrangeArr: [
				// {
				// 	pos: {
				// 		left: '0',
				// 		top: '0'
				// 	}
				//  rotate: 0,    旋转角度
				//  isInverse: false    图片正反面
				// }
			]
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
		this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
		this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
		this.Constant.hPosRange.y[0] = -halfImgH;
		this.Constant.hPosRange.y[1] = stageH - halfImgH;

		//计算上侧区域图片排布位置的取值范围
		this.Constant.vPosRange.topY[0] = -halfImgH;
		this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
		this.Constant.vPosRange.x[0] = halfStageW - imgW;
		this.Constant.vPosRange.x[1] = halfStageW;

		this.rearrange(0);

		//数据打印
		console.log('stageDom', stageDom)
		console.log('ImgFigureDOM', ImgFigureDOM)
		console.log('Constant', this.Constant)
	}


	/**
	 * 翻转图片
	 * @param {number} index 输入当前被执行inserve操作的图片对应的图片信息数组的index值
	 * @return {function} 这是一个闭包函数，其内return 一个真正待被执行的函数
	 * @memberOf AppComponent
	 */
	inverse(index) {
		return () => {
			let imgsArrangArr = this.state.imgsArrangeArr;
			imgsArrangArr[index].isInverse = !imgsArrangArr[index].isInverse;
			this.setState({
				imgsArrangeArr: imgsArrangArr
			})
		}
		// return function() {
		// 	let imgsArrangeArr = this.state.imgsArrangeArr;
		// 	imgsArrangeArr[index].isInverse = !imgsArrangeArr[index];
		// 	this.setState({
		// 		imgsArrangeArr: imgsArrangeArr
		// 	});
		// }.bind(this);
	}

	/*
	 * 重新布局所有图片
	 * @pram Number centerIndex 指定居中排布哪个图片
	 * @memberOf AppComponent
	 * */
	rearrange(centerIndex) {
		let imgsArrangeArr = this.state.imgsArrangeArr,
			Constant = this.Constant,
			centerPos = Constant.centerPos,
			hPosRange = Constant.hPosRange,
			vPosRange = Constant.vPosRange,
			hPosRangeLeftSecX = hPosRange.leftSecX,
			hPosRangeRigthSecx = hPosRange.rightSecX,
			hPosRangeY = hPosRange.y,
			vPosRangeTopY = vPosRange.topY,
			vPosRangeX = vPosRange.x,

			imgsArrangeTopArr = [],
			topImgNum = Math.floor(Math.random() * 2), //取一个则者不取
			topImgSpliceIndex = 0,

			imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

			//首先居中 centerIndex 的图片
			imgsArrangeCenterArr[0].pos = centerPos;

			//居中的 centerIndex 图片不需要旋转
			imgsArrangeCenterArr[0].rotate = 0;

			//取出要布局上侧图片的状态信息
			topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));
			imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

			console.log('imgsArrangeTopArr', imgsArrangeTopArr);
			console.log('imgsArrangeTopArr', topImgNum);

			//布局上侧图片
			imgsArrangeTopArr.forEach(function(value, index) {
				imgsArrangeTopArr[index] = {
					pos: {
						top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
						left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
					},
					rotate: get30DegRandom()
				}
			});

			//布局两侧图片状态信息
			for(let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
				let hPosRangeLORX = null;

				//前半部分布局左边，右半部分布局右边
				if (i < k) {
					hPosRangeLORX = hPosRangeLeftSecX;
				} else {
					hPosRangeLORX = hPosRangeRigthSecx;
				}

				imgsArrangeArr[i] = {
					pos: {
						top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
						left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
					},
					rotate: get30DegRandom()
				}
			}

			//把取出来用于上侧的图片塞回imgsArrangArr
			if(imgsArrangeTopArr && imgsArrangeTopArr[0]) {
				imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
			}
			//把取出来用于中心的图片塞回imgsArrangArr
			imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

			this.setState({
				imgsArrangeArr: imgsArrangeArr
			});

			console.log('存储所有图片的壮态信息', imgsArrangeArr);

	}

    render() {
        let controllerUnits = [],
            imgFigures = [];

        imageDatas.forEach(function(value, index){
			if(!this.state.imgsArrangeArr[index]) {
				this.state.imgsArrangeArr[index] = {
					pos: {
						left: 0,
						top: 0
					},
					rotate: 0,
					isInverse: false
				}
			}
            imgFigures.push(<ImgFigure data={value} key={'imgFigures' + index} ref={'ImgFigure' + index} arrage={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)}/>);
        }.bind(this));

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
