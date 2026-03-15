import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Results = ({ result }) => {
    const { score, issues } = result;

    // Data for pie chart: score vs remaining
    const data = {
        labels: ['Score', 'Remaining'],
        datasets: [
            {
                data: [score, 100 - score],
                backgroundColor: ['#000000', '#ff0000'],
                hoverBackgroundColor: ['#555555', '#f12828'],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return `${context.label}: ${context.parsed}%`;
                    }
                }
            }
        }
    };

    return (
        <div className="mt-8 w-full max-w-4xl">
            <div className="bg-gradient-to-r from-black/10 via-white/30 to-black/10 backdrop-blur-xl shadow-2xl rounded-lg p-6 mb-6">
                <h2 className="text-2xl text-red-600 font-bold text-center mb-4">Page Health Scorecard</h2>
                <div className="text-center">
                    <div className="text-4xl md:text-6xl font-bold text-red-600">{score}/100</div>
                    <p className="text-black mt-2">Overall Score</p>
                </div>
            </div>

            <div className="bg-gradient-to-r from-black/10 via-white/30 to-black/10 backdrop-blur-xl shadow-2xl rounded-lg p-6">
                <h3 className="text-xl text-red-600 font-bold mb-4">Score Breakdown</h3>
                <div style={{ height: '300px' }}>
                    <Pie data={data} options={options} />
                </div>
            </div>

           {issues.length > 0 ? (
            <div className="bg-gradient-to-r from-black/10 via-white/30 to-black/10 backdrop-blur-xl shadow-2xl rounded-lg p-6 mt-6">
                <h3 className="text-xl text-red-600 font-bold mb-4">Issues Found</h3>
                <ul className="list-disc list-inside">
                    {issues.map((issue, index) => (
                        <li key={index} className="text-gray-700">{issue}</li>
                    ))}
                </ul>
            </div>
                ) : (
                    <p className='text-xl font-bold mb-4'>No issues found</p>
                )}
        </div>
    );
};

export default Results;