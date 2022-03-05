
const fs = require('fs');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const entries = {};
const htmlPluginArgsSettings = []
let htmlPlugins = [];
const htmlFileNames = [];

function declareEntryAndHtmlFiles(filePath= './src',parentPath = ''){
  let currentHierarchy = parentPath + filePath;

  const files = fs.readdirSync(currentHierarchy);
  files.map((file) => {
    const fileNameSplit = file.split('.');
    const filePath = `${currentHierarchy}/${file}`;
      const entryKey = currentHierarchy + "/" + fileNameSplit[fileNameSplit.length - 2]

    // console.log('currentHierarchy',currentHierarchy)
    
    if(fileNameSplit?.length === 1){
      declareEntryAndHtmlFiles( `/${file}`, currentHierarchy,entryKey)
    }

    const extName = fileNameSplit[fileNameSplit?.length - 1];
    const dir = currentHierarchy.slice(2);

    // create plugin settings for html
    if(extName === 'html') {
      htmlFileNames.push(filePath);
       const htmlPluginArgs =  {
            template: path.resolve(__dirname, dir, file),
            filename: file,
            inject: 'body',
            // chunks:['quizEntry'],
            // title: process.env.NODE_ENV === 'production' ? 'Production' : 'Development',
            entryKey,
      };

      htmlPluginArgsSettings.push(htmlPluginArgs)
    };


    // create chunks for js files
    if(extName === 'js') {
      entries[entryKey] = path.resolve(__dirname, dir, file);
    };
  });

}

declareEntryAndHtmlFiles('./src','');


htmlPluginArgsSettings.forEach((setting) => {
  const entryKeyNames = Object.keys(entries);
    // console.log('entryKeyNames',setting.template,entryKeyNames)

  const entryKeyIndex = entryKeyNames.indexOf(setting.entryKey)
  if(entryKeyIndex > -1){

    const configs = {
      ...setting,
      chunks: [entryKeyNames[entryKeyIndex]]

    }
    console.log('configs : ',configs)

      //removing temporary key for identifying filepath
    delete configs.entryKey
    htmlPlugins.push(new HtmlWebpackPlugin(configs))
  }
});



console.log('module.',entries,htmlPluginArgsSettings,htmlPlugins)
module.exports = {
  entries,
  htmlPluginArgsSettings,
  htmlPlugins,
  htmlFileNames,
}

