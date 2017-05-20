require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
})
require("babel-core").transform("code", {
  plugins: ["transform-runtime"]
})