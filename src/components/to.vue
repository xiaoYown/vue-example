<template lang="jade">
	.to-loading
		.to-loading-text Loading . . .
</template>

<script>
	export default {
		beforeCreate(){
			if( this.$root.show )
				window.location.href = this.$route.params.link;
			else
				this.$router.push({ path: this.$route.params.back });
		}
	}
</script>

<style lang="sass">
	.to-loading{
		text-align: center;
		padding: 200px;

		.to-loading-text{
			display: inline-block;
			vertical-align: top;

			color: #999;
			font-size: 30px;
		}
	}
</style>