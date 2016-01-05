'use strict';

var GulpConfig = (function () {
    function GulpConfig() {
        this.src = './src';
        
        this.clientSrc = this.src + '/client';
        this.clientDest = './dist/client';
        this.clientTS = this.clientSrc + '/**/*.ts';

        this.serverSrc = this.src + '/server';
        this.serverDest = './dist/server';
		this.serverTS = this.serverSrc + '/**/*.ts';        

        this.typingsDir = './typings';

        this.outputFile = 'angular-classified';
        this.outputCSSDir = '/css';
        this.outputLibDir = '/lib';

        this.mainLessFile = this.clientSrc + '/assets/styles/main.less';
        this.allHTML = [
            this.clientSrc + '/*.html',
            this.clientSrc + '/**/*.html'
        ];
        this.allLess = this.clientSrc + '/assets/styles/**/*.less';
        this.allTypeScript = this.src + '/**/*.ts';
        this.allJavaScript = '/**/*.js';
        this.allJavaScriptSourceMap = '/**/*.js.map';
        this.allLib = [
            'bower_components/traceur-runtime/traceur-runtime.js'
        ];

        this.serverPath = this.src + '/server/server.js';

        this.libraryTypeScriptDefinitions = this.typingsDir + '/**/*.ts';
        this.appTypeScriptReferences = this.typingsDir + '/tsd.d.ts';
    }

    return GulpConfig;
})();

module.exports = GulpConfig;
