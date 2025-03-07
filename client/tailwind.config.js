module.exports = {
    content: [
      './node_modules/@shadcn/ui/**/*.{js,ts,jsx,tsx}',  // 添加这一行
      './src/**/*.{js,ts,jsx,tsx}',  // 你的其他组件路径
    ],
    theme: {
      extend: {},
    },
    plugins: [require('@tailwindcss/forms')],
  }
  