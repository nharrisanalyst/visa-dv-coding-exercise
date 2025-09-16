import { select, selectAll } from "d3-selection";

class Treemap{
    constructor({height, width, el}){
        
        this.el = el;
        this.data=null;
        this.margin ={t:20,r:20,l:20,b:20};
        this.height = height - (this.margin.t + this.margin.b);
        this.width = width - (this.margin.l + this.margin.r);
    }
    makeBaseChart(){
        console.log(this.el)
        const chart = select(this.el);
        const svg = chart.append('svg').attr('height', this.height +  (this.margin.t + this.margin.b)).attr('width', this.width +(this.margin.l + this.margin.r))

    }
    joinData(){
        if(this.data){

        }
    }
    render(data){
        this.data = data;
        this.makeBaseChart();
        this.joinData();
    }

    rerender(data){
        this.render(data);
    }
}


export default Treemap;