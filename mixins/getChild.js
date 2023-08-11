export default which=>({
	components: {},
	data() {
		return {}
	},
	computed: {},
	mounted() {},
	methods: {
		/**
		 * 初始化
		 */
		init(){
			this.creatMethod('init');
		},
		/**
		 * 页面触底
		 */
		getReachBottom(){
			this.creatMethod('getReachBottom');
		},
		creatMethod(name){
			const {child}=this.$refs
			if(child){
				const creatMethod=child[`${name}`];
				creatMethod&&creatMethod();
			}
		},
	}
})