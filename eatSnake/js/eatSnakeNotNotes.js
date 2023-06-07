class Snake {
    constructor(id) {
        this.main = $(id);
        this.snakeHead = this.main.find("#snakeHead")//头
        this.snakeBody = this.main.find("#snakeBody")//身
        this.divMu = this.main.find(".divMu");//结束画面
        this.stratEat = this.main.find("#startEat")//重新开始
        this.startGame = this.main.find(".startGame")//开始游戏
        this.jastStop = this.main.find("#jastStop")//歇息
        this.eats = this.main.find(".eats")//img#sE.eats
        this.init();
    }
    init() {
        let that = this;
        //开始游戏按键 向右走
        this.startGame.click(function () {
            that.move();
            that.move3();
            el3 = el = "right"
            that.keyDown();
            that.startGame.attr("style", "display:none;");
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
            $(".divBody").offset({ top: 115 + 4, left: 391 + 150 + 3 - 23 })
            that.move();
            that.move3();
            el3 = el = "right"
            that.RandomLocation();
            return false;
        })

        this.die();
        this.RandomLocation();//首次食物位置
        setInterval(function () {
            let offSet = that.snakeHead.offset();
            let ol = (offSet.top - 4) / 23
            let ot = ((offSet.left - 150 - 3) / 23)
            if (ot == x & ol == y) {
                that.RandomLocation();
            }
        }, time)

    }

    //判断死亡
    die() {
        let that = this;
        let thatDivMu = this.divMu;
        setInterval(function () {
            let offSet = that.snakeHead.offset();
            if (offSet.left <= 150) {
                clearInterval(sI)
                clearInterval(sI2)
                thatDivMu.attr("style", "display:block;")
            } else if (offSet.left >= 955) {
                clearInterval(sI)
                clearInterval(sI2)
                thatDivMu.attr("style", "display:block;")
            } else if (offSet.top < 4) {
                clearInterval(sI)
                clearInterval(sI2)
                thatDivMu.attr("style", "display:block;")
            } else if (offSet.top >= 510) {
                clearInterval(sI)
                clearInterval(sI2)
                thatDivMu.attr("style", "display:block;")
            }
        }, time);

    }

    //蛇头移动
    move() {
        let offSet = $(".divHead").offset();
        let unKnown = $(".divHead")//要移动的jq对象
        sI = setInterval(function () {
            switch (el) {
                case "top":
                    unKnown.offset({ top: offSet.top -= 23 });
                    break;
                case "right":
                    unKnown.offset({ left: offSet.left += 23 });
                    break;
                case "down":
                    unKnown.offset({ top: offSet.top += 23 });
                    break;
                case "left":
                    unKnown.offset({ left: offSet.left -= 23 });
                    break;
                default:
                    break;
            }
        }, time)
    }
    // 蛇身移动
    move3() {
        let offSet2 = $(".divBody").offset();
        let unKnown2 = $(".divBody")
        sI2 = setInterval(function () {
            switch (el3) {
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
    move2() {
        let offSet = $(".divHead").offset();
        let offSet2 = $(".divBody").offset();
        // 如果left相等或者top相等,body开始转弯
        function a() {
            if (offSet2.left == offSet.left | offSet2.top == offSet.top) {
                el3 = el;
            }
        }
        setTimeout(a, time)//晚一步判断offSet2.left == offSet.left | offSet2.top == offSet.top
    }

    //实现方向按键侦听
    keyDown() {
        let that = this;
        var jishuS = 68;//初始向右走
        var jishuE = 0;
        $(document).keydown(function (e) {
            //不能回头或者重复按键👇
            jishuE = e.which
            if (jishuE == 87 && jishuS == 83) {
            } else if (jishuE == 83 && jishuS == 87) {
            } else if (jishuE == 65 && jishuS == 68) {
            } else if (jishuE == 68 && jishuS == 65) {
            } else if (jishuE == jishuS) {
            }
            //不能回头或者重复按键👆
            else {
                if (e.which == 87) {
                    el = "top";
                    that.move2("top");
                } else if (e.which == 65) {
                    el = "left";
                    that.move2("left");
                } else if (e.which == 83) {
                    el = "down";
                    that.move2("down");
                } else if (e.which == 68) {
                    el = "right";
                    that.move2("right");
                }
            }
            jishuS = e.which;
        });
    };
    //食物随机位
    RandomLocation() {
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
var el3;
var x = 0;//食物x坐标
var y = 0;//食物y坐标
let snake = null;
$(function () {
    snake = new Snake("#snk");
});

