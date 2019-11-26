<template>
  <div class="tinymce-editor">
    <editor v-model="myValue"
            :init="init"
            :disabled="disabled"
            @onClick="onClick">
    </editor>
  </div>
</template>
<script>
  import tinymce from 'tinymce/tinymce'
  import Editor from '@tinymce/tinymce-vue'
  import 'tinymce/themes/silver'
  // 编辑器插件plugins
  // 更多插件参考：https://www.tiny.cloud/docs/plugins/
  import 'tinymce/plugins/image'// 插入上传图片插件
  //import 'tinymce/plugins/media'// 插入视频插件
  import 'tinymce/plugins/table'// 插入表格插件
  import 'tinymce/plugins/lists'// 列表插件
  //import 'tinymce/plugins/wordcount'// 字数统计插件
  import {upload} from "@/api/api";
  export default {
    components: {
      Editor
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      plugins: {
        type: [String, Array],
        default: 'lists image table'
      },
      toolbar: {
        type: [String, Array],
        default: 'undo redo |  formatselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists image  table | removeformat'
      }
    },
    data () {
      return {
        init: {
          language_url: '/static/tinymce/langs/zh_CN.js',  //public目录下
          language: 'zh_CN',
          skin_url: '/static/tinymce/skins/ui/oxide', //public目录下
          height: 300,
          plugins: this.plugins,  // 父组件传入 或者 填写个默认的插件 要选用什么插件都可以 去官网可以查到
          toolbar: this.toolbar,  // 工具栏 我用到的也就是lists image media table wordcount 这些 根据需求而定
          images_upload_url: '/api/user/img', //上传路径
          // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
          // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler

         // 官网抄的图片上传 项目如果用了vue-resource可以用$http 因为比较懒就没改
          images_upload_handler: (blobInfo, success, failure) => {
                
                let fd = new FormData();
                fd.append('file',blobInfo.blob());

                upload(fd).then(res => {
                    //console.log(res)
                    let result = res.data.data
                    success(result)
                }).catch(err => {

                })
               
           
        
            // var xhr, formData;
            // xhr = new XMLHttpRequest();
            // xhr.withCredentials = false;
            // xhr.open('POST', `${config.webPath}` + "basic/upload/");

            // xhr.onload = function() {
            //   var json;
            //   if (xhr.status != 200) {
            //     failure('HTTP Error: ' + xhr.status);
            //     return;
            //   }
            //   json = JSON.parse(xhr.responseText);

            //   // if (!json || typeof json.img_url != 'string') {
            //   //   failure('Invalid JSON: ' + xhr.responseText);
            //   //   return;
            //   // }
            //   console.log(json)
            //   success(json.img_url);
            // };

            // formData = new FormData();
            // formData.append('file', blobInfo.blob(), blobInfo.filename());
            // console.log('formData', formData)

            // xhr.send(formData);
          }
        },
        myValue: this.value
      }
    },
    mounted () {
      tinymce.init({})
    },
    methods: {
      onClick (e) {
        
         //tinymce.activeEditor.setContent("12312312")
         // console.log(tinymce.activeEditor.getContent())
        //this.$emit('onClick', e, tinymce)
      }
    },
    watch: {
      value (newValue) {
        this.myValue = newValue
      },
      myValue (newValue) {
        this.$emit('input', newValue)
      }
    }
  }

</script>
<style lang="scss">
    .tox .tox-statusbar {
        border-top: none !important;
        .tox-statusbar__text-container{
            display: none !important;
        }
    }
    .tox .tox-mbtn{
        font-size: 13px !important;
    }
</style>