// 水的比热容 SHC
SHC = 4200.0

function get_temp_by_flow(w, trans_factor, flow, h_consumer, l_consumer){
    delta_t = w / (flow * SHC / 3600);
    delta_t_csm = h_consumer - l_consumer;
    // console.log(w, delta_t);
    if (delta_t - delta_t_csm < 0.01) {
        l = w / trans_factor + (h_consumer + l_consumer - delta_t) / 2
        h = l + delta_t
    } 
    else {
        temp = Math.E ** ((delta_t - delta_t_csm) * trans_factor / w);
        l = (temp * l_consumer - h_consumer + delta_t) / (temp - 1);
        h = l + delta_t;
    }
    return [l, h];
}

let Heater = {
    // 硬件常数
    out_factor: 1.2,
    heat_factor: 2,
    trans2_factor: 1000 * 0.003,
    trans1_factor: 1700 * 10000 / 7000000,

    // 输入信息
    in_temp: 22.0, // 一般保持不变
    out_temp: 0.0,

    r2_flow: 2.0,
    r1_flow: 0.5,
    r0_flow: 4000000 / 7000000,

    // 输出信息
    r2_in_temp: 0.0,
    r2_out_temp: 0.0,
    r1_in_temp: 0.0,
    r1_out_temp: 0.0,
    r0_in_temp: 0.0,
    r0_out_temp: 0.0,

    get_w: function(){
        // t = 18 + 0.2 * this.out_temp;
        this.w = (this.in_temp - this.out_temp) * this.out_factor;
    },

    get_r2_temp_by_flow: function(){
        [this.r2_out_temp, this.r2_in_temp] = get_temp_by_flow(this.w, this.heat_factor, this.r2_flow,
                                                             this.in_temp, this.in_temp);
    },

    get_r1_temp_by_flow: function(){
        [this.r1_out_temp, this.r1_in_temp] = get_temp_by_flow(this.w, this.trans2_factor, this.r1_flow,
                                                             this.r2_in_temp, this.r2_out_temp);
    },

    get_r0_temp_by_flow: function(){
        [this.r0_out_temp, this.r0_in_temp] = get_temp_by_flow(this.w, this.trans1_factor, this.r0_flow,
                                                             this.r1_in_temp, this.r1_out_temp);
    },

    update_by_flow: function(){
        this.get_w();
        this.get_r2_temp_by_flow();
        this.get_r1_temp_by_flow();
        this.get_r0_temp_by_flow();
    },

    read_doc: function(){
        elem = document.getElementById('out_temp');
        this.out_temp = elem.value;
        elem = document.getElementById('out_factor');
        this.out_factor = elem.value;
        elem = document.getElementById('in_temp');
        this.in_temp = elem.value;
        elem = document.getElementById('heat_factor');
        this.heat_factor = elem.value;
        elem = document.getElementById('r2_flow');
        this.r2_flow = elem.value;
        elem = document.getElementById('trans2_factor');
        this.trans2_factor = elem.value;
        elem = document.getElementById('r1_flow');
        this.r1_flow = elem.value;
        elem = document.getElementById('trans1_factor');
        this.trans1_factor = elem.value;
        elem = document.getElementById('r0_flow');
        this.r0_flow = elem.value;
    },

    write_doc: function(){
        elem = document.getElementById('r2_in_temp');
        elem.value = Math.floor(this.r2_in_temp * 100) / 100;
        elem = document.getElementById('r2_out_temp');
        elem.value = Math.floor(this.r2_out_temp * 100) / 100;
        elem = document.getElementById('r1_in_temp');
        elem.value = Math.floor(this.r1_in_temp * 100) / 100;
        elem = document.getElementById('r1_out_temp');
        elem.value = Math.floor(this.r1_out_temp * 100) / 100;
        elem = document.getElementById('r0_in_temp');
        elem.value = Math.floor(this.r0_in_temp * 100) / 100;
        elem = document.getElementById('r0_out_temp');
        elem.value = Math.floor(this.r0_out_temp * 100) / 100;
    },
};

document.getElementById("submit").onclick = function (){
    Heater.read_doc();
    Heater.update_by_flow();
    Heater.write_doc();
};

