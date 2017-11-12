const apiKey = 'l7xx1069b7140aed41e595032a79929a2d1e';
const api = 'https://api.bancogalicia.com.ar';
const apiProxy = 'https://proxy-jauyytyhbq.now.sh/';

const transferApiRama = `${apiProxy}/apiTransfer`;

const getAccountById = accountId => {
	const url = `${apiProxy}/apiAccount/Account/${accountId}?apikey=${apiKey}`;
	return fetch(url, { mode: 'cors' }).then(a => a.json());
};

const getAccountTransfersById = accountId => {
	const url = `${transferApiRama}/Account/${accountId}/Transfer?apikey=${apiKey}`;
	return fetch(url, { mode: 'cors' }).then(a => a.json());
};

const getIncomingTransfers = (accountId, transfers) => {
	return transfers.filter(transfer => transfer.Payee_Id === accountId);
}

const getOutcomingTransfers = (accountId, transfers) => {
	return transfers.filter(transfer => transfer.Player_Id === accountId);
}

const accountId = '0e1c9fe4-cbe5-4e6b-95eb-fcc31e688cbb';

class Row extends React.Component {
	render() {
		const { name, amount, description, date, type, verified } = this.props;

		return (
			<tr>
				<td>${amount}</td>
				<td>{description}</td>
				<td>{date}</td>
				<td>{type}</td>
				<td>{verified ? <img src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Ski_trail_rating_symbol-green_circle.svg" height="20" width="20"/> : "mal"}</td>
			</tr>
		);
	}
}

class Table extends React.Component {
	render() {
		return (
			<table id="datatable" style={{ marginTop: '20px' }} className="table table-striped table-bordered">
				<thead>
					<tr>
						<th>Cantidad</th>
						<th>Descripción</th>
						<th>Fecha</th>
						<th>Tipo</th>
						<th>Verificada</th>
					</tr>
				</thead>
				<tbody>
					{this.props.transfers.map(transfer => (
						<Row
							name={this.props.account.Nickname}
							amount={transfer.Amount}
							description={transfer.Description}
							date={transfer.date}
							type={transfer.Type}
							verified={transfer.verified}
							key={transfer.Id}
						/>
					))}
				</tbody>
			</table>
		);
	}
}

const formatData = (data = []) => {
	const arr = data.map((dat) => ({ name: dat.Description, value: dat.Amount, Importe: dat.Amount, date: moment(dat.Transaction_Date) }));
	return _.sortBy(arr, 'date')
};

const formatForTable = (data) => {
	const arr = data.map((dat) => ({ ...dat, date: moment(dat.Transaction_Date) }));
	const solved = _.sortBy(arr, 'date').map(dat => {
		return {...dat, ...{ date: dat.date.format('DD/MM/YYYY'), verified: true }}
	})
	return solved;
}

class App extends React.Component {
	state = {
		account: undefined,
		transfers: undefined
	};

	componentWillMount() {
		getAccountById(accountId).then(account => this.setState({ account }));
		getAccountTransfersById(accountId).then(transfers => {
			this.setState({ transfers: getOutcomingTransfers(accountId, transfers)  });
			window.transfers = transfers;
		});
	}

	render() {
		console.log()
		return this.state.account && this.state.transfers ? (
			<div>
				<div style={{display: 'inline-block'}}>
					<span>Reportes de salidas y entrada</span>
					<AreaChart width={700} height={250} data={formatData(this.state.transfers)}
					  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
					  <defs>
					    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
					      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
					      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
					    </linearGradient>
					    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
					      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
					      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
					    </linearGradient>
					  </defs>
					  <XAxis dataKey="name"/>
					  <YAxis />
					  <CartesianGrid strokeDasharray="3 3" />
					  <Tooltip />
						<Area type="monotone" dataKey="Importe" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
					</AreaChart>
				</div>
				<PieThing data={this.state.transfers} />
				<Table account={this.state.account} transfers={formatForTable(this.state.transfers)} />
			</div>
		) : (
			<div />
		);
	}
}

ReactDOM.render(<App />, document.getElementById('react-root'));
