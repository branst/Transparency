const apiKey = 'l7xx1069b7140aed41e595032a79929a2d1e';
const api = 'https://api.bancogalicia.com.ar';
const apiProxy = 'https://proxy-jauyytyhbq.now.sh/';

const transferApiHugo = `https://crossorig.in/${api}/apiTransfer`;
const transferApi = `${api}/apiTransfer`;
const transferApiCors = `${api}/apiTransferCORS`;
const transferApiRama = `${apiProxy}/apiTransfer`;

const getAccountById = accountId => {
	const url = `${transferApiRama}/Account/${accountId}?apikey=${apiKey}`;
	return fetch(url, { mode: 'cors' }).then(a => a.json());
};

const getAccountTransfersById = accountId => {
	const url = `${transferApiRama}/Account/${accountId}/Transfer?apikey=${apiKey}`;
	return fetch(url, { mode: 'cors' }).then(a => a.json());
};

const accountId = '0e1c9fe4-cbe5-4e6b-95eb-fcc31e688cbb';

class Row extends React.Component {
	render() {
		const { name, amount, description, date, type } = this.props;

		return (
			<tr>
				<td>{name}</td>
				<td>{amount}</td>
				<td>{description}</td>
				<td>{date}</td>
				<td>{type}</td>
			</tr>
		);
	}
}

class Table extends React.Component {
	render() {
		return (
			<table id="datatable" className="table table-striped table-bordered">
				<thead>
					<tr>
						<th>Institución</th>
						<th>Cantidad</th>
						<th>Descripción</th>
						<th>Fecha</th>
						<th>Tipo</th>
					</tr>
				</thead>
				<tbody>
					{this.props.transfers.map(transfer => (
						<Row
							name={this.props.account.Nickname}
							amount={transfer.Amount}
							description={transfer.Description}
							date={transfer.Transaction_Date}
							type={transfer.Type}
							key={transfer.Id}
						/>
					))}
				</tbody>
			</table>
		);
	}
}

class App extends React.Component {
	state = {
		account: undefined,
		transfers: undefined
	};

	componentWillMount() {
		console.log('puto');
		getAccountById(accountId).then(account => this.setState({ account }));
		getAccountTransfersById(accountId).then(transfers => {
			debugger;
			this.setState({ transfers });
			window.transfers = transfers;
		});
	}

	render() {
		return this.state.account && this.state.transfers ? (
			<div>
				<Table account={this.state.account} transfers={this.state.transfers} />
				<PieThing data={this.state.transfers} />
			</div>
		) : (
			<div />
		);
	}
}

ReactDOM.render(<App />, document.getElementById('react-root'));
