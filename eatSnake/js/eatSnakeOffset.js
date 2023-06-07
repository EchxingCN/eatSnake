//10.23,offset实现头部移动以及转向;食物随机生成(半成品);吃掉食物
//animate动画方式过程复杂，问题多，易出bug，pass
class Snake {
    constructor(id) {
        this.main = $(id);
        this.snakeHead = this.main.find("#snakeHead")
        console.log(this.snakeHead);//img#snakeHead.divHead
        console.log(this);
        console.log(this.main);//div#snk
        this.divMu = this.main.find(".divMu");//结束画面
        this.stratEat = this.main.find("#startEat")//重新开始
        this.startGame = this.main.find(".startGame")//开始游戏
        this.jastStop = this.main.find("#jastStop")//歇息

        this.eats = this.main.find(".eats")//img#sE.eats

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
            that.move("right")
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
            console.log(offSet);
            console.log(ol);
            console.log(ot);
            console.log("x=" + x);
            console.log("y=" + y);
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

    //snake移动
    move(el) {
        // n++;
        let offSet = this.snakeHead.offset();
        sI = setInterval(function () {
            switch (el) {
                case "top":
                    $(".divHead").offset({ top: offSet.top -= 23 });
                    break;
                case "right":
                    $(".divHead").offset({ left: offSet.left += 23 });
                    break;
                case "down":
                    $(".divHead").offset({ top: offSet.top += 23 });
                    break;
                case "left":
                    $(".divHead").offset({ left: offSet.left -= 23 });
                    break;
                default:
                    break;
            }
        }, time)
    }

    //实现方向按键侦听
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
            e.which == jishuS;
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
            // else if(offSet.left==){}
            //不能回头或者重复按键👆
            else {
                clearInterval(sI);
                if (e.which == 87) {
                    console.log("你按下了w键");
                    let el = "top";
                    that.move(el);

                } else if (e.which == 65) {
                    console.log("你按下了A键");
                    let el = "left";
                    that.move(el);

                } else if (e.which == 83) {
                    console.log("你按下了S键");
                    let el = "down";
                    that.move(el);

                } else if (e.which == 68) {
                    console.log("你按下了D键");
                    let el = "right";
                    that.move(el);
                }
            }
            // let sT = setInterval(function () {
            jishuS = e.which;
            // }, 700)

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
var time = 700;//速度
var sI;
var x = 0;//食物x坐标
var y = 0;//食物y坐标

var snakeHeadRoute = new Array[[], []]

let snake = null;
$(function () {
    snake = new Snake("#snk");
});

