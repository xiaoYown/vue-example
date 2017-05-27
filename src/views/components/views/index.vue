<template lang="jade">
	.wrap-components
		.ui-components-wrap
			xy-switch(
				:open="switchOpen",
				@open-change="openChange"
			)
				p.inline {{ switchOpen }}
		.ui-components-wrap
			xy-range(
				:percent="rangeNum",
				@range-change="rangeChange"
			)
			p {{ rangeNum }}
		.ui-components-wrap
			xy-select(
				:list="selectList",
				@select-change="selectChange"
			)
		.ui-components-wrap
			ul.pages-demo
				li(v-for="item in pagesListShow") {{ item }}
			xy-pages(
				:info="pagesInfo",
				@page-link="pageLink"
			)
</template>

<script>
	require('sass/base.scss');

	export default {
		components :{
			'xy-switch': require('components/ui/switch.vue'),
			'xy-range':  require('components/ui/range.vue'),
			'xy-select':  require('components/ui/select.vue'),
			'xy-pages':  require('components/ui/pages.vue'),
		},
		data(){
			return {
				switchOpen: true,
				rangeNum: 0.5,
				selectList: [
					{
						id: '1',
						ct: '1111',
						checked: false,
					},{
						id: '2',
						ct: '2222',
						checked: false,
					},{
						id: '3',
						ct: '333',
						checked: false,
					},{
						id: '4',
						ct: '4444',
						checked: false,
					}
				],
				pagesList: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', ],
				pagesInfo: {
					page: 1,
					pages: 10,
					pageSize: 10,
				},
				pagesListShow: []
			}
		},
		created(){
			this.pageLink(this.pagesInfo);
		},
		methods: {
			openChange(bool){
				this.switchOpen = bool;
			},
			rangeChange(range){
				this.rangeNum = range;
			},
			selectChange(id){
				console.log(id)
			},
			// pagesInfo 处理 , 主要为获取 pages
			pageLink(data){
				this.pagesInfo.page = data.page;
				this.pagesInfo.pageSize = data.pageSize;
				let isInt = this.pagesList.length % data.pageSize === 0;
				let pages = Math.floor(this.pagesList.length/data.pageSize);

				this.pagesInfo.pages = isInt ? pages : pages + 1;
				this.pagesListChange(data);
			},
			// 列表获取
			pagesListChange(data){

				let start = (this.pagesInfo.page-1)*this.pagesInfo.pageSize;
				this.pagesListShow = this.pagesList.slice(start, start + this.pagesInfo.pageSize);
			}
		}

	}
</script>

<style lang="sass">
	.wrap-components{
		position: absolute;
		top: 48px;
		bottom: 0;
		left: 0;
		right: 0;
		
		.inline{
			vertical-align: middle;
			margin-left: 10px;
		}
	}
	.ui-components-wrap{
		padding: 20px;

		.xy-range-wrap{
			width: 200px;
		}
		.pages-demo{
			li{
				display: inline-block;
				vertical-align: top;
				margin-right: 6px;
			}
		}
	}
</style>