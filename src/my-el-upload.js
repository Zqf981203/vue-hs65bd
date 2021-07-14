/**
 *
 *
 */

Vue.component('my-el-upload', {
    props: {
        // 自定义class
        uploadclass: {
            type: String
        },
        orderno: {
            type: String
        }
    },
    data: function () {
        return {
            fileList:[],
            url:BASE_PATH +"/public/attachment/upload/"
        }
    },
    template: '<el-upload\
                    class="uploadclass"\
                    :action="url"\
                    :on-preview="handlePreview"\
                    :data="{orderNo: orderno}"\
                    :on-success="handleAvatarSuccess"\
                    :on-remove="handleRemove"\
                    :file-list="fileList">\
                        <el-button size="small" type="primary">点击上传</el-button>\
                    </el-upload>',
    mounted:function(){
        this.init();
    },
    methods: {
        init:function(){
            var _this = this;
            _this.isshow = false;
            var url = BASE_PATH + "/public/attachment/uploaList?orderNo=" + _this.orderno;
            var settings = {
                url: url,
                isJson: false,
                callback: function (obj) {
                    var fileLists = obj.data;
                    for(var i = 0 ; i < fileLists.length;i++){
                        var file = fileLists[i];
                        file.name =  file.oldName;
                        _this.fileList.push(file);
                    }
                },
                errorCallback: function (obj) {
                    errorMessage("初始化失败！");
                }
            };
            myAjax(settings);
        },
        handleAvatarSuccess:function(res, file){
            var ids= res;
            file.id = ids[0];
        },
        handleRemove:function(file, fileList) {
            var _this = this;
            _this.isshow = false;
            var url = BASE_PATH + "/public/attachment/delete?id=" + file.id;
            var settings = {
                url: url,
                isJson: false,
                callback: function (obj) {
                    successMessage("删除文件成功！");
                },
                errorCallback: function (obj) {
                   return;
                }
            };
            myAjax(settings);
        },
        handlePreview:function(file) {
            var url = BASE_PATH +"/public/downloadFile?downloadUrl="+file.url +"&realFileName="+file.name;
            window.location.href =url;
        }
    }
});