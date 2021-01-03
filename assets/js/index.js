$(function(){
    getUserInfo()
    // 点击按钮，实现退出功能
    var layer = layui.layer
$('#btnLogout').on('click', function() {
    // 提示用户是否确认退出
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
      //do something
      // 1. 清空本地存储中的 token
      localStorage.removeItem('token')
      // 2. 重新跳转到登录页面
      location.href = '/login.html'
  
      // 关闭 confirm 询问框
      layer.close(index)
    })
  })
})
function getUserInfo(){
    $.ajax({
        method:"GET",
        url: "http://ajax.frontend.itheima.net/my/userinfo",
        headers:{
            Authorization:localStorage.getItem('token') || ''
        },
        success: function (res) {
            if(res.status !== 0){
                return layui.layer.msg('获取用户信息失败')
            }
            //渲染用户的头像
            renderAvater()
        }
    });
}
function renderAvater(user){
    //获取用户的名称
    var name=user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if(user.user_pic !== null){
        //渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').hide()
    }else{
        // 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}


