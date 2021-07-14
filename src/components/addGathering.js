function initAddGatheringVue() {
    let vm = new Vue({
        el: '#addGathering',
        data: {
            BASE_PATH: BASE_PATH,
            showInfo: false,
            customerData: [],
            createdByList: [],
            orderData: [],
            currency:[],
            addDto: {
                orderNo: "",
                financeCollectionNo: "",
                amount: 0,
                gatheringExplain: "",
                customerId: null,
                customerName: null,
                infoData: []
            },
            showHistoryFlag: false,
            addInfoDto: [],
            queryDto:{},
            totalCount: 0,
            simply: true,
            loading: true,
            modifyTravelReasonFlag: true,
            modifyFinanceFlag: true
        },

        created: function () {
            myAjax({
                url: BASE_PATH + "/public/listCurrencies?status=1",
                errorMsg: "初始化币种信息失败",
                callback: function (obj) {
                    vm.currency = obj.data;
                }
            });
        },
        filters: {
            //匹配产品类型
            showCurrency: function (s) {
                let _this = this
                let currencyStatus = vm.currency
                for (let i in currencyStatus) {
                    if(!currencyStatus.hasOwnProperty(i)){
                        continue;
                    }
                    let item = currencyStatus[i];
                    if(item && item.code === s){
                        return item.name;
                    }
                }
            },
            //匹配币种
            showProductType: function(s){
                let _this = this
                let ProductStatus = TMCENUM.getEnum("Product");
                for (let i in ProductStatus) {
                    if(!ProductStatus.hasOwnProperty(i)){
                        continue;
                    }
                    let item = ProductStatus[i];
                    if(item && item.value === s){
                        return item.name;
                    }
                }
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.queryOrder();//查询订单列表信息
                this.initCustomer();//初始化客户信息
            });
        },
        methods: {
            //初始化客户信息
            initCustomer: function () {
                let _this = this;
                myAjax({
                    url: BASE_PATH + "/public/listCustomers",
                    errorMsg: "初始化客户信息失败",
                    callback: function (obj) {
                        _this.customerData = obj.data;
                        hideLoading();
                    }
                });
            },
            //初始化查询条件
            queryOrder: function () {
                let _this = this;
                _this.queryDto.totalCount = 0;
                _this.queryDto.currentPage = 1;
                _this.queryDto.pageSize = 5;
                _this.ajaxqueryOrders();
            },
            //查询订单列表信息
            ajaxqueryOrders: function () {
                let _this = this;
                _this.loading = true;
                showLoading();
                let settings = {
                    url: BASE_PATH + "/gatheringOrder/orderQuery",
                    data: vm.queryDto,
                    isJson: true,
                    callback: function (obj) {
                        let pg = obj.pg;
                        if (pg) {
                            _this.orderData = pg.data;
                            _this.totalCount = pg.totalCount;
                            _this.loading = false;
                        }
                        hideLoading();
                    },
                    errorCallback: function (obj) {
                        hideLoading();
                        _this.$message.error("查询订单失败");
                    }
                };
                myAjax(settings);
            },
            //将勾选的订单数据传入收款订单
            saveButton: function () {
                let selections = this.$refs.multipleTable.selection;
                let state = 0;
                let comparison = [];
                selections.forEach((selection, i) => {
                    if(comparison !==null && comparison.length > 0 ){
                        let compare = comparison[0]
                        if(comparison[0].customerName !== selections[i].customerName){
                            this.$message.error("客户名称必须一致");
                            return;
                        }
                        if(comparison[0].receivableCurrency !== selections[i].receivableCurrency){
                            this.$message.error("币种必须一致");
                            return;
                        }
                    }else{
                        comparison.push(selections[i]);
                    }
                })
                for(let i = 0; i < selections.length;i++){
                    
                }
                //求并集
                let union = [...this.addInfoDto, ...selections]
                for (let i = 0, len = this.addInfoDto.length; i < len; i++ ) {
                    for (let j = 0, length = selections.length; j < length; j++) {
                        if (this.addInfoDto[i].orderNo === selections[j].orderNo) {
                            union.splice(union.findIndex(item => item.ID === this.addInfoDto[i].ID), 1)
                        }
                    }
                }
                for(;selections.length!==0;) {
                    selections.shift();
                }
                this.addInfoDto = union;
                vm.showInfo = false;
            },
            //数据求和
            calcTotal: function (field) {
                let _this = this;
                let total = 0;
                if(_this.addInfoDto){
                    for(let i = 0; i<_this.addInfoDto.length; i++) {
                        let row = _this.addInfoDto[i];
                        let totalPrice = 0;
                        let totalCost = 0;
                        for (let k in row) {
                            if (k === field) {
                                let val = row[k];
                                total += val ? val * 1 : 0;
                            }
                        }
                    }
                }
                return total;
            },
            handleSizeChange: function (val) {
                this.queryDto.pageSize = val;
                this.ajaxqueryOrders();
            },
            handleCurrentChange: function (val) {
                this.queryDto.currentPage = val;
                this.ajaxqueryOrders();
            },
            //删除收款订单
            del: function (index) {
                this.addInfoDto.splice(index, 1);
            },
            //返回 关闭当前页
            close:function(){
                window.location.href="about:blank";
                window.close();
            },
            //展开 订单列表
            showOrder:function(){
                let _this = this;
                _this.queryDto.customerId = _this.addDto.customerId;
                if(vm.addDto.customerId === null ){
                    _this.$message.error("请先选择客户名称！");
                    return;
                }
                _this.ajaxqueryOrders();
                _this.showInfo = true;
            },
            //提交新增收款单
            addSubmit:function(){
                let _this = this;
                if(vm.addDto.customerId === null ){
                    _this.$message.error("请选择客户名称！");
                    return;
                }
                if(vm.addDto.financeCollectionNo === null){
                    _this.$message.error("请填写财务收款单号！");
                    return;
                }
                if(parseFloat(vm.addDto.amount) === parseFloat("0")){
                    _this.$message.error("请填写财务收款金额！");
                    return;
                }
                if(vm.addInfoDto.length === 0 ){
                    _this.$message.error("请添加订单！");
                    return;
                }
                for(let i = 0; i < vm.addInfoDto.length;i++){
                    let number = i+1;
                    let product = vm.addInfoDto[i].receivableOwing * 1 * vm.addInfoDto[i].payIncome;
                    if(product < 0){
                        _this.$message.error("第"+number+"条数据入账金额有误！");
                        return;
                    }
                    let absoluteReceivableOwing = Math.abs(vm.addInfoDto[i].receivableOwing * 1);
                    let absolutePayIncome = Math.abs(vm.addInfoDto[i].payIncome * 1);
                    if(absoluteReceivableOwing < absolutePayIncome ){
                        _this.$message.error("第"+number+"条数据入账金额有误！");
                        return;
                    }

                }
                let payIncomeTotal = parseFloat(this.calcTotal("payIncome")+"");

                if(payIncomeTotal !== parseFloat(vm.addDto.amount)){
                    _this.$message.error("财务收款金额需等于入账金额总和！");
                    return;
                }
                vm.addDto.infoData = vm.addInfoDto;
                console.log(vm.addDto);
            },

        },
        computed: {
            defaultAddInfoDto: function () {
                return this.addInfoDto.map(info => ({...info, payIncome: info.receivableOwing}) ) || []
            }
        }
    });
}