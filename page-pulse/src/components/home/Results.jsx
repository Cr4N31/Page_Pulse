import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Results = ({ result }) => {
    const { score, issues, semanticCount, totalImages, imagesWithAlt, imagesWithoutAlt } = result;

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
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                <h2 className="text-2xl text-red-600 font-bold text-center mb-4">Page Health Scorecard</h2>
                <div className="text-center">
                    <div className="text-4xl md:text-6xl font-bold text-red-600">{score}/100</div>
                    <p className="text-gray-600 mt-2">Overall Score</p>
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6">
                <h3 className="text-xl text-red-600 font-bold mb-4">Score Breakdown</h3>
                <div style={{ height: '300px' }}>
                    <Pie data={data} options={options} />
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
                <h3 className="text-xl text-red-600 font-bold mb-4">Page Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">{semanticCount}</div>
                        <p className="text-gray-600">Semantic Tags</p>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{imagesWithAlt}</div>
                        <p className="text-gray-600">Images with Alt</p>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-600">{imagesWithoutAlt}</div>
                        <p className="text-gray-600">Images without Alt</p>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
                <h3 className="text-xl text-red-600 font-bold mb-4">Issues Found</h3>
                {issues.length > 0 ? (
                    <ul className="list-disc list-inside">
                        {issues.map((issue, index) => (
                            <li key={index} className="text-gray-700">{issue}</li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-700">No issues found</p>
                )}
            </div>
        </div>
    );
};

export default Results;