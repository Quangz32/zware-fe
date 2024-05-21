import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js';
import './Home.css';

// Register the necessary components
Chart.register(PieController, ArcElement, Tooltip, Legend);

const Home = () => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null); 

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');
        const totalItems = 13242;
        const exportedItems = 3145;
        const importedItems = 1234;

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy(); // Destroy existing chart instance if exists
        }

        chartInstanceRef.current = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Hàng xuất', 'Hàng nhập', 'Tổng số hàng còn lại'],
                datasets: [{
                    data: [exportedItems, importedItems, totalItems - exportedItems - importedItems],
                    backgroundColor: ['#6f42c1', '#20c997', '#ffc107'],
                    borderColor: ['#6f42c1', '#20c997', '#ffc107'],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy(); // Cleanup the chart instance on component unmount
            }
        };
    }, []);

    return (
        <div className="container my-5">
            <div className="row text-center mb-4">
                <div className="col-md-4">
                    <div className="card p-3 shadow-sm">
                        <h2 id="totalItems" className="fw-bold">13242</h2>
                        <p className="mb-1">Tổng số hàng</p>
                        <span className="text-danger">icon</span>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card p-3 shadow-sm">
                        <h2 id="exportedItems" className="fw-bold">3145</h2>
                        <p className="mb-1">Xuất hàng</p>
                        <span className="text-danger">icon</span>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card p-3 shadow-sm">
                        <h2 id="importedItems" className="fw-bold">1234</h2>
                        <p className="mb-1">Nhập hàng</p>
                        <span className="text-danger">icon</span>
                    </div>
                </div>
            </div>

            <div className="card p-4 shadow-sm">
                <h5 className="card-title">Thống kê hàng hóa</h5>
                <div className="chart-limit">
                    <canvas id="visitorChart" ref={chartRef}></canvas>
                </div>
            </div>
        </div>
    );
}

export default Home