{
    test: /\.scss$/,
    use: [
      'vue-style-loader',
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          data: `
            @import "@/scss/_variables.scss";
            @import "@/scss/_bootstrap.scss";
          `
        }
      }
    ]
  }