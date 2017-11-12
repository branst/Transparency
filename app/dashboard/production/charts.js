const { PieChart, Pie, Legend, Tooltip, Cell, AreaChart, XAxis, YAxis, CartesianGrid, Area, BarChart, Bar } = Recharts;

const data = [
	{ name: 'Group A', value: 400 },
	{ name: 'Group B', value: 300 },
	{ name: 'Group C', value: 300 },
	{ name: 'Group D', value: 200 },
	{ name: 'Group E', value: 278 },
	{ name: 'Group F', value: 189 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const formatData = data => {
	const obj = _.groupBy(data, 'Description');
	console.log(obj);

	const formatted = [];

	Object.keys(obj).forEach((key) => {
		obj[key] = obj[key].reduce((acc, el) => {
			return acc + el.Amount;
		}, 0);

		const auxObj = {
			name: key,
			value: obj[key]
		};

		formatted.push(auxObj);
	});

	return formatted;
};

const PieThing = ({ data }) => {
	const formattedData = formatData(data);
	return (
		<div style={{display: 'inline-block', verticalAlign: 'top'}}>
			<span>Gastos categorizados</span>
			<PieChart width={400} height={250}>
				<Pie
					data={formattedData}
					cx={130}
					cy={130}
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
