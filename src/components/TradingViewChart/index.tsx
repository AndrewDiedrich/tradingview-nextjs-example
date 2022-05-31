import React, { FC } from 'react';
import  dynamic from 'next/dynamic';

const Chart = dynamic(
	() =>
		import('./TVChartContainer').then(mod => mod.TVChartContainer),
	{ ssr: false },
);

const TradingViewChart: FC = () => {
    return (<Chart />);
};

export default TradingViewChart;

