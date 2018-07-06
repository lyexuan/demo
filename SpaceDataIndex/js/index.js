//基于准备好的dom，初始化echarts实例
var chart1 = echarts.init(document.getElementById('chart1'));

// 指定图表的配置项和数据
var option1 = {
    legend: {
        orient: 'vertical',
        right: 10,
        textStyle: {
          color: '#fff'
        },
        data:['近期更新','即将过期','已过期']
    },
    series: [
        {
            name:'访问来源',
            type:'pie',
            radius: ['50%', '70%'],
            center: ['40%', '50%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '16'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data:[
                {value:335, name:'近期更新'},
                {value:310, name:'即将过期'},
                {value:234, name:'已过期'}
            ]
        }
    ],
    color: ["#43d3ff", "#ecc200", "#ed5655"]
};


// 使用刚指定的配置项和数据显示图表。
chart1.setOption(option1);

window.onresize = function(){
  chart1.resize();
};