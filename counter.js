new Vue({
    el: '#app',
    data: {
        equation: '0',
        isDecimalAdded: false,
        isOperatorAdded: false,
        isStarted: false,
    },
    methods: {
        // 判断运算按钮
        isOperator(character) {
            return ['+', '-', '*', '/'].indexOf(character) > -1
        },
        // 点击操作符或数字时
        append(character) {
            // 第一组判断：
            // 1、判断一开始输入的是数字不是运算符号 且 this.equation === '0'
            // 更新this.equation的值
            // 2、如果第一个输入的是小数点符号，保留原来的 this.equation === '0'，
            // 并且在0后面增加小数点符号，最后将 isDecimalAdded 设定为 true
            // 如果不是的话，将 this.equation === '0' 替换成字符串类型的数字

            if (this.equation === '0' &&
                !this.isOperator(character)) {
                if (character === '.') {
                    this.equation += '' + character
                    this.isDecimalAdded = true
                } else {
                    // 将其转化成String
                    this.equation = '' + character
                }

                this.isStarted = true
                return
                // 不再继续这个函数的后续操作
            }

            // 第二组判断：
            // 1、一开始输入的数数字时,!this.isOperator(character) = false
            // 判断小数点符号是否点击超过一次，设置小数点符号只能点击一次
            // 2、将点击按钮传入的数字的值串联成一个字符串

            if (!this.isOperator(character)) {
                if (character === '.' && this.isDecimalAdded) {
                    return
                }
                if (character === '.') {
                    this.isDecimalAdded = true
                    this.isOperatorAdded = true
                } else {
                    this.isOperatorAdded = false
                }
                this.equation += '' + character
            }

            // 第三组判断：
            // 1、输入符号时，将运算符号加入 this.equation 中
            // 2、设定不能多次连续输入运算符
            // 3、避免输输入小数点符号后直接输入运算符号
            if (this.isOperator(character) && !this.isOperatorAdded) {
                this.equation += '' + character
                this.isDecimalAdded = false
                this.isOperatorAdded = true
            }
        },
        // 点击等于符号时
        // 1、 显示运算结果， 九位数
        // 
        calculate() {
            let result = this.equation.replace(new RegExp('x', 'g'), '*').replace(new RegExp('÷', 'g'),
                '/')
            this.equation = parseFloat(eval(result).toFixed(9)).toString()
            this.isDecimalAdded = false
            this.isOperatorAdded = false
        },
        // 点击正负符号时
        calculateToggle() {
            if (this.isOperatorAdded || !this.isStarted) {
                return
            }

            this.equation = this.equation + ' * -1'
            this.calculate()
        },
        // 点击百分比符号时
        calculatePercentage() {
            if (this.isOperatorAdded || !this.isStarted) {
                return
            }

            this.equation = this.equation + '* 0.01'
            this.calculate()

        },
        // 点击AC符号时，清除操作
        clear() {
            this.equation = '0'
            this.isDecimalAdded = false
            this.isOperatorAdded = false
            this.isStarted = false
        },
    }
})