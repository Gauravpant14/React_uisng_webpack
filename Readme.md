Dependencies -->

npm i -D @babel/core@7.18.2 babel-loader@8.2.5 @babel/preset-env@7.18.2 @babel/preset-react@7.17.12 css-loader@6.7.1 html-webpack-plugin@5.5.0 mini-css-extract-plugin@2.6.1 sass@1.54.5 sass-loader@13.0.2 style-loader@3.3.1 webpack@5.73.0 webpack-cli@4.9.2 webpack-dev-server@4.9.2

npm i react@18 react-dom@18

@babel/core@ -- js complier
babel-loader - how to load js files--load js files
@babel/preset-react -- how to read react code
@babel/preset-env === js code kis env m chlega , like it'll run in browser (chrome)
css-loader-- .css ko load krne
style-loader@ --- css ko aplly krne m help krega
mini-css-extract-plugin --- css ko seperate file m rkhne k liye
webpack-dev-server -- server ko restart krne k liye or hot reloading .
html-webpack-plugin ---

write your configuration inside webpack.config.js

entry: put relative path here
output:{
filename:output file name ,
path:absolute path will come here (\_\_dirname -> this will give you current directory)
clean: true, ---> clear you bundle and it will create a fresh bundle
}

create a scripts in package.json .
write command given below
"scripts": {
"build":"webpack --config webpack.config.js --mode development"
},

Above --mode flag with development will create a dev build if you not use --mode , then it'll automatacially create production build

Then run command npm run build:dev command for creating a build.

Create a folder name public and create a file index.html , where you'll create a div with id , here i have used root id ,

here we will be using this template for base template,

Now we'll tell webpack to use this file as a base html , and the bundle that has been genereated , will be imported on this index.html file

For that we have imported html webpack plugin ,

Syntax for using index.html as a base template is as follows :

plugins: [
new HtmlWebPackPlugin({
template: "./public/index.html", // give your file path name
}),
],

then create again a fresh build , now you can see , index.html file inside dist folder , that is using bundle.js file in there head tag.

Now write config. for react code,

module: {
rules: [
{
test: /\.(js|jsx)$/, --- > write regex for reading .js files that is ending with .js
exclude: /node_modules/,  
 use: {
loader: "babel-loader", ---> Use babelloader for reading files that end with .js
options: {
presets: ["@babel/preset-react", "@babel/preset-env"], ---> Use /preset-react , babel will know how to understand jsx code or react code, /preset-env will be used for which browser will be used
},
},
},
],
},

So we have written the configuration for writing react code .

Now let's write react code in index.js file , also create a App.js file and create a react component.

Now in index.js file write down given code .

```
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const root = createRoot(document.getElementById("root")); ---> It'll look in index.html file where we have created div with id root
root.render(<App />); --> Now inside root div , place our App component ,
```

So here it's we have created a react app using webpack , Now again create a build and inside build folder, open index.html file and open it with a live server , now you can see that , react code is running.

Now we want to reload app, whenever we do changes , so for that we'll use

```
 devServer: {
    static: {
      directory: path.join(__dirname, "dist"), ---> here we will specifie for static folder
    },
    port: 3000, --> App will run on port 3000 ---> If you don't use this app will use 8080 by default
  },
```

Now write script for starting the app ,

```
 "scripts": {
    "build:dev": "webpack --config webpack.config.js --mode development",
    "dev": "webpack serve --mode development --open" ---> this is the script
  },

```

So now we can run npm run dev , but when we run this we'll get this error

```
[webpack-cli] TypeError: cli.isMultipleCompiler is not a function

To solve this error we have to run npm install webpack-cli.

Reference for this error fix

https://stackoverflow.com/questions/72637891/how-to-solve-webpack-cli-typeerror-cli-ismultiplecompiler-is-not-a-function

```

<!-- Now let's write configuration for css files -->

We will use css-loader and style loader package for that.

```

module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], ---> here we are using these packagees , here code runs from right to left, first css-loader will run then stlye loader will run
      },
      {
        test: /\.s[ac]ss$/,  --> Configuration for sass/scss file
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { modules: true } },  ----> if module is false then we can not use css modules
          { loader: "sass-loader" },  ---> using sass-loader package
        ],
      },
    ],
  },



css module is already enabled ,

```

<!-- Now Let's write configuration for images -->

```
module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader", options: { modules: true } },
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/, -->
        type: "asset/resource",  ---> Use this
      },
    ],
  },



Now if you run npm run buid , then you'll  see that images are taking place inside dist folder, but we want them to group together in a seperate folder, to do this we will use this script.

 assetModuleFilename: 'images/[hash][ext][query]'
```

Next what we have to do

<!-- if we check css is coming in html, it's not created seperatly in build, so  -->

```
To Seperate the css we'll be using MiniCssExtractPlugin

```

new MiniCssExtractPlugin(),

{
test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader", options: { modules: true } },
        ],
      },
      {
        test: /\.s[ac]ss$/,
use: [
{ loader: MiniCssExtractPlugin.loader },
{ loader: "css-loader", options: { modules: true } },
{ loader: "sass-loader" },
],
},

      ```

<!-- Create seperate file for prod -->

```
by using mode key in webpack file , then you dont have to specifie mode in package.json file
```

git config user.name "new name"
git config credential.username "new name"
