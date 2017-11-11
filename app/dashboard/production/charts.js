const { PieChart, Pie, Legend, Tooltip, Cell } = Recharts;

const data = [
	{ name: 'Group A', value: 400 },
	{ name: 'Group B', value: 300 },
	{ name: 'Group C', value: 300 },
	{ name: 'Group D', value: 200 },
	{ name: 'Group E', value: 278 },
	{ name: 'Group F', value: 189 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieThing = ({ data }) => {
	debugger;
	return (
		<div>
			<span>Gastos categorizados</span>
			<PieChart width={800} height={400}>
				<Pie
					isAnimationActive={false}
					data={data}
					cx={200}
					cy={200}
					outerRadius={80}
					fill="#8884d8"
					label
				>
					{data.map((entry, index) => (
						<Cell fill={COLORS[index % COLORS.length]} key={entry.Id} />
					))}
				</Pie>
				<Tooltip />
			</PieChart>
		</div>
	);
};
