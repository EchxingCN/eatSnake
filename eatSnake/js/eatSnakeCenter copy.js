class Snake {
    constructor(id) {
        this.main = $(id);
        this.snakeHead = this.main.find("#snakeHead")//头
        this.snakeBody = this.main.find("#snakeBody")//身
        console.log(this.snakeHead);//img#snakeHead.divHead
        console.log(this);
        console.log(this.main);//div#snk
        this.divMu = this.main.find(".divMu");//结束画面
        this.stratEat = this.main.find("#startEat")//重新开始
        this.startGame = this.main.find(".startGame")//开始游戏
        this.jastStop = this.main.find("#jastStop")//歇息

        this.eats = this.main.find(".eats")//img#sE.eats
        // this.move2()
        //此处this返回了两个结果div#snk、img#snakeHead.divHead
        this.init();
        //隐藏div
        // this.divMu.attr("style", "display:none;");
        //显示div
        // this.divMu.attr("style", "display:block;")
    }
    init() {
        let that = this;
        // this.move("right")
        //开始游戏按键 向右走
        this.startGame.click(function () {
            // console.log(this);
            that.move3("right")
            that.move("right")//头向右
            // that.move2();//身向右
            that.keyDown();
            that.startGame.attr("style", "display:none;");
            console.log("开始");
            return false;
        })

        //歇息按键
        this.jastStop.click(function () {
            location.reload();
            return false;
        })

        //重新开始按键
        this.stratEat.click(function () {
            that.divMu.attr("style", "display:none;");//关闭遮罩层
            $(".divHead").offset({ top: 115 + 4, left: 391 + 150 + 3 });
            that.move("right")
            that.RandomLocation();
            return false;
        })

        this.die();
        this.RandomLocation();//首次食物位置
        setInterval(function () {
            let offSet = that.snakeHead.offset();
            let ol = (offSet.top - 4) / 23
            let ot = ((offSet.left - 150 - 3) / 23)
            // console.log(offSet);
            // console.log(ol);
            // console.log(ot);
            // console.log("x=" + x);
            // console.log("y=" + y);
            if (ot == x & ol == y) {
                console.log("重合");
                that.RandomLocation();
            }
        }, time)

    }

    //判断死亡
    die() {
        let that = this;
        let thatDivMu = this.divMu;
        let sTime = setInterval(function () {
            let offSet = that.snakeHead.offset();
            if (offSet.left <= 150) {
                console.log("出界");
                clearInterval(sI)
                //显示div
                thatDivMu.attr("style", "display:block;")
                // location.reload();//刷新页面
            } else if (offSet.left >= 955) {
                console.log("出界");
                clearInterval(sI)
                thatDivMu.attr("style", "display:block;")
                // location.reload();
            } else if (offSet.top < 4) {
                console.log("出界");
                clearInterval(sI)
                thatDivMu.attr("style", "display:block;")
                // location.reload();
            } else if (offSet.top >= 510) {
                console.log("出界");
                clearInterval(sI)
                thatDivMu.attr("style", "display:block;")
                // location.reload();
            }
        }, time);

    }

    //蛇头移动
    move(el) {
        // n++;
        let offSet = $(".divHead").offset();
        // let offSet = this.divHead.offset();同上
        let unKnown = $(".divHead")//要移动的jq对象
        sI = setInterval(function () {
            switch (el) {
                case "top":
                    // console.log("top");
                    // Listening = 1;
                    unKnown.offset({ top: offSet.top -= 23 });
                    // $(".divBody").offset({ top: offSet.top -= 23 });
                    break;
                case "right":
                    // console.log("right");
                    // Listening = 1;
                    unKnown.offset({ left: offSet.left += 23 });
                    // $(".divBody").offset({ left: offSet.left += 23 });
                    break;
                case "down":
                    // Listening = 1;
                    unKnown.offset({ top: offSet.top += 23 });
                    // $(".divBody").offset({ top: offSet.top += 23 });
                    break;
                case "left":
                    // Listening = 1;
                    unKnown.offset({ left: offSet.left -= 23 });
                    // $(".divBody").offset({ left: offSet.left -= 23 });
                    break;
                default:
                    break;
            }
        }, time)

    }
    // 蛇身移动
    move3(el) {
        let offSet2 = $(".divBody").offset();
        let unKnown2 = $(".divBody")
        sI2 = setInterval(function () {
            switch (el) {
                case "top":
                    unKnown2.offset({ top: offSet2.top -= 23 });
                    break;
                case "right":
                    unKnown2.offset({ left: offSet2.left += 23 });
                    break;
                case "down":
                    unKnown2.offset({ top: offSet2.top += 23 });
                    break;
                case "left":
                    unKnown2.offset({ left: offSet2.left -= 23 });
                    break;
                default:
                    break;
            }
        }, time);
    }

    // 转弯蛇身控制器
    move2(el2) {
        let offSet = $(".divHead").offset();
        // console.log(offSet);
        let offSet2 = $(".divBody").offset();
        let unKnown2 = $(".divBody");
        if (el2 == "down" | el2 == "top") {
            while (offSet2.left < offSet.left | offSet2.left > offSet.left) {
                if (offSet2.left < offSet.left) {
                    //向右走向上下转弯
                    unKnown2.offset({ left: offSet2.left += 23 });
                } else {
                    //向左走向上下转弯
                    unKnown2.offset({ left: offSet2.left -= 23 });
                }
            }
        } else {
            while (offSet2.top < offSet.top | offSet2.top > offSet.top) {
                if (offSet2.top < offSet.top) {
                    //向下走向左右转弯
                    unKnown2.offset({ top: offSet2.top += 23 });
                } else {
                    //向上走向左右转弯
                    unKnown2.offset({ top: offSet2.left -= 23 });
                }
            }
        }
        // 如果left相等或者top相等,body开始转弯
        if (offSet2.left == offSet.left | offSet2.top == offSet.top) {
            clearInterval(sI2);
            this.move3(el2)
        }
    }


    /**
     * 实现方向按键侦听
     */
    keyDown() {
        // console.log(this);
        let that = this;
        // let snk = $(".divHead")
        // console.log(snk);
        var jishuS = 68;//初始向右走
        var jishuE = 0;
        $(document).keydown(function (e) {
            // let offSet = this.snakeHead.offset();
            //不能回头或者重复按键👇
            // e.which == jishuS;
            jishuE = e.which
            if (jishuE == 87 && jishuS == 83) {
                console.log("不能回头");
            } else if (jishuE == 83 && jishuS == 87) {
                console.log("不能回头");
            } else if (jishuE == 65 && jishuS == 68) {
                console.log("不能回头");
            } else if (jishuE == 68 && jishuS == 65) {
                console.log("不能回头");
            } else if (jishuE == jishuS) {
                console.log("重复按键");
            }
            //不能回头或者重复按键👆
            else {
                clearInterval(sI);
                if (e.which == 87) {
                    console.log("你按下了w键");
                    // $(".divHead").offset({ top: $(".divHead").offset().top -= 23 });
                    // el = "top";
                    that.move("top");
                    // that.move2("top");

                } else if (e.which == 65) {
                    console.log("你按下了A键");
                    // $(".divHead").offset({ left: $(".divHead").offset().left -= 23 });
                    // el = "left";
                    that.move("left");
                    // that.move2("left");

                } else if (e.which == 83) {
                    console.log("你按下了S键");
                    // 方案二：下面注释打开，下行注释掉
                    // $(".divHead").offset({ top: $(".divHead").offset().top += 23 });
                    // el = "down";
                    that.move("down");
                    // function a() {
                    // that.move2("down");
                    // }
                    // setTimeout(a, time)


                } else if (e.which == 68) {
                    console.log("你按下了D键");
                    // $(".divHead").offset({ left: $(".divHead").offset().left += 23 });
                    // el = "right";
                    that.move("right");
                    // that.move2("right");
                }
            }

            // if (Listening = 1) {
            jishuS = e.which;
            // }

            // Listening = 0;
        });
    };

    //食物随机位
    RandomLocation() {
        //math对象方法floor(x):对x进行下舍入,即向下取整
        x = Math.floor(Math.random() * 35);//0-34的随机数*23
        y = Math.floor(Math.random() * 22);
        this.eats.css("margin-left", x * 23 + 'px')//x
        this.eats.css("margin-top", y * 23 + 'px')//y
    }
};
var time = 500;//速度
var sI;//蛇头定时器的返回值
var sI2;//蛇身定时器的返回值
var el;//方向
var x = 0;//食物x坐标
var y = 0;//食物y坐标
// var Listening;
// var snakeHeadRoute = new Array[[], []]

let snake = null;
$(function () {
    snake = new Snake("#snk");
});

