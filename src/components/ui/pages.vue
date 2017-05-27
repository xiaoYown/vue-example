<template lang="jade">
	section.its-pages-wrap
		slot
		ul.its-pages-box
			li.its-pages-item(
				@click="link('first')"
			) 首页
			li.its-pages-item(
				@click="link('previous')",
				:class="{ disable: info.page <= 1 }"
			) 上一页
			li.its-pages-item(
				v-show="page.first > 0"
				:class="{ active: page.first == info.page }",
				@click="link('page-1')"	
			) {{ page.first }}
			li.its-pages-item(
				:class="{ active: page.second == info.page }",
				v-show="info.pages > 1",
				@click="link('page-2')"
			) {{ page.second }}
			li.its-pages-item(
				:class="{ active: page.third == info.page }",
				v-show=" info.pages > 2 || page.third == info.pages",
				@click="link('page-3')"	
			) {{ page.third }}
			li.its-pages-item(
				:class="{ disable: info.page >= info.pages }"
				@click="link('next')"
			) 下一页
			li.its-pages-item(
				@click="link('last')"
			) 尾页
			li.its-pages-item
				input(
					type="text",
					v-model="index",
					@input="indexChange"
				)
			li.its-pages-item(
				@click="link('link')"
			) 跳转
			span 每页
			li.its-pages-item
				label.its-pages-select
					.checked {{ info.pageSize }}
					input(type="checkbox")
					ul.select-list
						li(
							v-for="item in list",
							@click="sizeChange(item.id)"
						) {{ item.ct }}
			span 条
</template>

<script>
	
	export default {
		props: {
			info: {
				type: Object,
				default() {
					return {
						page: 1,
						pages: 1,
						pageSize: 10,
					}
				}
			}
		},
		data(){
			return {
				index: '',
				pageSize: '10',
				list: [
					{
						id: '10',
						ct: '10',
						checked: false,
					},{
						id: '20',
						ct: '20',
						checked: false,
					},{
						id: '30',
						ct: '30',
						checked: false,
					}
				],
			}
		},
		// created(){
		// 	for( let i = 0, len = this.list.length; i < len; i++ ){
		// 		this.list[i].checked = false;
		// 		if( this.info.pageSize == this.list[i].id ){
		// 			this.list[i].checked = true;
		// 		}
		// 	}
		// },
		watch: {
			'info': {
				handler(newVal){
					if( this.index <= newVal.pages )
						this.index = newVal.page;
					// this.pageSize = newVal.pageSize;
				},
				deep: true
			}
		},
		computed: {
			page(){
				let page  = {},
					_page = this.info.page;
				if( _page === 1 ){
					_page += 1;
				} else if( _page === this.info.pages ){
					_page -= 1;
				}
				page.first  = _page - 1;
				page.second = _page;
				page.third  = _page + 1;

				return page
			}
		},
		methods: {
			indexChange(){
				let index = (this.index + '').replace(/[^\d]/g,'');
				if( index > this.info.pages )
					index = this.info.pages;
				this.index = index;
			},
			sizeChange(size){
				// this.pageSize = size;
				this.index = 1;
				this.$emit('page-link', {
					page: 1,
					pages: this.info.pages,
					pageSize: parseInt(size)
				});
			},
			link(identity){
				let info = {
					page: this.info.page,
					pages: this.info.pages,
					pageSize: this.info.pageSize,
				};
				switch ( identity ){
					case 'page-1':
						info.page = this.page.first;
						break;
					case 'page-2':
						info.page = this.page.second;
						break;
					case 'page-3':
						info.page = this.page.third;
						break;
					case 'first':
						info.page = 1;
						break;
					case 'last':
						info.page = this.info.pages;
						break;
					case 'previous':
						info.page = this.info.page - 1;
						break;
					case 'next':
						info.page = this.info.page + 1;
						break;
					case 'link':
						info.page = parseInt(this.index);
						if( !this.index ) return;
						break;
				}
				if( info.page == this.info.page || info.page > this.info.pages || info.page < 1 ) return;
				this.$emit('page-link', info);
			}
		}
	}

</script>

<style lang="sass">
	.its-pages-wrap{
		text-align: right;
		padding-top: 20px;
		border-top: 1px solid #f2f3f8;
	}
	.its-pages-box{
		display: inline-block;
		vertical-align: top;
		&>span{
			vertical-align: middle;
			padding-left: 10px;
		}
	}
	.its-pages-item{
		position: relative;
		display: inline-block;
		vertical-align: middle;
		min-width: 30px;
		height: 26px;
		line-height: 26px;
		text-align: center;
		padding: 0 6px;
		margin-left: 10px;
		border: 1px solid #ebecf1;
		border-radius: 4px;
		cursor: pointer;
		&:hover{
			color: #5280f8;
			border: 1px solid #5280f8;
		}
		&.active{
			color: #fff;
			background: #5280f8;
			border: 1px solid #5280f8;
		}
		&.disable{
			color: #fff;
			background: #cfcfcf;
			border: 1px solid #cfcfcf;
		}
		input{
			width: 30px;
			text-align: center;
		}
	}
	.its-pages-select{
		.select-list{
			display: none;
			position: absolute;
			bottom: 30px;
			left: 0;
			right: 0;
			border: 1px solid #ccc;
			border-radius: 4px;
			overflow: hidden;
			li{
				cursor: pointer;
				background-color: #fff;
				&:hover{
					color: #fff;
					background-color: #5280f8;
				}
			}
		}
		input{
			display: none;
			&:checked+.select-list{
				display: block;
			}
		}
	}
</style>