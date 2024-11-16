#!/usr/bin/python3

import math

# 水的比热容 SHC
SHC = 4200.0

def get_temp_by_flow(w, trans_factor, flow, h_consumer, l_consumer):
    delta_t = w / (flow * SHC / 3600)
    delta_t_csm = h_consumer - l_consumer
    print(w, delta_t, delta_t_csm)
    if delta_t - delta_t_csm < 0.01:
        l = w / trans_factor + (h_consumer + l_consumer - delta_t) / 2
        h = l + delta_t
    else:
        temp = math.e ** ((delta_t - delta_t_csm) * trans_factor / w)
        l = (temp * l_consumer + delta_t - h_consumer) / (temp - 1)
        h = l + delta_t
    return l, h

class Heater(object):
    """docstring for Heater."""
    def __init__(self):
        super(Heater, self).__init__()
        # 硬件常数
        self.out_factor = 1.3
        self.heater_factor = 2
        self.trans2_factor = 1000 * 0.003
        self.trans1_factor = 1700 * 10000 / 6500000

        # 输入信息
        self.in_temp = 22.0 # 一般保持不变
        self.out_temp = 0.0

        self.r2_flow = 2.0
        self.r1_flow = 0.5
        self.r0_flow = 4000000 / 7000000

        # 输出信息
        self.r2_in_temp = 0.0
        self.r2_out_temp = 0.0
        self.r1_in_temp = 0.0
        self.r1_out_temp = 0.0
        self.r0_in_temp = 0.0
        self.r0_out_temp = 0.0

    def get_w(self):
        t = 18 + 0.2 * self.out_temp
        self.w = (t - self.out_temp) * self.out_factor

    def get_r2_temp_by_flow(self):
        self.r2_out_temp, self.r2_in_temp = get_temp_by_flow(self.w, self.heater_factor, self.r2_flow,
                                                             self.in_temp, self.in_temp)

    def get_r1_temp_by_flow(self):
        self.r1_out_temp, self.r1_in_temp = get_temp_by_flow(self.w, self.trans2_factor, self.r1_flow,
                                                             self.r2_in_temp, self.r2_out_temp)

    def get_r0_temp_by_flow(self):
        self.r0_out_temp, self.r0_in_temp = get_temp_by_flow(self.w, self.trans1_factor, self.r0_flow,
                                                             self.r1_in_temp, self.r1_out_temp)

    def display(self):
        print('当前温度条件为：室外{:.2f}ºC, 目标室温{:.2f}ºC'.format(self.out_temp, self.in_temp))
        print('当前流量条件为：二网{:.2f}, 一网{:.2f}, 零网{:.2f}'.format(self.r2_flow, self.r1_flow, self.r0_flow))
        print('----------计算结果如下：------------')
        print('预计二网高温：{:.2f}ºC, 低温：{:.2f}ºC'.format(self.r2_in_temp, self.r2_out_temp))
        print('预计一网高温：{:.2f}ºC, 低温：{:.2f}ºC'.format(self.r1_in_temp, self.r1_out_temp))
        print('预计零网高温：{:.2f}ºC, 低温：{:.2f}ºC'.format(self.r0_in_temp, self.r0_out_temp))

    def update_by_flow(self):
        self.get_w()
        self.get_r2_temp_by_flow()
        self.get_r1_temp_by_flow()
        self.get_r0_temp_by_flow()

def main():
    out_temp = float(input('请输入室外温度：'))
    h = Heater()
    h.out_temp = out_temp
    h.update_by_flow()
    h.display()


if __name__ == '__main__':
    main()

