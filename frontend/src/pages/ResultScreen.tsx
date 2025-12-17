import React from 'react';
import PageWrapper from '../components/layout/PageWrapper';
import Card from '../components/ui/Card';

const ResultScreen: React.FC = () => {
  return (
    <PageWrapper>
      <Card>
        <h2 className="text-xl font-bold">Results</h2>
        <p className="text-sm text-gray-500">Winner: Placeholder 🎉</p>
        <div className="mt-3">
          <table className="w-full text-left">
            <thead>
              <tr>
                <th>Debater</th>
                <th>Votes</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Debater A</td>
                <td>10</td>
              </tr>
              <tr>
                <td>Debater B</td>
                <td>8</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </PageWrapper>
  );
};

export default ResultScreen;
