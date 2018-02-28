/**
 * Created by monk on 2017/12/29.
 */
require('../css/pageOne.scss')
require('../../static/js/flexible.js')


import Vue from '../../../lib/vue.js'
import axios from '../../../lib/axios.js'

var btn = document.getElementById("page-one-click");
btn.onclick = function(){
    alert("pageOne点击了");
}

function initInstance() {
    Vue.filter('format-date', function(date) {
        if(parseInt(date) < 946656000){
            return '暂无此类新信息'
        }else {
            var temp = new Date(parseInt(date));
            return temp.toLocaleString();
        }
    });

    Vue.filter('format-num', function(num) {
        return num > 99 ? '99+' : num;
    });

    var template = '<aside class="dialog"><div class="dialog-mask"></div><div class="dialog-container"><div class="dialog-header"><div class="dialog-title">{{title}}</div><div class="dialog-content">{{content}}</div></div><div class="dialog-button-area"><button class="dialog-button-item dialog-button-retry" @click="clickcallback">确定</button></div></div></aside>';

    Vue.component('mydialog', {
        template: template,
        props: {
            title: String,
            content: String,
            clickcallback: Function
        }
    });

    var vm = new Vue({
        el: "#mi",
        data: {
            groups: [0, 0, 0, 0],
            groupType: ['account', 'device', 'manage', 'income'],
            showDialog: false,
            showContent: "登录已过期，请重新登录",
            showTitle: "登录失效",
            gologin: true
        },
        computed: {
            hasNum: function() {
                var temp = [];
                this.groups.forEach(function(value, index) {
                    temp.push(value.susCount > 0);
                });
                return temp;
            }
        },
        methods: {
            gotoNextPage: function(type, index) {
                vm.$set(vm.groups[index], 'susCount', 0);
                vm.$nextTick(function() {
                    window.location.href = "manageInfoDetail.html?type=" + type;
                });
            },
            goBack: function() {
                window.history.go(-1);
            },
            dialogCallBack: function() {
                this.showDialog = false;
                if (this.gologin) {
                    window.location.href = "../account/login.html";
                }
            }
        },
        created: function() {
            var self = this;
            axios.defaults.headers.post['Content-Type'] = "application/json;charset=utf-8";
            axios({
                url: msgSuspensedUrl,
                method: 'post',
                data: {
                    "t": "msgSus",
                    "grade": "0",
                    "token": Token,
                },
                timeout: 20000,
                transformRequest: [function(data) {
                    // 对 data 进行任意转换处理
                    data = JSON.stringify(data);
                    return data;
                }]
            }).then(function(res) {
                UpdateToken(res);
                var resData = res.data;

                //get message count by group
                if (resData.r === '00000') {
                    vm.groups.forEach(function(value, index) {
                        Vue.set(vm.groups, index, resData.data[vm.groupType[index]]);
                        // 不能通过 索引去改变数组 vue无法检测到这种变化
                        //  vm.groups[index] = parseInt(resData.data['group'+ index].susCount)||0;
                    });
                } else if (resData.r === '20000') {
                    self.showDialog = true;
                } else {
                    alert(resData.msg);
                }

                self.$nextTick(function(){
                    self.$refs.mask.style.display = 'none';
                })
            }).catch(function(error) {
                alert(error);
            });
        },
        mounted: function(){

        }
    });
}