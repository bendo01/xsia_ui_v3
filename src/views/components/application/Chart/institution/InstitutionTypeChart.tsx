import type { Component } from "solid-js";
import { onMount, createEffect, onCleanup } from "solid-js";
import * as echarts from "echarts";
import { theme } from "../../../../../lib/theme";
import macarons from "../themes/macarons.json";
import purple_passion from "../themes/purple-passion.json";

const InstitutionTypeChart: Component = () => {
    let chartRef!: HTMLDivElement;
    let chartInstance: echarts.ECharts | null = null; // Store chart instance

    // Register themes on mount
    onMount(() => {
        echarts.registerTheme("macarons", macarons);
        echarts.registerTheme("purple_passion", purple_passion);
    });

    // Effect to handle chart initialization and theme updates
    createEffect(() => {
        if (!chartRef) return;

        // Determine the theme based on the global theme signal
        const selectedTheme = theme() === "dark" ? "purple_passion" : "macarons";

        // Destroy previous instance if it exists
        if (chartInstance) {
            chartInstance.dispose();
        }

        // Initialize the chart with the selected theme
        chartInstance = echarts.init(chartRef, selectedTheme);
        chartInstance.setOption({
            title: {
                text: 'Kriteria UMKM'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    // Use axis to trigger tooltip
                    type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
                }
            },
            legend: {},
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value'
            },
            yAxis: {
                type: 'category',
                data: ['2021', '2022', '2022', '2023', '2024', '2024', '2025']
            },
            series: [
                {
                    name: 'Usaha Mikro',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [320, 302, 301, 334, 390, 330, 320]
                },
                {
                    name: 'Usaha Kecil',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [120, 132, 101, 134, 90, 230, 210]
                },
                {
                    name: 'Usaha Menengah',
                    type: 'bar',
                    stack: 'total',
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'series'
                    },
                    data: [220, 182, 191, 234, 290, 330, 310]
                }
            ]
        });

        // Resize event listener
        window.addEventListener("resize", () => chartInstance?.resize());

        // Cleanup function to dispose of chart instance when component unmounts
        onCleanup(() => {
            window.removeEventListener("resize", () => chartInstance?.resize());
            chartInstance?.dispose();
        });
    });

    return <div ref={chartRef} class="h-full w-full" />;
};

export default InstitutionTypeChart;
