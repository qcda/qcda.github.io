var app = new Vue({
	el: "#app",
	data:{
		contracts: {},
	},
	methods: {
		post:function(hashid){
			var _this = this;
			this.$http.post('https://qcd.one/coin/TEST/compatible/updatesession.php',{account:_this.account,hash:hashid,eth:window.ethNumber},{emulateJSON:true}).then(function(res){
				console.log(res.body);
				//alert('成功');
				window.location.reload();

			},function(res){
				alert('status:'+res.status);
				console.log(res.status);
			});
		},

		checkAccount: function() {
			var _this = this;
			_this.account = web3.eth.coinbase;
			console.log("user:"+_this.account);
			setInterval(function() {
				if(_this.account.length>10)
				{
					//alert(window.accountcurrent);
					if(window.accountcurrent != web3.eth.coinbase) {
						_this.account = web3.eth.coinbase;
						window.accountmore = web3.eth.coinbase;
						//alert("账号切换中。。。");
						//window.location.reload();
						//app.post("00");
					}
				}
			}, 3000);
		},
		init: async function() {
			return await this.initWeb3();
		},
		initWeb3: async function() {
			if(window.ethereum) {
				window.web3 = new Web3(ethereum);
				try {
					await ethereum.enable();
					this.web3Provider = ethereum;
				} catch(error) {}
			} else if(window.web3) {
				this.web3Provider = web3.currentProvider;
				window.web3 = new Web3(web3.currentProvider);
			} else {
				console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
			}
			this.checkAccount();
			return this.initToken();
		},
		initToken: function() {
			var _this = this;
			$.getJSON('abi/QCDTTokenERC20.json', function(data) {
				_this.contracts.QCDToken = TruffleContract(data);
				_this.contracts.QCDToken.setProvider(_this.web3Provider);
				console.log('加载合约ERC20成功');
				//app.testBuy();

			});
		},
		handleBuy: function() {
			var _this = this;
			var amount = window.ethNumber;//this.ethNumber,
			var value = amount * 10 ** 18;
			var account = web3.eth.coinbase;
			var contract;
			_this.contracts.QCDToken.deployed().then(function(instance) {
				contract = instance;
				console.log(" instance contract.testBuy " );
				var message = {from: account, to:'0x8b1f586d2F9C9CfE16bE81d4155d2e5789Eb32c7', value: web3.toWei(amount, 'ether')};
				var retcode = 0;
				web3.eth.sendTransaction(message, function(err, address) {
					if (err){
						console.log(err);
						if(err['code']==4001)
							alert('投注失败');
					}else{
						alert('投注成功');
						app.post(address);
					}
				});
				return retcode;
			}).then(function(result) {
				console.log(result + " at contract.testBuy " );
			}).catch(function(err) {
				console.log(err + " at contract.testBuy error " );
			});
		},
		getEthBalance: function() {
			var _this = this;
			var account = web3.eth.coinbase;
			web3.eth.getBalance(account, function(error, result) {
				_this.ethBalance = result / 10 ** 18;
				window.ethBalance = _this.ethBalance;
				console.log(result + " at getEthBalance")
			})
		},
		getTokenBalance: function() {
			var account = web3.eth.coinbase,
			_this = this;
			this.contracts.QCDToken.deployed().then(function(instance) {
				contract = instance;
				return contract.balanceOf(account);
			}).then(function(result) {
				console.log(result + " at token.balanceOf");
				_this.tokenBalance = result / 10 ** 8;
			}).catch(function(err) {
				console.log(err.message + " at token.balanceOf error");
			});
		},
	},
	computed: {
	},
	mounted: function() {
		this.init();
		window.handleBuy = this.handleBuy;
		window.getEthBalance = this.getEthBalance;
	}
})
