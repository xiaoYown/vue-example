var path = require('path');

var chunks = require('../config').build.chunks;

var plugins = [];

chunks.forEach(function(item, index){
    var plugin = {};
    if( item.name != 'vendor' ){
        plugin = {
            name: item.name,
            chunks: item.chunks
        };
        if( item.node_module ){
            plugin.minChunks = function(module, count){
                return (
                    module.resource 				&&
                    /\.js$/.test(module.resource) 	&& 
                    module.resource.indexOf(path.join(__dirname, '../node_modules/' + item.name)) === 0
                )
            }
        } else if ( item.minChunks ) {
            plugin.minChunks = item.minChunks;
        }
    } else {
        plugin.name = item.name;
        plugin.minChunks = function(module, count){
            var is_from_module = module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0;
            for( var i = 0, len = chunks.length; i < len - 1; i++ ){
                if( chunks[i].node_module ){
                    is_from_module = ( is_from_module && module.resource.indexOf(path.join(__dirname, '../node_modules/' + chunks[i].name)) !== 0 )
                }
            }
        }
    }
    plugins.push(plugin);
});

module.exports = plugins;