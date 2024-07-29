const ctx = document.getElementById('doughnutChart');

new Chart(ctx, {
    type: 'doughnut',
    data: {
    labels: [
        'Contingency',
        'Investor',
        'Legal & Regulation',
        'Business Development',
        'Poland',
        'Czech Republic',
    ],
    datasets: [{
        label: ['Funding Allocation'],
        data: [70, 30, 20, 20, 15, 50],
        borderWidth: 0,
        backgroundColor: [
        '#E275FF',
        '#8B29A6',
        '#621378',
        '#4A075C',
        '#340142',
        '#1C1D34',
        ],
        hoverOffset: 4
    }],
    },
    options: {
        plugins: {
            legend: {
                display: false
            }
        }
    }
});
