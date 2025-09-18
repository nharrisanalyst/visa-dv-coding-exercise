export const setBarChart=({chart, title, subTitle, data, yAxis,  ordinalAccessor, valueAccessor, height, width, accessibility}) =>{
    chart.mainTitle = title;
    chart.subTitle = subTitle;
    chart.data = data;
    chart.ordinalAccessor=ordinalAccessor;
    chart.valueAccessor = valueAccessor;
    chart.height =height;
    chart.width = width;
    chart.yAxis =yAxis;
    chart.accessibility=accessibility;
}

export const setBarChartData=({chart, data})=>{
    chart.data = data;
}