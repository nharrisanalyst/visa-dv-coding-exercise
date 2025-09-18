import { select, selectAll } from "d3-selection";
import { treemap, hierarchy,treemapSquarify,} from "d3-hierarchy";
import { scaleOrdinal } from "d3-scale";
import { schemePaired } from "d3-scale-chromatic";
import { format } from 'd3-format'

class Treemap{
    constructor({height, width, el,cats}){
        
        this.el = el;
        this.data=null;
        this.margin ={t:20,r:20,l:20,b:20};
        this.height = height - (this.margin.t + this.margin.b);
        this.width = width - (this.margin.l + this.margin.r);
        this.cats = cats;
        this.makeBaseChart();
    }
    makeBaseChart(){
        const chart = select(this.el);
        this.svg = chart.append('svg').attr("viewBox", [0, 0, this.width, this.height])
                                      .attr('height', this.height +  (this.margin.t + this.margin.b))
                                      .attr('width', this.width +(this.margin.l + this.margin.r))
                                      .attr("style", "max-width: 100%; height: auto;");

        this.mainG = this.svg.append('g');
    }
    makeTreeData(){
        if(this.data){
            this.layout = treemap().tile(treemapSquarify)
                                .size([this.width,this.height])
                                .padding(1)
                                .round(true)(
                                    hierarchy(this.data).sum(d => d.value)
                                                        .sort((a, b) => b.value - a.value))

        }
    }
    makeColorScale(){
        this.color = scaleOrdinal(this.cats, schemePaired(11))
    }
    makeLegend(){
        this.legend = select('#tree-legend').selectAll('span').data(this.color.domain()).join('span')
        .html(d=>`<div class="legend-div" style="background-color:${this.color(d)};"></div> ${d}`)
    }
    joinData(){
        if(this.data){
           const leaves = this.mainG.selectAll('g').data(this.layout.leaves()).join('g').attr('transform', d=>`translate(${d.x0},${d.y0})`);
            leaves.append("rect")
                .attr("fill", d => {if (d.depth > 1) d = d.parent;  return this.color(d.data.name); })
                .attr("fill-opacity", 0.6)
                .attr("width", d => d.x1 - d.x0)
                .attr("height", d => d.y1 - d.y0);
                
                leaves.append("text")
                    .selectAll("tspan")
                    .data(d => d.data.name.split(/(?=[A-Z][a-z])|\s+/g).concat(format(",d")(d.value)))
                    .join("tspan")
                    .attr("x", 3)
                    .attr("y", (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`)
                    .attr("fill-opacity", (d, i, nodes) => i === nodes.length - 1 ? 0.7 : null)
                    .text(d => d);
        }
    }
    render({data}){
        this.data = data;
        this.mainG.selectAll('g').remove();
        this.makeTreeData();
        this.makeColorScale();
        this.makeLegend();
        this.joinData();
    }

    rerender(data){
        this.render(data);
    }
}


export default Treemap;